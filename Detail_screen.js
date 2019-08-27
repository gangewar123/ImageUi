import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import MasonryList from "react-native-masonry-list";
import OverlayComponent from './overlayComponent';
import Header from './HeaderComponent';



export default class Detail_screen extends Component {
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
            user: ""
        };
    }

    static navigationOptions = ({ navigation }) => {
        return { headerTitle: <Header name={navigation.getParam("user")} /> }

    }

    componentDidMount() {
        var userName = this.props.navigation.state.params.name

        console.log("component name is===>", userName);
            this.props.navigation.setParams({ user: userName });
        fetch(`https://api.unsplash.com/users/${userName}/photos?client_id=27188885043579c212fdbf88c97812be03382d3a0e2b2f986dfa2b0719897d0a`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("data from api,=>", responseJson);
                var imagedata = [];
                responseJson.forEach(element => {
                    imagedata.push(element)

                });
                console.log("user  data is=>", imagedata)

                this.setState({
                    data: imagedata,
                    isLoading: false
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    loadMoreData() {
        var userName = this.props.navigation.state.params.name
        console.log("foolish is good" + this.props.navigation.state.params.name);

        // console.log("this is sent data" + userName);
        fetch(`https://api.unsplash.com/users/${userName}/photos?client_id=27188885043579c212fdbf88c97812be03382d3a0e2b2f986dfa2b0719897d0a&page=${this.state.pageNumber++}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("data from api,=>", responseJson);
                var imagedata = [];
                responseJson.forEach(element => {
                    imagedata.push(element)
                });
                console.log("user image next page=>", imagedata)

                this.setState({
                    data: this.state.data.concat(imagedata),
                    isLoading: false
                })
            })
            .catch((error) => {
                console.error(error);
            });

    }

    _onLongPress = (index) => {
        this.setState({ id: index })
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

    render() {
        return this.state.isLoading ?
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator
                    size={40}
                />
            </View>
            : (
                <MasonryList
                    images={this.state.isLoading ? [] : this.renderImage()}
                    masonryFlatListColProps={{ onEndReached: this.loadMoreData }}
                    onEndReachedThreshold={0.5}
                    onLongPressImage={(item, index) => this._onLongPress(index, item.id, item.user)}
                    // onPressImage={() => this.props.navigation.navigate("detailScreen")}
                    renderIndividualHeader={(data, index) => {
                        return this.state.id == index ? (
                            <OverlayComponent data={data} />) : <View />
                    }
                    }
                />
            )
    }
}

