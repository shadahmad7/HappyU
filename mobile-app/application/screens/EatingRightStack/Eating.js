import React, { Component } from "react";
import { View, Text, ActivityIndicator,Image,TouchableOpacity, Pressable,StyleSheet,Linking, Modal, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import NetInfo from "@react-native-community/netinfo";
import { getWorkoutStatus } from "../../actions/workoutAction";
import { getEatingData, getEatingStatus, putEatingStatus } from "../../actions/eatingAction";
import useFonts from "../../hooks/useFonts";
export default class Eating extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modal: false,
      hide: false,
      breakfast:'',
      bstatus:'',
      lstatus:'',
      dstatus:'',
      lunch:'',
      dinner:'',
      checked: "",
      connection_status: null,
      foodTime: "",
      loading: false,
      referBlogs: [],
      load:false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Eating Right",
    headerTitleStyle: {
      fontFamily: "GothamBold",
      color:'#EFDF6E'
    },
    headerStyle: {
      backgroundColor: '#000'
    },
    headerLeft: () => (
      <Ionicons
        name={"md-arrow-back"}
        size={24}
        onPress={() => {
          navigation.goBack(null);
        }}
        style={{color:"#EFDF6E", marginLeft:30}}
      />
    ),
  });

  async componentDidMount() {
    await useFonts();
    this.setState({load:true});

    let action = await getEatingStatus();

    action = action.messages[0];
  console.log("WWWWWWWWWWW", action );
  this.setState({ breakfast: action.eating_breakfast, lunch: action.eating_lunch, dinner: action.eating_dinner });

  let action2 = await getEatingData();
  await this.setState({referBlogs:action2.messages})
  console.log("2wwwwwww", this.state.referBlogs);
  
    this.NetInfoSubscribtion = NetInfo.addEventListener((state) => {
      this.setState({ connection_status: state.isConnected });
    });
    this.setState({ loading: true });
    this.setState({load:false});

  }

  async submitAns() {
    const {breakfast, lunch, dinner} = this.state;
    let action = await putEatingStatus(breakfast, lunch, dinner);
    console.log("LDNIAHDUID", action);
      this.setState({modal:true})
      // this.setState({ hide: true });
    
  }


  setStatus(val, time){
if(time === 'Breakfast'){
this.setState({breakfast:val});
this.setState({bstatus:val})
}
if(time === 'Lunch'){
  this.setState({lunch:val});
  this.setState({lstatus:val})
}
if(time === 'Dinner'){
  this.setState({dinner:val});
  this.setState({dstatus:val})
}
  }

  render() {
    return (
      <View style={{ backgroundColor: "#f7f7f7",height:'100%', }}>
           {this.state.load ? ( 
        <View style={{justifyContent:'center',flex :1, alignContent:'center', alignItems:'center'}}>
          <ActivityIndicator size="large" color="#EFDF6E" />
        </View>
        ):(
          <View>
        {this.state.connection_status ? (
          <View style={{ backgroundColor: "#EFDF6E",height:'100%', }}>
 {/* <ImageBackground source={require('../../../assets/eating.png')} resizeMode="cover" style={{width:"100%", height:"100%"}}>   */}
           <ScrollView>
              <LottieView
                autoPlay
                style={{
                  width: 230,
                  height: 230,
                  alignSelf: "center",
                }}
                source={require("../../../assets/animated/eating.json")}
              />
              <View>
                {!this.state.hide ? (
                  <View style={{backgroundColor:'transparent', paddingVertical:10,marginVertical:10, marginHorizontal:10, borderRadius:18}}>
                  <View
                    style={{
                      
                      marginHorizontal:15,
                      marginTop:8,
                      alignItems:'center',
                      borderRadius:10, 
                      backgroundColor:'#fff',
                      borderWidth:0.7,
                      borderColor:'#ccc',
                      paddingVertical: 15,
                      paddingHorizontal: 15,
                    }}
                  >
                    <Text style={{ fontSize: 16, fontFamily:"GothamBold", }}>
                      Did you have a healthy breakfast?
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "80%",
                        marginTop: 15,
                        alignItems: "center",
                      }}
                    >
                      <Pressable onPress={() => this.setStatus("Yes", "Breakfast")}>
                        <View
                          style={this.state.breakfast === 'Yes' ? styles.optionBox2 : styles.optionBox1}
                        >
                          <Text style={{fontFamily:"GothamMedium",}}>Yes</Text>
                          {/* <MaterialIcons
                            name="check-circle"
                            size={26}
                            color="green"
                            style={{marginLeft:5}}
                          /> */}
                        </View>
                      </Pressable>
                      <Pressable onPress={() => this.setStatus("No", "Breakfast")}>
                        <View
                         style={this.state.breakfast === 'No' ? styles.optionBox2 : styles.optionBox1}

                          >
                          <Text style={{fontFamily:"GothamMedium",}}>No</Text>
                          {/* <Ionicons name="close" size={26} color="red" /> */}
                        </View>
                      </Pressable>
                      <Pressable onPress={() => this.setStatus("Both", "Breakfast")}>
                        <View
                          style={this.state.breakfast === 'Both' ? styles.optionBox2 : styles.optionBox1}

                          >
                          <Text style={{fontFamily:"GothamMedium",}}>Little of both</Text>
                          {/* <Ionicons name="shapes" size={26} color="#0F75CE"  style={{marginLeft:5}}/> */}

                        </View>
                      </Pressable>
                    </View>
                  </View>
                  <View
                    style={{
                      marginHorizontal:15,
                      marginTop:8,

                      borderRadius:10, 
                      borderWidth:0.7,
                      borderColor:'#ccc',
                      backgroundColor:'#fff',

                      alignItems:'center',
                      paddingVertical: 15,
                      paddingHorizontal: 15,
                    }}
                  >
                    <Text style={{ fontSize: 16, fontFamily:"GothamBold" }}>
                      Did you have a healthy lunch?
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "80%",
                        marginTop: 15,
                        alignItems: "center",
                      }}
                    >
                      <Pressable onPress={() => this.setStatus("Yes", "Lunch")}>
                        <View
                        style={this.state.lunch === 'Yes' ? styles.optionBox2 : styles.optionBox1}

                          >
                          <Text style={{fontFamily:"GothamMedium",}}>Yes</Text>
                          {/* <MaterialIcons
                            name="check-circle"
                            size={26}
                            color="green"
                            style={{marginLeft:5}}
                          /> */}
                        </View>
                      </Pressable>
                      <Pressable onPress={() => this.setStatus("No","Lunch")}>
                        <View
                          style={this.state.lunch === 'No' ? styles.optionBox2 : styles.optionBox1}

                          >
                          <Text style={{fontFamily:"GothamMedium",}}>No</Text>
                          {/* <Ionicons name="close" size={26} color="red" /> */}
                        </View>
                      </Pressable>
                      <Pressable onPress={() => this.setStatus("Both","Lunch")}>
                        <View
                        style={this.state.lunch === 'Both' ? styles.optionBox2 : styles.optionBox1}

                          >
                          <Text style={{fontFamily:"GothamMedium",}}>Little of both</Text>
                          {/* <Ionicons name="shapes" size={26} color="#0F75CE"  style={{marginLeft:5}}/> */}

                        </View>
                      </Pressable>
                    </View>
                  </View>
                  <View
                    style={{
                      marginHorizontal:15,
                      marginTop:8,
                      borderRadius:10, 
                      backgroundColor:'#fff',

                      borderWidth:0.7,
                      borderColor:'#ccc',
                      alignItems:'center',
                      paddingVertical: 15,
                      paddingHorizontal: 15,
                    }}
                  >
                    <Text style={{ fontSize: 16, fontFamily:"GothamBold" }}>
                      Did you have a healthy dinner?
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "80%",
                        
                        marginTop: 15,
                        alignItems: "center",
                      }}
                    >
                      <Pressable onPress={() => this.setStatus("Yes","Dinner")}>
                        <View
                       style={this.state.dinner === 'Yes' ? styles.optionBox2 : styles.optionBox1}

                          >
                          <Text style={{fontFamily:"GothamMedium",}}>Yes</Text>
                          {/* <MaterialIcons
                            name="check-circle"
                            size={26}
                            color="green"
                            style={{marginLeft:5}}
                          /> */}
                        </View>
                      </Pressable>
                      <Pressable onPress={() => this.setStatus("No","Dinner")}>
                        <View
                         style={this.state.dinner === 'No' ? styles.optionBox2 : styles.optionBox1}

                          >
                          <Text style={{fontFamily:"GothamMedium",}}>No</Text>
                          {/* <Ionicons name="close" size={26} color="red" /> */}
                        </View>
                      </Pressable>
                      <Pressable onPress={() => this.setStatus("Both","Dinner")}>
                        <View
                         style={this.state.dinner === 'Both' ? styles.optionBox2 : styles.optionBox1}

                          >
                          <Text style={{fontFamily:"GothamMedium",}}>Little of both</Text>
                          {/* <Ionicons name="shapes" size={26} color="#0F75CE"  style={{marginLeft:5}}/> */}

                        </View>
                      </Pressable>
                    </View>
                  </View>

                  <View style={{paddingHorizontal:10,width:100, margin:10, alignSelf:'center'}}>
                  <TouchableOpacity  disabled={this.state.disabled}
 onPress={() => this.submitAns()} style={{backgroundColor:'#000',
 shadowColor: '#ccc',
 borderColor:"#EFDF6E",
 borderWidth:0.4,
 shadowOffset: { width: 0, height: 1 },
 shadowOpacity: 0.8,
 shadowRadius: 2,  
 elevation: 2,

 paddingHorizontal:18,borderRadius:10, paddingVertical:10}}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'#EFDF6E',fontFamily:"GothamBold"}}>SAVE</Text>
            </View>
        </TouchableOpacity>
{/* <Button 
title="Save" 
color="#fff"

disabled={this.state.disabled}
 onPress={() => this.submitAns()}
 /> */}
</View>
 


                  </View>
                ) : (
                  <View style={{margin:20, paddingVertical:10, paddingHorizontal:15}}>
                  <Text style={{ fontSize: 18, fontFamily:"GothamBold" }}>
                        Come again tomorrow for response</Text>
                  </View>
                )}
              </View>

              <View>
                {this.state.referBlogs.map((blog, index) => (
                  <View
                    style={{
                      
                        flexDirection: "row",
                        borderWidth: 0,
  backgroundColor:"#fff", borderRadius:10,
                        //BOX -SHADOW
                        shadowColor: '#ccc',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0,
                        shadowRadius: 0,  
                        elevation: 1.5,
  
                        justifyContent: "space-around",
                        paddingHorizontal: 8,
                        marginVertical: 5,
                        paddingVertical: 10,
                        marginHorizontal: 22,
                        alignItems: "center",
                    }}
                    onTouchEnd={() => Linking.openURL(blog.eating_article_url)}
                  >
                     <View style={{ width: "30%",  }}>
                      <Image
                        source={{ uri: blog.eating_article_image }}
                        style={{ height: 100, borderRadius: 5, width: 120 }}
                      />
                    </View>
                    <View style={{ width: "60%", marginLeft:25 }}>
                      <Text style={{ fontSize: 14, lineHeight:20, fontFamily:"GothamMedium" }}>
                        {blog.eating_article_name}
                      </Text>
                    </View>
                   
                  </View>
                ))}
              </View>

            </ScrollView>
            {/* </ImageBackground> */}
            {this.state.modal && (
          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modal}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                this.setState({ modal: !this.state.modal });
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <View
                    style={{
                      justifyContent: "flex-end",
                      alignSelf: "flex-end",
                    }}
                  >
                    <Ionicons
                      name="close"
                      size={18}
                      onPress={() =>
                        this.setState({ modal: !this.state.modal })
                      }
                    />
                  </View>
                  <View style={{  padding:15}}>
                  <LottieView
                autoPlay
                style={{
                  width: 100,
                  height: 100,
                  alignSelf: "center",
                }}
                source={require("../../../assets/animated/feedback.json")}
              />
                    <Text style={{ fontSize: 16, fontFamily:"GothamBold"}}>
                      Congratulations!!
                    </Text>
                  </View>
               
                </View>
              </View>
            </Modal>
          </View>
        )}
          
           
          </View>
        ) : (
          <View
            style={{
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Please turn on internet</Text>
            </View>
        )}
        </View>
         )}
      </View>
    );
  }
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
      },
      modalView: {
        margin: 15,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },

    optionBox1:{
      flexDirection: "row",
      borderColor:  '#000' ,
      backgroundColor:"#fff",
      paddingHorizontal:10,
       borderWidth:  0.5, 
       borderRadius:10,
       paddingHorizontal: 7,
       paddingVertical:3,
       alignItems: "center"
    },
    optionBox2:{
      flexDirection: "row",
      borderColor:  '#EFDF6E',
      backgroundColor:'#EFDF6E',
      paddingHorizontal:10,

       borderWidth:  0.5, 
       borderRadius:10,
       paddingHorizontal: 7,
       paddingVertical:3,
       alignItems: "center"
    }
})