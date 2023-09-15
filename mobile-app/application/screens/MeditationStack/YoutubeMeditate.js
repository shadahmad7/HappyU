import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import YoutubePlayer from "react-native-youtube-iframe";
var style = require("../../../assets/files/Styles");
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import NetInfo from "@react-native-community/netinfo";
import { AsyncStore } from "../../utils/AsyncStore";
import CheckBox from "expo-checkbox";
import useFonts from "../../hooks/useFonts";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { getMeditationApp, getMeditationData, getMeditationVideo, putMeditationStatus } from "../../actions/meditationAction";
import { getWorkoutStatus } from "../../actions/workoutAction";

export default class YoutubeMeditate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: "",
      modal: false,
      connection_status: null,
      referBlogs: [
      ],
      referApps: [
        
      ],
      video: [],
      loading: false,
      load:false,
      checked: false,
      trigDays: [],
      modifier:{}
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Meditation Videos",
    headerTitleStyle: {
      fontFamily: "GothamBold",
      color:'#EFDF6E'
    },
    headerStyle: {
      backgroundColor: '#000'
    },
    headerLeft: null,
    
    headerRight: () => (
      <Ionicons
        name={"create-outline"}
        onPress={() => {
          AsyncStore.removeData('@meditate');

          navigation.popToTop();
        }}
        style={[style.lightarrowbackiconRight, {color:"#EFDF6E", marginRight: 10 }]}
      />
    ),
  });

  async triggerNotificationHandler() {
    let arr = this.state.trigDays;
console.log("MMMMMMMMM", arr)
    for (let i = 0; i < arr.length; i++) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Meditation",
          body: "Its time to meditate!",
        },
        trigger: {
          channelId: "meditate",
          weekday: arr[i],
          hour: 14,
          minute: 42,
          repeats: true,

        },
      });
    }
  }

  _handleNotificationResponse = (response) => {
    console.log(response);
    this.props.navigation.navigate("YoutubeMeditate");
  };

  async componentDidMount() {
    await useFonts();
this.setState({load:true});
    let action = await getWorkoutStatus();

    action = action.messages[0];
  console.log("WWWWWWWWWWW", action );
  if(action.habit_meditation == "1"){
    this.setState({checked: true});

  } else {
    this.setState({checked: false});

  }
  console.log("2wwwwwww", this.state.checked);

  let action2 = await getMeditationData();
  await this.setState({referBlogs:action2.messages})
  console.log("2wwwwwww", this.state.referBlogs);

  let action3 = await getMeditationApp();
  await this.setState({referApps:action3.messages})
  console.log("rtrgdrtdg", this.state.referApps);


    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((status) => {
        if (status !== "granted") {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
      })
      .then((status) => {
        if (status !== "granted") {
          return;
        }
      });

      Notifications.setNotificationChannelAsync("meditate", {
        name: "meditate",
        description: "Remind user about his gym!",
        importance: Notifications.AndroidImportance.HIGH,
        sound: "default",
      });
     
    this.NetInfoSubscribtion = NetInfo.addEventListener((state) => {
      this.setState({ connection_status: state.isConnected });
    });
    console.log("HGGGG", this.state.connection_status);

    
    this.setState({ loading: true });
    

    await AsyncStore.getData(`@meditate`).then(adata => 
      {
         console.log("OOOOOOOOOOO", adata);
         this.setState({modifier:adata})

       }
   )
   console.log("OOOOOOOpppp", this.state.modifier);



   let arr=[];
   arr= this.state.modifier.days;  
     for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "Sunday") {
        this.state.trigDays.push(1);
      }
      if (arr[i] === "Monday") {
        this.state.trigDays.push(2);
      }
      if (arr[i] === "Tuesday") {
        this.state.trigDays.push(3);
      }
      if (arr[i] === "Wednesday") {
        this.state.trigDays.push(4);
      }
      if (arr[i] === "Thursday") {
        this.state.trigDays.push(5);
      }
      if (arr[i] === "Friday") {
        this.state.trigDays.push(6);
      }
      if (arr[i] === "Saturday") {
        this.state.trigDays.push(7);
      }
    }

    console.log("MKJHG", this.state.trigDays);

    if (this.state.modifier.duration === "5 min") {
      let action4 = await getMeditationVideo(5);
      this.setState({video:action4.messages})
      console.log("2wwwwwww", this.state.video);
    }
    if (this.state.modifier.duration === "10 min") {
      let action4 = await getMeditationVideo(10);
      this.setState({video:action4.messages})
      console.log("2wwwwwww", this.state.video);
    }
    if (this.state.modifier.duration === "15 min") {
      let action4 = await getMeditationVideo(15);
      this.setState({video:action4.messages})
      console.log("2wwwwwww", this.state.video);
    }
    if (this.state.modifier.duration === "30 min") {
      let action4 = await getMeditationVideo(30);
      this.setState({video:action4.messages})
      console.log("2wwwwwww", this.state.video);
      this.triggerNotificationHandler();
    }


    this.triggerNotificationHandler()

    Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
    this.setState({load:false});

  }

  checkTask(id, status) {
    const { video } = this.state;
    console.log("Status", status);
    if (status === false) {
      this.setState({ modal: true });
    }
    this.setState({
      video: video.map((vid) => {
        if (vid.id === id)
          return {
            ...vid,
            checked: !vid.checked,
          };
        return vid;
      }),
    });
  }

async check() {
    if (this.state.checked === false) {
      let action = await putMeditationStatus(true);

      this.setState({ checked: true });
      console.log("Newwwwwww", action)
    } else {
      let action = await putMeditationStatus(false);

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
                source={require("../../../assets/animated/meditation.json")}
              />


<View style={{marginHorizontal:10,marginVertical:10, borderRadius:10, backgroundColor:'#fff'}}>
              <View
                style={{
                  paddingHorizontal: 20,
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: 10,
                  justifyContent: "space-between",
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, width: "80%", fontFamily:"GothamBold"}}
                >
                  Did you meditate today?
                </Text>
                <CheckBox
                  disabled={false}
                  value={this.state.checked}
                  onValueChange={() => this.check()}
                  color="#EFDF6E"
                  tintColors={{ true: "#F15927", false: "black" }}
                />
              </View>

              {this.state.video.map((vid, index) => (
                <View style={{ marginVertical: 5 }} key={index}>
                  <View style={{ marginTop: 20, paddingHorizontal:10 }}>
                    <YoutubePlayer
                      height={200}
                      play={false}
                      videoId={vid.meditation_video_url}
                      webViewStyle={{ opacity: 0.99 }}
                    />
                  </View>
                  {/* <View
                    style={{
                      flexDirection: "row",
                      marginTop: -70,
                      marginRight: 20,
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <CheckBox
                      disabled={false}
                      value={vid.checked}
                      onValueChange={() => {this.checkTask(vid.id, vid.checked) }}
                      tintColors={{ true: "#F15927", false: "black" }}
                    />
                    <Text>Completed</Text>
                  </View> */}
                </View>
              ))}
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
                    onTouchEnd={() => Linking.openURL(blog.meditation_article_url)}
                  >
                    <View style={{ width: "30%" }}>
                      <Image
                        source={{ uri: blog.meditation_article_image }}
                        style={{ height: 100, borderRadius: 5, width: 120 }}
                      />
                    </View>
                    <View style={{ width: "60%", marginLeft:25 }}>
                      <Text style={{ fontSize: 14 ,fontFamily:"GothamMedium", lineHeight:20,}}>{blog.meditation_article_name}</Text>
                    </View>
                    
                  </View>
                ))}
              </View>

              <View style={{ paddingHorizontal: 15, marginVertical:10 }}>
                <View style={{ paddingVertical: 25, paddingHorizontal: 10 }}>
                  <Text style={{ fontSize: 16,fontFamily:"GothamMedium", }}>
                    Suggestive Meditation Apps
                  </Text>
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {this.state.referApps.map((app, index) => (
                    <Pressable
                      onPress={() => Linking.openURL(app.meditation_app_url)}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: 10,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0,
                          shadowRadius: 0,  
                          elevation: 4,
    
                        }}
                      >
                        <Image
                          source={{ uri: app.meditation_app_image }}
                          style={{ height: 100, width: 100, borderRadius: 10 }}
                        />
                        <View>
                          <Text style={{ width: 100,fontSize:12, lineHeight:15, fontFamily:"GothamMedium", }}>{app.meditation_app_name}</Text>
                        </View>
                      </View>
                    </Pressable>
                  ))}
                </ScrollView>
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
                      <View style={{ padding: 15 }}>
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
});
