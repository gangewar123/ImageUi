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
            id:"",
            pageNumber:1,
        };
    }

    componentDidMount() {
        fetch('https://api.unsplash.com/photos/?client_id=27188885043579c212fdbf88c97812be03382d3a0e2b2f986dfa2b0719897d0a&page=1')
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
    }

    updateSearch = search => {
        this.setState({ search });
    };


    loadMoreData() {

        console.log("control is comming or not")
        fetch('https://api.unsplash.com/photos/?client_id=27188885043579c212fdbf88c97812be03382d3a0e2b2f986dfa2b0719897d0a&page=2')
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
                id:element.id,
                user:element.user,
                likes:element.likes
            })

        });
    }

    _onLongPress=(index,id,user)=>{
        this.setState({id:index})

        console.log("this is one",user);
        return (
            <overlayComponent/>
        );

    }
    renderCostomeComponent(){
        return (
           <Image >
               <Text>hello</Text>
           </Image>
        )
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
                        
                        
                        images={this.renderImage()}
                        // rerender={true}

                        masonryFlatListColProps={{onEndReached: this.loadMoreData}}
                        onEndReachedThreshold={0.5}
                        onLongPressImage = {(item, index)=>this._onLongPress(index,item.id,item.user)}

                        // completeCustomComponent={({  user, style={width:100,height:100,margin:5}, user }) => <Text>{user.id}</Text>}
                        // completeCustomComponent= {
                        //     this.state.id?
                            
                        //     (item, style={width:100,height:100,margin:5},index) =>index==this.state.id? <View style={{flex:1,backgroundColor:"transparent"}}>
                        //     <View>
                        //     <Text>hellpo</Text>
                        //     </View>
                        // </View>:null:null }
                        
                        renderIndividualHeader={(data,index)=>  {return  this.state.id==index ?(<View style={{position:"absolute",height:"100%",width:"100%",left:0,justifyContent:"center",alignItems:"center"}}><View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",borderWidth:1,borderRadius:4}}>
                            <View style={{borderRadius:20,backgroundColor:"green",height:50,width:50,borderRadius:25}}>
                       
                            </View>
                            <View>
                            <Text >{data.user.name}</Text>
                            <Text>{data.likes}</Text>
                            </View>
                        </View></View>):<View/>}
                      
                    }
                        
                    />
                </View>
            );
    }
}
