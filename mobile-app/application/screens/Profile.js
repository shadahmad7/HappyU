import React, { Component } from "react";

import {
 
  Button,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Linking,
  StyleSheet,
 
  Share,
  Platform,
 
  Pressable,
  
} from "react-native";
import { AsyncStore } from "../utils/AsyncStore";
import useFonts from "../hooks/useFonts";
import { Ionicons } from "@expo/vector-icons";

import LottieView from "lottie-react-native";
import { ScrollView } from "react-native-gesture-handler";

const APPLE_STORE_ID = 'id1203637303';


const B = (props) => (
  <Text style={{ fontFamily:"GothamBold", fontSize: 18, color: "#000" }}>
    {props.children}
  </Text>
);

var styles = require("../../assets/files/Styles");
var { height, width } = Dimensions.get("window");

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Profile`,
    headerTitleStyle: {
      fontFamily: "GothamBold",
      color:'#EFDF6E'
    },
    headerStyle: {
      backgroundColor: '#000'
    },
    headerLeft:null
  });

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      name:'',
      disable:true
    };
  }


  async componentDidMount(){
    await useFonts();
    AsyncStore.getData(`@user`).then(adata => 
      {
       console.log("MMMMMM",adata);
         if(adata!= null && adata!= ''){
this.setState({name: adata[0].user_name})
         } 
       }
   )
  }

  onLogout(){
    console.log("Here");
    AsyncStore.removeData('@user');
    this.props.navigation.navigate("Auth");
  }

  onRate = () => {
    //This is the main trick
    if (Platform.OS != 'ios') {
      Linking.openURL(
        `https://play.google.com/store/apps/details?id=com.happy.u&hl=en_IN&gl=US`,
      ).catch(
          (err) => alert('Please check for Google Play Store')
      );
    } else {
      Linking.openURL(
        `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`,
      ).catch((err) => alert('Please check for the App Store'));
    }
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message: "https://play.google.com/store/apps/details?id=com.happy.u&hl=en_IN&gl=US",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
   

    return (
      <View style={{ flex: 1, backgroundColor: "#EFDF6E" }}>
        <ScrollView>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
        <LottieView
                autoPlay
                style={{
                  width: 120,
                  height: 120,
                  alignSelf: "center",
                }}
                source={require("../../assets/animated/user.json")}
              />
          <View style={{ marginVertical: 15 }}>
            <Text style={{ color: "#000",fontFamily:"GothamMedium", fontSize: 18 }}>
              Hello, <B>{this.state.name}</B>
            </Text>
          </View>

          <View
            style={{
              marginHorizontal: 20,
              width: width,
              paddingHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <Pressable onPress={() => this.props.navigation.navigate("ChangePassword")}>
            <View
              style={{
                borderColor: "#000",
                marginVertical: 10,
                borderRadius: 10,
                borderWidth: 0.3,
                justifyContent: "flex-start",
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}
            >
              <Text style={{ color: "#000",fontFamily:"GothamBold", }}>Change Password</Text>
            </View>
            </Pressable>
            <Pressable onPress={() => this.props.navigation.navigate("WeeklyReport")}>
            <View
              style={{
                borderColor: "#000",
                marginVertical: 10,
                borderRadius: 10,
                borderWidth: 0.3,
                justifyContent: "flex-start",
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}
            >
              <Text style={{ color: "#000",fontFamily:"GothamBold", }}>Weekly Reports</Text>
            </View>
            </Pressable>
            <Pressable onPress={() => this.props.navigation.navigate("Notification")}>
            <View
              style={{
                borderColor: "#000",
                marginVertical: 10,
                borderRadius: 10,
                borderWidth: 0.3,
                justifyContent: "flex-start",
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}
            >
              <Text style={{ color: "#000",fontFamily:"GothamBold", }}>Notifications</Text>
            </View>
            </Pressable>
           
           <Pressable onPress={() => this.onRate()}>
            <View
              style={{
                borderColor: "#000",
                marginVertical: 10,
                borderRadius: 10,
                borderWidth: 0.3,
                justifyContent: "flex-start",
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}
            >
              <Text style={{ color: "#000",fontFamily:"GothamBold", }}>Rate Us</Text>
            </View>
            </Pressable>

            <Pressable onPress={() => this.props.navigation.navigate("Terms")}>
            <View
              style={{
                borderColor: "#000",
                marginVertical: 10,
                borderRadius: 10,
                borderWidth: 0.3,
                justifyContent: "flex-start",
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}
            >
              <Text style={{ color: "#000",fontFamily:"GothamBold", }}>Terms & Conditions</Text>
            </View>
            </Pressable>
            <Pressable onPress={() => this.props.navigation.navigate("Privacy")}>
            <View
              style={{
                borderColor: "#000",
                marginVertical: 10,
                borderRadius: 10,
                borderWidth: 0.3,
                justifyContent: "flex-start",
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}
            >
              <Text style={{ color: "#000",fontFamily:"GothamBold", }}>Privacy Policy</Text>
            </View>
            </Pressable>

            <Pressable onPress={() => this.onShare()}>
            <View
              style={{
                borderColor: "#000",
                marginVertical: 10,
                borderRadius: 10,
                borderWidth: 0.3,
                justifyContent: "flex-start",
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}
            >
              <Text style={{ color: "#000",fontFamily:"GothamBold", }}>Share</Text>
            </View>
            </Pressable>
          </View>
        </View>

        <View
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                 
                  marginBottom:20,
                }}
              >
                <TouchableOpacity
               
                  style={style.button2}
                  onPress={() => this.onLogout()}
                >
                  <Text style={{ fontSize: 14, fontFamily:"GothamBold", color: "#EFDF6E" }}>LOGOUT</Text>
                </TouchableOpacity>
              </View>
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  icon: {
    // backgroundColor: '#fff',
    position: "absolute",
    right: 50,

    bottom: 10,
  },
  button2: {
    backgroundColor:  "#000" ,
    height: "auto",
    padding: 15,
    alignItems: "center",
   

    borderRadius: 30,
    
  },
});
