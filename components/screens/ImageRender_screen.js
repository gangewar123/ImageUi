import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import MasonryList from "react-native-masonry-list";
import OverlayComponent from '../overlayComponent';
import { TextInput } from 'react-native-gesture-handler';
import Splash_screen from './Splash_screen';

export default class ImageRender extends Component {
    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.loadMoreData = this.loadMoreData.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.state = {
            search: '',
            data: "",
            isLoading: true,
            onEndReached: true,
            id: "",
            pageNumber: 1,
            isDataLoaded: false
        };
    }
    updateSearch() {
        console.log("search string is" + this.state.search);
        this.setState({
            isDataLoaded: true
        })
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
                        isLoading: false,
                        isDataLoaded: false
                    })
                })
                .catch((error) => {
                    console.error(error);
                });

    };

    updateText = (search) => {
        this.setState({ search });
    }
    //loadMoreData method help to load pages of same query
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

    _onLongPress = (index) => {
        this.setState({ id: index })
    }

    render() {
        const { search } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <View style={{ padding: 5 }}>
                    <View style={{ padding: 10, borderColor: 'gray', borderWidth: 1, marginBottom: 4, borderRadius: 10, backgroundColor: "#36bff5" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18, paddingBottom: 5, color: "white" }}>Search images</Text>
                        <TextInput

                            onChangeText={this.updateText}
                            value={search}
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: "white", borderRadius: 10, }}
                            onSubmitEditing={this.updateSearch}
                            placeholder="e.g. cat, dog, etc..."
                            clearTextOnFocus={true}
                        />
                    </View>
                    {this.state.isLoading ? <Splash_screen /> : <View />}

                </View>
                {
                    this.state.isDataLoaded ?
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator animating={this.state.isDataLoaded} size="large" color="#ff0000" />
                        </View> :
                        <MasonryList
                            images={this.state.isLoading ? [] : this.renderImage()}

                            masonryFlatListColProps={{ onEndReached: this.loadMoreData }}
                            onEndReachedThreshold={0.5}
                            onLongPressImage={(item, index) => this._onLongPress(index, item.id, item.user)}
                            onPressImage={(item) => this.props.navigation.navigate("detailScreen", { name: item.user.username })}
                            renderIndividualHeader={(data, index) => {
                                return this.state.id == index ? (
                                    <OverlayComponent data={data} />) : <View />
                            }
                            }

                        />
                }
            </View>


        );
    }
}
