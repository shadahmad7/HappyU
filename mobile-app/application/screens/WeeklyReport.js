import React, { Component } from "react";
import {
  View,
  Text,
 
  ActivityIndicator,
  
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import NetInfo from "@react-native-community/netinfo";
import { getWeeklyReport } from "../actions/reportAction";
import { AsyncStore } from "../utils/AsyncStore";
import useFonts from "../hooks/useFonts";
import { Ionicons } from "@expo/vector-icons";

const B = (props) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);

export default class WeeklyReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connection_status: null,
      loading: false,
      data:{},
      workout:0,
      load:false,
      meditation:0,
      journal:0
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Weekly Report",
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
    this.setState({load:true})
    let action = await getWeeklyReport();
    action = action.data;
    console.log("JKBHUBU",action);
    this.setState({data:action});

    AsyncStore.getData(`@workout`).then(adata => 
      {
         console.log("NNNNNNNNNNN", adata.days.length);
         if(adata!=  undefined){
          this.setState({workout:adata.days.length})
        }
       }
   )
    AsyncStore.getData(`@meditate`).then(adata => 
      {
         console.log("NNNNNNNNNNN", adata);
         if(adata!=  undefined){
          this.setState({meditation:adata.days.length})
         }
       }
   )
    AsyncStore.getData(`@journal`).then(adata => 
      {
         console.log("NNNNNNNNNNN", adata.days.length);
         if(adata!=  undefined){
          this.setState({journal:adata.days.length})
        }
       }
   )


    this.NetInfoSubscribtion = NetInfo.addEventListener((state) => {
      this.setState({ connection_status: state.isConnected });
    });
    console.log("HGGGG", this.state.connection_status);
    this.setState({ loading: true });
    this.setState({load:false})

  }

  render() {
    return (
      <View style={{ backgroundColor: "#F1F2F7",height:'100%', }}>
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
                source={require("../.././assets/animated/congo.json")}
              />

              <View>
                <View style={{marginHorizontal:10, paddingHorizontal:5, paddingVertical:5}}>
                  <Text style={{fontSize:16,lineHeight:20,color:"#292929",  fontFamily:"GothamMedium"}}>
                    Congratulations on another week of practicing healthy
                    habits! Here is the list of habits you performed this week
                    and the ones you still need to get a hang of! Don’t be
                    discouraged if you weren’t able to complete all your habits,
                    we know you will push yourself next time to be the best
                    version of yourself!
                  </Text>
                </View>


                <View style={{marginHorizontal:10}}>
                <View style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', alignItems:'center', marginHorizontal:10}}>
                    <Text style={{fontSize:14, fontFamily:"GothamMedium"}}>You worked out — </Text>
                    <Text style={{fontSize:16, fontFamily:"GothamBold"}}>{this.state.data.workoutCount}/7 days this week</Text>
                </View>
                <View style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', alignItems:'center', marginHorizontal:10}}>
                <Text style={{fontSize:14, fontFamily:"GothamMedium"}}>You meditated — </Text>
                    <Text style={{fontSize:16, fontFamily:"GothamBold"}}>{this.state.data.meditationCount}/7 days this week</Text>
                </View>
                <View style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', alignItems:'center', marginHorizontal:10}}>
                <Text style={{fontSize:14, fontFamily:"GothamMedium"}}>You ate healthy — </Text>
                    <Text style={{fontSize:16, fontFamily:"GothamBold"}}>{this.state.data.eatingBreakfastCount}/7 days for breakfast</Text>
                </View>
                <View style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', alignItems:'center', marginHorizontal:10}}>
                    <Text style={{fontSize:14, fontFamily:"GothamMedium"}}>You ate healthy — </Text>
                    <Text style={{fontSize:16, fontFamily:"GothamBold"}}>{this.state.data.eatingLunchCount}/7 days for lunch</Text>
                </View>
                <View style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', alignItems:'center', marginHorizontal:10}}>
                    <Text style={{fontSize:14, fontFamily:"GothamMedium"}}>You ate healthy — </Text>
                    <Text style={{fontSize:16, fontFamily:"GothamBold"}}>{this.state.data.eatingDinnerCount}/7 days for dinner</Text>
                </View>
                <View style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', alignItems:'center', marginHorizontal:10}}>
                    <Text style={{fontSize:14, fontFamily:"GothamMedium"}}>You finished — </Text>
                    <Text style={{fontSize:16,width:'50%',textAlign:'right', fontFamily:"GothamBold"}}>{this.state.data.todoCount}/{this.state.data.todoTotalCount} tasks on your to-do list this week</Text>
                </View>
                <View style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', alignItems:'center', marginHorizontal:10}}>
                    <Text style={{fontSize:14, fontFamily:"GothamMedium"}}>You journaled — </Text>
                    <Text style={{fontSize:16, fontFamily:"GothamBold"}}>{this.state.data.journalCount}/7 days this week</Text>
                </View>
                <View style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', alignItems:'center', marginHorizontal:10}}>
                    <Text style={{fontSize:14, fontFamily:"GothamMedium"}}>You socialized — </Text>
                    <Text style={{fontSize:16, fontFamily:"GothamBold"}}>{this.state.data.socialCount}/7 days this week</Text>
                </View>
                <View style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', alignItems:'center', marginHorizontal:10}}>
                    <Text style={{fontSize:14, fontFamily:"GothamMedium"}}>You moved your body — </Text>
                    <Text style={{fontSize:16, fontFamily:"GothamBold"}}>{this.state.data.movementCount}/7 days this week</Text>
                </View>
                <View style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', alignItems:'center', marginHorizontal:10}}>
                    <Text style={{fontSize:14, fontFamily:"GothamMedium",width:'50%',lineHeight:20,textAlign:'left',}}>You drank good amount of water — </Text>
                    <Text style={{fontSize:16, fontFamily:"GothamBold"}}>{this.state.data.waterCount}/7 days this week</Text>
                </View>
                <View style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', alignItems:'center', marginHorizontal:10}}>
                    <Text style={{fontSize:14,fontFamily:"GothamMedium", lineHeight:20,width:'50%',textAlign:'left',}}>You took a break from the screen  — </Text>
                    <Text style={{fontSize:16, fontFamily:"GothamBold"}}>{this.state.data.screenCount}/7 days this week</Text>
                </View>
                <View style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', alignItems:'center', marginHorizontal:10}}>
                    <Text style={{fontSize:14,fontFamily:"GothamMedium",lineHeight:20, width:'50%',textAlign:'left',}}>You practiced kindness and gratitude  — </Text>
                    <Text style={{fontSize:16, fontFamily:"GothamBold"}}>{this.state.data.kindnessCount}/7 days this week</Text>
                </View>
                <View style={{flexDirection:'row', marginVertical:10, justifyContent:'space-between', alignItems:'center', marginHorizontal:10}}>
                    <Text style={{fontSize:14,fontFamily:"GothamMedium",lineHeight:20, width:'50%',textAlign:'left',}}>You practiced finance  — </Text>
                    <Text style={{fontSize:16, fontFamily:"GothamBold"}}>{this.state.data.financeCount}/7 days this week</Text>
                </View>
                </View>

                <View style={{marginHorizontal:10, marginVertical:20}}>
                    <Text Text style={{fontSize:18,textAlign:'center', fontFamily:"GothamBold"}}>Keep up the good work!</Text>
                </View>
            

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
