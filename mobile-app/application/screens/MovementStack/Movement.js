import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  
  Linking,
  StyleSheet,
  
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import NetInfo from "@react-native-community/netinfo";
import CheckBox from "expo-checkbox";
import useFonts from "../../hooks/useFonts";
const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { getMovementData, putMovementStatus } from "../../actions/movementAction";
import { getWorkoutStatus } from "../../actions/workoutAction";
import { Ionicons } from "@expo/vector-icons";

export default class Movement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
  
      connection_status: null,
      loading: false,
      load:false,
      referBlogs: [
      
      ],
      content:[
        "Taking a short walk refreshes the mind.",
        "We tend to sit in one place for too long.",
        "Your body needs a break.",
        "Sitting all day can make your body stiff.",
        "It’s time to get some fresh air.",
        "All the best ideas come when you’re talking a walk.",
        "Movement is necessary for for nurturing your mind.",
      ]
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Movement",
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


  async triggerNotificationHandler (){
    var h = Math.floor((Math.random() * 18) + 6);
    var m = Math.floor((Math.random() * 60) + 1);
    var z = Math.floor(Math.random() * 7);

    console.log("m", m);
    console.log("h", h);

     Notifications.scheduleNotificationAsync({
     content: {
     title: 'Movement',
     body: `${this.state.content[z]} It’s time to move`,
     },
     trigger: {
       channelId:"movement",
       hour: h,
       minute: m,
       repeats: true,
     },
     });
   }
  
 
   _handleNotificationResponse = response => {
     console.log(response);
     this.props.navigation.navigate("Movement")
   };


  async componentDidMount() {
    await useFonts();
    this.setState({load:true})

    let action = await getWorkoutStatus();

    action = action.messages[0];
  console.log("WWWWWWWWWWW", action );
  if(action.habit_movement == "1"){
    this.setState({checked: true});

  } else {
    this.setState({checked: false});

  }
  console.log("2wwwwwww", this.state.checked);

  let action2 = await getMovementData();
  await this.setState({referBlogs:action2.messages})
  console.log("2wwwwwww", this.state.referBlogs);

    Permissions.getAsync(Permissions.NOTIFICATIONS)
    .then((status) => {
    if (status !== 'granted') {
    return Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    })
    .then((status) => {
    if (status !== 'granted') {
    return;
    }
    })


    Notifications.setNotificationChannelAsync("movement", {
      name: "movement",
      description: "Remind user",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
    });

    this.NetInfoSubscribtion = NetInfo.addEventListener((state) => {
      this.setState({ connection_status: state.isConnected });
    });
    console.log("HGGGG", this.state.connection_status);


    this.triggerNotificationHandler()

    Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
    this.setState({load:false})
  }

  async check() {
    if (this.state.checked === false) {
      let action = await putMovementStatus(true);

      this.setState({ checked: true });
      console.log("Newwwwwww", action)
    } else {
      let action = await putMovementStatus(false);

      this.setState({ checked: false });
      console.log("Newwwwwww", action)

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
            <ScrollView>
              <LottieView
                autoPlay
                style={{
                  width: 300,
                  height: 300,
                  alignSelf: "center",
                }}
                source={require("../../../assets/animated/movement.json")}
              />

              <View
                style={{
                  paddingHorizontal: 20,
                  margin:10, 
                  borderRadius:10,
                  backgroundColor:'#fff',
                  flexDirection: "row",
                  marginTop:10,
                  justifyContent: "space-between",
                  paddingVertical: 20,
                }}
              >
                <Text style={{ fontSize: 18, fontFamily:"GothamBold"  }}>
                Have you moved today? 
                </Text>
                <CheckBox
                  disabled={false}
                  color="#EFDF6E"
                  value={this.state.checked}
                  onValueChange={() => this.check()}
                  tintColors={{ true: "#F15927", false: "black" }}
                />
              </View>

             

           


        
              <View>
                {this.state.referBlogs.map((blog, index) => (
                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 0,
backgroundColor:'#fff',
borderRadius:10,
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
                    onTouchEnd={() => Linking.openURL(blog.movement_article_url)}
                  >
                    
                    <View style={{ width: "30%" }}>
                      <Image
                        source={{ uri: blog.movement_article_image }}
                        style={{ height: 100, borderRadius: 5, width: 120 }}
                      />
                    </View>
                    <View style={{ width: "60%",marginLeft:25 }}>
                      <Text style={{ fontSize: 14,fontFamily:"GothamMedium" , lineHeight:20  }}>
                        {blog.movement_article_name}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
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
  queContainer: {
    paddingVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: "#000",
    paddingHorizontal: 15,
  },
});
