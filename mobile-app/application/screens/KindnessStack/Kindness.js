import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import CheckBox from "expo-checkbox";
import NetInfo from "@react-native-community/netinfo";
import useFonts from "../../hooks/useFonts";
const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
import { Ionicons } from "@expo/vector-icons";

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { getKindnessData, putKindnessStatus } from "../../actions/kindnessAction";
import { getWorkoutStatus } from "../../actions/workoutAction";

export default class Kindness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      load:false,
      connection_status: null,
      loading: false,
      referBlogs: [
     
      ],
      content:[
        "No act of kindness, no matter how small, is ever wasted.",
        "When you start counting the good things, your whole life can turn around.",
        "Kindness costs nothing, but means everything.",
        "It takes only one act of kindness to change a person’s life.",
        "Enjoy the little things, for one day you may look back and realize they were the big things.",
        "Kindness begins with the understanding that we all struggle.",
        "Do things for people not because of who they are or what they do in return, but because of who you are.",
      ],
      content2:[
        "Write a kind note for a family member today!",
        "Write down five things you are grateful for today!",
        "Give a compliment to a stranger today!",
        "Buy a loved one something they like today! (Ps: it doesn’t have to be expensive!",
        "Take yourself out on a date today!",
        "Do an act of kindness and make someone smile today!",
        "Appreciate a family member/friend by letting them know how much they mean to you today!",
      ]
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Kindness & Gratitude",
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
    var x = Math.floor(Math.random() * 7);
    var y = Math.floor(Math.random() * 7);
    console.log("h", h);
    console.log("m", m);
    // console.log("newww",`${this.state.content[x]} ${this.state.content2[y]} `);
   
     Notifications.scheduleNotificationAsync({
     content: {
     title: 'Kindness & Gratitude',
     body: `${this.state.content[x]} ${this.state.content[y]} `,
     },
     trigger: {
       channelId:'kindness',
       hour: h,
       minute: m,
       repeats: true,
     },
     });
   }
  
 
   _handleNotificationResponse = response => {
     console.log(response);
     this.props.navigation.navigate("Kindness")
   };

  async componentDidMount() {
    await useFonts();
    this.setState({load:true})
    let action = await getWorkoutStatus();

    action = action.messages[0];
  console.log("WWWWWWWWWWW", action );
  if(action.habit_kindness == "1"){
    this.setState({checked: true});

  } else {
    this.setState({checked: false});

  }
  console.log("2wwwwwww", this.state.checked);

  let action2 = await getKindnessData();
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

    Notifications.setNotificationChannelAsync("kindess", {
      name: "kindness",
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
      let action = await putKindnessStatus(true);

      this.setState({ checked: true });
      console.log("Newwwwwww", action)
    } else {
      let action = await putKindnessStatus(false);

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
                  width: 230,
                  height: 230,
                  alignSelf: "center",
                }}
                source={require("../../../assets/animated/kindness.json")}
              />

              <View
                style={{
                  paddingHorizontal: 20,
                  margin:10,
                  backgroundColor:"#fff",
                  borderRadius:10,
                  alignItems:"center",
                  flexDirection: "row",
                  marginTop:10,
                  justifyContent: "space-between",
                  paddingVertical: 10,
                }}
              >
                <Text style={{ fontSize: 18,width:'80%',lineHeight:25, fontFamily:"GothamBold"  }}>
                Did you practice gratitude and kindness today?   
                </Text>
                <CheckBox
                  disabled={false}
                  value={this.state.checked}
                  onValueChange={() => this.check()}
                  color="#EFDF6E"
                  tintColors={{ true: "#F15927", false: "black" }}
                />
              </View>

             

           


        
              <View>
                {this.state.referBlogs.map((blog, index) => (
                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 0,
backgroundColor:"#fff", 
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
                    onTouchEnd={() => Linking.openURL(blog.kindness_article_url)}
                  >
                    
                    <View style={{ width: "30%" }}>
                      <Image
                        source={{ uri: blog.kindness_article_image }}
                        style={{ height: 100, borderRadius: 5, width: 120 }}
                      />
                    </View>
                    <View style={{ width: "60%", marginLeft:25 }}>
                      <Text style={{ fontSize: 14, fontFamily:"GothamMedium", lineHeight:20  }}>
                        {blog.kindness_article_name}
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
