import React, { Component } from "react";
import {
 
  StyleSheet,
  Image,
  FlatList,
  Text,
  View,
  Modal,
  Pressable,
 
} from "react-native";
import { NavigationActions } from "react-navigation";
import * as Notifications from 'expo-notifications'
import useFonts from "../hooks/useFonts";
import { AsyncStore } from "../utils/AsyncStore";
const B = (props) => <Text style={{ color: "#fff" }}>{props.children}</Text>;

export default class MainHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mood: false,
      GridListItems: [
        { key: "Workout", image: require("../../assets/home/workout.png"), color:'#F3B1CD', color2:'#EB4D90' },
        {
          key: "Meditation",
          image: require("../../assets/home/meditation.png"),
          color:'#F0D5BA'
          , color2:'#C18C6A'
        },
        { key: "Eating Right", image: require("../../assets/home/eating.png"),color:'#BAD5F0', color2:'#478CD2' },
        {
          key: "Socializing",
          image: require("../../assets/home/social.png"),
          color:'#C2D5A8', color2:'#10921E'
        },
        {
          key: "Reading",
          image: require("../../assets/home/reading.png"),
          color:'#FAE4CD', color2:'#EBB983'
        },
        { key: "Movement", image: require("../../assets/home/movement.png"),color:'#B0ABCB', color2:'#4818BD' },
        { key: "Drink Water", image: require("../../assets/home/water.png"),color:'#D6EFF6', color2:'#00BAEE' },
        {
          key: "Finance",
          image: require("../../assets/home/finance.png"),
          color:'#E3F7E3', color2:'#A3DEA3'
        },
       
        {
          key: "Kindness & Gratitude",
          image: require("../../assets/home/kindness.png"),
          color:'#F8B195', color2:'#F07849'
        },
        {
          key: "Screen Break",
          image: require("../../assets/home/noscreen.png"),
          color:'#F8D7E8', color2:'#E691BC'
        },
       
      ],
    };
  }

  navigateToScreen = (route) => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  async componentDidMount() {
    await useFonts();

   


    AsyncStore.getData(`@user`).then(adata => 
      {
       console.log("MMMMMM",adata);
         if(adata!= null && adata!= ''){
if(adata[0].is_passwordchange ==="1"){
this.props.navigation.navigate("ChangePassword")
}
         } 
       }
   )

 

  //   (
  //     async () => {
  //     const lastNotificationResponse = Notifications.useLastNotificationResponse()
  //     if (lastNotificationResponse) {
  //       handleNewNotification(
  //         lastNotificationResponse.notification.request.trigger.remoteMessage,
  //         () => this.navigateToScreen("WorkoutStack")
  
  //       )
  //     }
  // })();



   

    var d = new Date();
    var time = d.getHours();
    console.log("AAAAAA",time);
    if(time > 21 ) {
      this.setState({ mood: true });
    } else {
      AsyncStore.removeData(`@mood`);
    }


    await AsyncStore.getData(`@mood`).then( adata => 
      {
       console.log("MMMMMM",adata); 
         if(adata != undefined){
    this.setState({mood:false});
    console.log("KLKLNKL", this.state.mood);
           } 
       }
   )


   

  }



  async moodMeter(){
    await this.setState({mood:false});
    console.log("kjhjkbkj", this.state.mood);
    AsyncStore.storeData(`@mood`, JSON.stringify(this.state.mood));
  }

  onclick_item(key) {
    console.log("hello", key);
    switch (key) {
      case "Workout":
        this.navigateToScreen("WorkoutStack");
        break;
      case "Meditation":
        this.navigateToScreen("MeditateStack");
        break;
      case "Eating Right":
        this.navigateToScreen("EatingStack");
        break;
      case "Socializing":
        this.navigateToScreen("SocializeStack");
        break;
      case "Reading":
        this.navigateToScreen("ReadingStack");
        break;
      case "Movement":
        this.navigateToScreen("MovementStack");
        break;
      case "Drink Water":
        this.navigateToScreen("WaterStack");
        break;
      case "Screen Break":
        this.navigateToScreen("ScreenStack");
        break;
      case "Kindness & Gratitude":
        this.navigateToScreen("KindnessStack");
        break;
      case "Finance":
        this.navigateToScreen("FinanceStack");
        break;
      default:
      //whatever you want
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{justifyContent:'center',marginVertical:10, alignItems:'center'}}>
          <Text style={{fontFamily:"GothamBold",color:"#000", fontSize:22}}>
            HABITS
          </Text>
          {/* <LottieView
            autoPlay
            style={{
              width: 70,
              height: 70,
              alignSelf: "center",
            }}
            source={this.state.greeting==='Night' ?  require("../../assets/animated/home2.json") : require("../../assets/animated/home.json")}
          /> */}
        </View>
        <FlatList
          data={this.state.GridListItems}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View
              style={[styles.GridViewContainer, {backgroundColor:"#000"}]}
              onTouchEnd={() => this.onclick_item(item.key)}
            >
              <Image
                style={{ width: 40, height: 40, tintColor: "#EFDF6E" }}
                source={item.image}
              />
              <Text
                style={styles.GridViewTextLayout}
                onPress={() => this.onclick_item(item.key)}
              >
                {item.key}
              </Text>
            </View>
          )}
          numColumns={1}
        />
 {this.state.mood && (
              <View>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.mood}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    this.setState({ mood: !this.state.mood });
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                      <View style={{ padding: 15,flexDirection:'row' }}>
                        
<Pressable onPress={() => this.moodMeter()}>
<Image  source={require('../../assets/mood/smile.png')} style={{width:40,marginHorizontal:5, height:40}}  />

</Pressable>

<Pressable onPress={() => this.moodMeter()}>
<Image  source={require('../../assets/mood/sad.png')} style={{width:40,marginHorizontal:5, height:40}} onPress={() => this.moodMeter()} />

</Pressable>

<Pressable onPress={() => this.moodMeter()}>

                        <Image  source={require('../../assets/mood/angry.png')} style={{width:40,marginHorizontal:5, height:40}} onPress={() => this.moodMeter()} />
</Pressable>


<Pressable onPress={() => this.moodMeter()}>

                        <Image  source={require('../../assets/mood/scared.png')} style={{width:40,marginHorizontal:5, height:40}} onPress={() => this.moodMeter()} />
</Pressable>

<Pressable onPress={() => this.moodMeter()}>

                        <Image  source={require('../../assets/mood/repent.png')} style={{width:40,marginHorizontal:5, height:40}} onPress={() => this.moodMeter()} />
</Pressable>

                      </View>
                     
                    </View>
                  </View>
                </Modal>
              </View>
            )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: "center",
    backgroundColor: "#EFDF6E",
  },
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

  greetingContainer: {
    paddingVertical: 20,
    marginHorizontal:5,
    marginBottom:10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems:'center',
    justifyContent: "space-between",
  },
  greetingStyle: {
    color: "#EFDF6E",
    marginTop:20,
    fontSize: 22,
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  GridViewContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal:20,
    flexDirection:'row',
    borderColor: "#fff",
    // borderWidth: 1,
    borderRadius: 5,
    height: 64,
    margin: 10,
    backgroundColor: "#ffeac1",
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 2
  },
  GridViewTextLayout: {
    fontSize: 16,
    fontFamily:"GothamBold",
    marginLeft:30,
    fontWeight: "800",
    textTransform:'uppercase',
    justifyContent: "center",
    textAlign: "center",
    color: "#EFDF6E",
    padding: 10,
  },
});
