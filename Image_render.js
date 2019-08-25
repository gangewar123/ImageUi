import React, { Component } from 'react';
import { View, Text, ActivityIndicator,TouchableWithoutFeedback,Image,Linking} from 'react-native';
import { SearchBar } from 'react-native-elements';
import MasonryList from "react-native-masonry-list";
import overlayComponent from './overlayComponent';



export default class ImageRender extends Component {
    constructor(props) {
        super(props);
        this.loadMoreData = this.loadMoreData.bind(this)
        this.state = {
            search: '',
            data: "",
            isLoading: true,
            onEndReached: true,
        };
    }

    componentDidMount() {
        fetch('https://api.unsplash.com/photos/?client_id=27188885043579c212fdbf88c97812be03382d3a0e2b2f986dfa2b0719897d0a')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("data from api,=>", responseJson);
                var imagedata = [];
                responseJson.forEach(element => {
                    imagedata.push(element.urls)

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
    }

    updateSearch = search => {
        this.setState({ search });
    };


    loadMoreData() {

        console.log("control is comming or not")
        fetch('https://api.unsplash.com/photos/?client_id=27188885043579c212fdbf88c97812be03382d3a0e2b2f986dfa2b0719897d0a')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("data from api,=>", responseJson);
                var imagedata = [];
                responseJson.forEach(element => {
                    imagedata.push(element.urls)

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
                uri: element.thumb
            })

        });
    }

    _onLongPress=(data)=>{

        console.log("this is one");
        return (
            <overlayComponent/>
        );

    }
    render() {
        const { search, data } = this.state;
        return this.state.isLoading ? <ActivityIndicator size={25} /> :
            (
                <View style={{ flex: 1 }}>
                    <Text> Image_render </Text>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={search}
                    />
                    <MasonryList
                        // rerender={true}
                        
                        images={this.renderImage()}

                        masonryFlatListColProps={{onEndReached: this.loadMoreData}}
                        onEndReachedThreshold={0.5}
                        onLongPressImage = {this._onLongPress}
                        
                    //     renderIndividualHeader={(data) => {
                    //     return (
                    //         <TouchableWithoutFeedback
                    //             onPress={() => Linking.openURL("https://luehangs.site")}>
                    //             <View style={[ {
                    //                 width: 100,
                    //                 margin:12
                    //             }]}>
                    //                 <Image
                    //                     source={{ uri: "https://luehangs.site/images/lue-hang2018-square.jpg" }}
                    //                     />
                    //                 <Text >{data.title}</Text>
                    //             </View>
                    //         </TouchableWithoutFeedback>
                    //     );
                    // }}
                        
                    />
                </View>
            );
    }
}
