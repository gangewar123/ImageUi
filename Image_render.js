import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableWithoutFeedback, Linking } from 'react-native';
import { SearchBar, Image, Card, Avatar } from 'react-native-elements';
import MasonryList from "react-native-masonry-list";
import OverlayComponent from './overlayComponent';



export default class ImageRender extends Component {

    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.loadMoreData = this.loadMoreData.bind(this)
        this.state = {
            search: '',
            data: "",
            isLoading: true,
            onEndReached: true,
            id: "",
            pageNumber: 1,
        };
    }
    updateSearch = () => {

        console.log("search string is" + this.state.search);
        if (this.state.search != null)
            fetch('https://api.unsplash.com/photos/search?client_id=27188885043579c212fdbf88c97812be03382d3a0e2b2f986dfa2b0719897d0a&query=' + this.state.search)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("data from api,=>", responseJson);
                    var imagedata = [];
                    responseJson.forEach(element => {
                        imagedata.push(element)

                    });
                    console.log("data image is=>", imagedata)

                    this.setState({
                        data: imagedata,
                        isLoading: false
                    })
                })
                .catch((error) => {
                    console.error(error);
                });

    };

    updateText = search => {
        this.setState({ search });
    }


    loadMoreData() {
        fetch('https://api.unsplash.com/photos/search?client_id=27188885043579c212fdbf88c97812be03382d3a0e2b2f986dfa2b0719897d0a&query=' + this.state.search + '&page=' + this.state.pageNumber++)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("data from api,=>", responseJson);
                var imagedata = [];
                responseJson.forEach(element => {
                    imagedata.push(element)
                });
                console.log("data image is=>", imagedata)

                this.setState({
                    data: this.state.data.concat(imagedata),
                    isLoading: false
                })
            })
            .catch((error) => {
                console.error(error);
            });

    }

    renderImage() {

        return this.state.data.map((element) => {
            return ({
                uri: element.urls.thumb,
                id: element.id,
                user: element.user,
                likes: element.likes
            })

        });
    }

    _onLongPress = (index, id, user) => {
        this.setState({ id: index })

        console.log("this is one", user);
        return (
            <overlayComponent />
        );

    }
    renderCostomeComponent() {
        return (
            <Image >
                <Text>hello</Text>
            </Image>
        )
    }
    render() {
        const { search, data } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateText}
                    value={search}
                    onSubmitEditing={this.updateSearch}
                />
                <MasonryList
                    images={this.state.isLoading ? [] : this.renderImage()}
                    // rerender={true}

                    masonryFlatListColProps={{ onEndReached: this.loadMoreData }}
                    onEndReachedThreshold={0.5}
                    onLongPressImage={(item, index) => this._onLongPress(index, item.id, item.user)}
                    onPressImage={(item) => this.props.navigation.navigate("detailScreen", { name: item.user.username })}

                    // completeCustomComponent={({  user, style={width:100,height:100,margin:5}, user }) => <Text>{user.id}</Text>}
                    // completeCustomComponent= {
                    //     this.state.id?

                    //     (item, style={width:100,height:100,margin:5},index) =>index==this.state.id? <View style={{flex:1,backgroundColor:"transparent"}}>
                    //     <View>
                    //     <Text>hellpo</Text>
                    //     </View>
                    // </View>:null:null }

                    renderIndividualHeader={(data, index) => {
                        return this.state.id == index ? (
                            <OverlayComponent data={data} />) : <View />
                    }
                    }

                />
            </View>


        );
    }
}
