import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Linking,
  StyleSheet,
  Modal,
  ScrollView,
  
  
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
var style = require("../../../assets/files/Styles");
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import NetInfo from "@react-native-community/netinfo";
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { AsyncStore } from "../../utils/AsyncStore";
import { getWorkoutData, getWorkoutStatus, getWorkoutVideo, updateWorkoutStatus } from "../../actions/workoutAction";
import CheckBox from "expo-checkbox";
import useFonts from '../../hooks/useFonts'


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});



export default class WorkoutVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: "",
      user:'',
      notification: {},
      modal:false,
      uid:'',
      connection_status: null,
      referBlogs: [],
      video: [],
      loading: false,
      checked:false,
      modifier:{},
      trigDays:[],
      load:false,

    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Workout Videos",
    headerTitleStyle: {
      fontFamily: "GothamBold",
      color:'#EFDF6E'
    },
    headerLeft: null,

    headerStyle: {
      backgroundColor: '#000'
    },
    
    headerRight: () => (
      <Ionicons
        name={"create-outline"}
        onPress={() => {
          AsyncStore.removeData('@workout');
          navigation.popToTop();
        }}
        style={[style.lightarrowbackiconRight, {color:"#EFDF6E", marginRight: 10 }]}
      />
    ),
  });




 async  triggerNotificationHandler (){
   let arr = this.state.trigDays;
  

   for(let i=0; i<arr.length; i++)
   {
    Notifications.scheduleNotificationAsync({
      content: {
      title: 'Workout',
      body: 'Its time to do workout!',
      },
      trigger: {
        channelId:"workout",
        weekday: arr[i],
        hour: 16,
        minute: 21,
        repeats: true,
      },
      });
   }
   
  }
 

  _handleNotificationResponse = response => {
    console.log(response);
    this.props.navigation.navigate("WorkoutVideos")
  };

  

  async componentDidMount() {
await useFonts();

    this.setState({load:true});


  let action = await getWorkoutStatus();

    action = action.messages[0];
  console.log("WWWWWWWWWWW", action );
  if(action.habit_workout == "1"){
    this.setState({checked: true});

  } else {
    this.setState({checked: false});

  }
  console.log("2wwwwwww", this.state.checked);

  let action2 = await getWorkoutData();
  this.setState({referBlogs:action2.messages})
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


   
   
  




    Notifications.setNotificationChannelAsync("workout", {
      name: "workout",
      description: "Remind user about his gym!",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
    });
  

 this.NetInfoSubscribtion = NetInfo.addEventListener((state) => {
      this.setState({ connection_status: state.isConnected });
    });
    this.setState({ loading: true });




    
    await AsyncStore.getData(`@workout`).then(adata => 
      {
         console.log("OOOOOOOOOOO", adata);
         this.setState({modifier:adata})

       }
   )
   console.log("OOOOOOOpppp", this.state.modifier);



   let arr=[];
   arr= this.state.modifier.days;

    for(let i=0 ; i < arr.length ; i++){
if(arr[i] === "Sunday"){
  this.state.trigDays.push(1);
}
if(arr[i] === "Monday"){
  this.state.trigDays.push(2);
}
if(arr[i] === "Tuesday"){
  this.state.trigDays.push(3);
}
if(arr[i] === "Wednesday"){
  this.state.trigDays.push(4);
}
if(arr[i] === "Thursday"){
  this.state.trigDays.push(5);
}
if(arr[i] === "Friday"){
  this.state.trigDays.push(6);
}
if(arr[i] === "Saturday"){
  this.state.trigDays.push(7);
}
    }

    console.log("MKJHG", this.state.trigDays);
    // this.setState({trigDays: arr2});

    if (this.state.modifier.duration === "15 min") {
      let action3 = await getWorkoutVideo(15);
      this.setState({video:action3.messages})
      console.log("2wwwwwww", this.state.video);
    }
    if (this.state.modifier.duration === "30 min") {
      let action3 = await getWorkoutVideo(30);
      this.setState({video:action3.messages})
      console.log("2wwwwwww", this.state.video);
    }
    if (this.state.modifier.duration === "45 min") {
      let action3 = await getWorkoutVideo(45);
      this.setState({video:action3.messages})
      console.log("2wwwwwww", this.state.video);
    }
    if (this.state.modifier.duration === "60 min") {
      let action3 = await getWorkoutVideo(60);
      this.setState({video:action3.messages})
      console.log("2wwwwwww", this.state.video);
    }

   
 

    this.triggerNotificationHandler()

    Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
    this.setState({load:false});

  }





  checkTask(id, status){
    const { video } = this.state;
    console.log("STatud", status)
    if(status === false){
      this.setState({modal:true})
    }
    this.setState({
      video: video.map(vid => {
        if (vid.id === id)
          return {
            ...vid,
            checked: !vid.checked
          };
        return vid;
      })
    });
  }
   
  async check() {
    if (this.state.checked === false) {
      let action = await updateWorkoutStatus(true);

      this.setState({ checked: true });
      console.log("Newwwwwww", action)
    } else {
      let action = await updateWorkoutStatus(false);

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
                  width: 250,
                  height: 250,
                  alignSelf: "center",
                }}
                source={require("../../../assets/animated/exercise.json")}
              />

<View
                style={{
                  paddingHorizontal: 20,
                  alignItems:"center",
                  flexDirection: "row",
                  marginTop:10,
                  backgroundColor:'#fff',
                  borderTopLeftRadius:20,
                  marginHorizontal:10,
                  borderTopRightRadius:20,
                  justifyContent: "space-between",
                  paddingVertical: 20,
                 
                }}
              >
                <Text style={{ fontSize: 18, fontFamily:"GothamBold" ,width:'80%', fontWeight: "800" }}>
                Did you workout today?   
                </Text>
                <CheckBox
                  disabled={false}
                  value={this.state.checked}
                  color="#EFDF6E"
                  onValueChange={() => this.check()}
                  // tintColors={{ true: "#F3B1CD", false: "black" }}
                />
              </View>

<View style={{marginHorizontal:10, borderBottomLeftRadius:10, borderBottomRightRadius:10,   backgroundColor:'#fff',}}>
{this.state.video.map((vid, index) => (
                <View style={{ marginVertical: 0,
              }} key={index}>
                  <View style={{ marginTop: 3, paddingHorizontal:20 }}>
                    <YoutubePlayer
                      height={220}
                      play={false}
                      videoId={vid.workout_video_url}
                      webViewStyle={{ opacity: 0.99 }}
                    />
                  </View>
                </View>
              ))}
</View>
             

              <View style={{marginTop:10}}>
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
                    onTouchEnd={() => Linking.openURL(blog.workout_article_url)}
                  >
                    
                    <View style={{ width: "30%" }}>
                      <Image
                        source={{ uri: blog.workout_article_image }}
                        style={{ height: 100, borderRadius: 5, width: 120 }}
                      />
                    </View>
                    <View style={{ width: "60%", marginLeft:25 }}>
                      <Text style={{ fontSize: 14,fontFamily:"GothamMedium", lineHeight:20  }}>
                        {blog.workout_article_name}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
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
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
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
})