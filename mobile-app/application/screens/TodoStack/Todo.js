import {
  View,
  Text,
  
  StyleSheet,
  
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  
  Pressable,
} from "react-native";
import React, { Component } from "react";
var style = require("../../../assets/files/Styles");

import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import AnimatedInput from "react-native-animated-input";
import { Checkbox } from "react-native-paper";
import LottieView from "lottie-react-native";
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { getTodo, insertTodo, updateTodo } from "../../actions/todoAction";
import NetInfo from "@react-native-community/netinfo";
import useFonts from '../../hooks/useFonts'
export default class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      task: "",
      disable:true,
      load:false,
      connection_status:false,
      taskData: [
        {
          id: 0,
          task: "Exercise",
          checked: false,
        },
        {
          id: 1,

          task: "Avoid Consumption of Sugar",
          checked: false,
        },
        {
          id: 2,

          task: "Avoid Smoking",
          checked: false,
        },
        {
          id: 3,

          task: "Shopping",
          checked: false,
        },
        {
          id: 4,

          task: "Go for walk",
          checked: false,
        },
      ],
    };
  }
  static navigationOptions = ({ navigation }) => ({
    title: "To Do List",
    headerTitleStyle: {
      fontFamily: "GothamBold",
    },
    headerRight: () => (
      <Pressable onPress={() => 
        SheetManager.show("sheet1")}>
      <LottieView
      autoPlay
      // onPress={() => 
      //   SheetManager.show("sheet1")}
      // onPress={() => {
      //   SheetManager.show("sheet1");
      // }}
      style={{
        width: 60,
        height: 60,
        alignSelf: "center",
      }}
      source={require("../../../assets/animated/add.json")}
     
    />
   </Pressable>
    ),
  });



  async triggerNotificationHandler (){
    var h = Math.floor((Math.random() * 18) + 6);
    var m = Math.floor((Math.random() * 60) + 1);

    console.log("m", m);
    console.log("h", h);

     Notifications.scheduleNotificationAsync({
     content: {
     title: 'Todo',
     body: "It's time to prepare your to-do list",
     },
     trigger: {
       channelId:'todo',
       hour: h,
       minute: m,
       repeats: true,
     },
     });
   }
  
 
   _handleNotificationResponse = response => {
     console.log(response);
     this.props.navigation.navigate("Todo")
   };


  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  deleteTask(id) {
    console.log("BBBB", id);
    this.setState(this.state.taskData.splice(id));
    console.log("ZZZZZ", this.state.taskData);
    this.forceUpdate();
  }

  async componentDidMount() {
    await useFonts();
    this.setState({load:true});
    let action = await getTodo();
    this.setState({ taskData: action.messages });
    let arr = this.state.taskData;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].todo_status === "1") {
        let a = true;
        arr[i].todo_status = a;
      } else {
        let a = false;
        arr[i].todo_status = a;
      }
    }

    // console.log("lllllll",arr);
    this.setState({ taskData: arr });

    this.NetInfoSubscribtion = NetInfo.addEventListener((state) => {
      this.setState({ connection_status: state.isConnected });
    });
    console.log("HGGGG", this.state.connection_status);



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
    
    Notifications.setNotificationChannelAsync("todo", {
      name: "todo",
      description: "Remind user todo",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
    });

    this.triggerNotificationHandler()

    Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
    this.setState({load:false});

  }

  async handleSubmit() {
    console.log("SSSSS");
    await SheetManager.hide("sheet1");

    console.log("KLJHFDFGCGH", this.state.task);

    let action = await insertTodo(this.state.task, false);
    console.log("KLJHFDFGCGH", action);
    this.setState({ task: "" });

    console.log("NNNNNNNNN", this.state.taskData);
    this.componentDidMount();
    this.forceUpdate();
  }

  // checkTask(id){
  //   const { taskData } = this.state;
  //   // console.log("LLLLLL", id);
  //   this.setState({
  //     taskData: taskData.map(task => {
  //       if (task.todo_id === id)
  //         return {
  //           ...task,
  //           todo_status: !task.todo_status
  //         };
  //       return task;
  //     })

  //   });
  //   //  this.hitApi(id);

  // }

  async checkTask(id) {
    console.log("Here");

    const { taskData } = this.state;

    for (let i = 0; i < taskData.length; i++) {
      if (taskData[i].todo_id === id) {
        let arr = taskData[i];
        if (arr.todo_status === false) {
          arr.todo_status = true;
          let action = await updateTodo(arr.todo_status, id);
          console.log("LJsdgjkgb", action);
        } else {
          arr.todo_status = false;
          let action = await updateTodo(arr.todo_status, id);
          console.log("LJsdgjkgb", action);
        }
        this.setState({ taskData, [i]: arr });
        console.log("LJsdgjkgb", taskData[i]);
      }
    }
  }

  newTask(text){
this.setState({task:text});
if(this.state.task === ""){
  this.setState({disable:true});
} else {
  this.setState({disable:false});

}
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
         <View style={{ flex: 1, height: "100%" }}>
         {this.state.load ? ( 
        <View style={{justifyContent:'center',flex :1, alignContent:'center', alignItems:'center'}}>
          <ActivityIndicator size="large" color="#EFDF6E" />
        </View>
        ):(
          <View>
        {this.state.connection_status ? (
          <View>
        <ScrollView>
          <View style={{marginLeft:20, marginVertical:10}}>
            <Text style={{color:'grey', fontFamily:"GothamMedium"}}>Today's Task</Text>
          </View>
          {this.state.taskData.map((task, index) => (
            <View
              key={index}
              style={{
                padding: 7,
                marginVertical:7 ,
                marginHorizontal:15,
                borderRadius:5,
                borderWidth:0.2,
                borderColor:'#000',
                backgroundColor:'#fff',
               
                alignContent: "space-between",
                // borderBottomWidth: 1,
                // borderBottomColor: "#EFDF6E",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginVertical: 8,
                  width: "100%",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  justifyContent: "flex-start",
                  marginRight: 20,
                }}
              >
                <View
                  style={{
                    // borderWidth: 0.6,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 3,
                    width: 20,
                    height: 20,
                    // borderColor: "#EFDF6E",
                  }}
                >
                  <Checkbox
                    disabled={false}
                    status={task.todo_status ? "checked" : "unchecked"}
                    // value={task.checked}
                    // onValueChange={() => {this.checkTask(task.id) }}
                    onPress={() => {
                      this.checkTask(task.todo_id);
                    }}
                    // tintColors={{ true:"#EFDF6E", false: 'black' }}
                    color="#EFDF6E"
                  />
                </View>

                <Text
                  style={{
                    fontFamily:"GothamMedium",
                    color: "#000",
                    marginLeft:20,
                    fontSize: 16,
                    opacity: 0.8,
                    marginLeft: 10,
                    textDecorationLine: task.todo_status
                      ? "line-through"
                      : "none",
                  }}
                >
                  {task.todo_name}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <ActionSheet
          id="sheet1"
          initialOffsetFromBottom={1}
          statusBarTranslucent
          bounceOnOpen={true}
          drawUnderStatusBar={true}
          bounciness={4}
          gestureEnabled={true}
          defaultOverlayOpacity={0.3}
        >
          <View style={{ backgroundColor: "#F1F2F7" }}>
            <View style={{ padding: 20 }}>
              <View style={{ justifyContent: "center", alignSelf: "center" }}>
                <Text
                  style={{
                   
                    fontSize: 16,
                    color: "#000", fontFamily:"GothamBold"
                  }}
                >
                  {" "}
                  Add New Task
                </Text>
              </View>
              <View style={{ padding: 10, marginVertical: 10 }}>
                <AnimatedInput
                  placeholder="Task Description"
                  onChangeText={(text) => this.newTask(text)}
                  value={this.state.task}
                  styleLabel={{
                    
                    fontFamily:"GothamMedium",
                    fontSize: 14,
                    color: "grey",
                  }}
                  styleInput={{ color: "#000", fontFamily:"GothamMedium", fontSize: 15 }}
                  styleBodyContent={{
                    borderBottomWidth: 1.5,
                    borderBottomColor: "grey",
                  }}
                />
              </View>

              <View
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  padding: 10,
                }}
              >
                <TouchableOpacity
                disabled={this.state.task.length === 0 ? true : false}
                  style={[styles.button2, { backgroundColor: this.state.task.length === 0 ? "grey" : "#EFDF6E"}]}
                  onPress={() => this.handleSubmit()}
                >
                  <Text style={{ fontSize: 15, fontFamily:"GothamBold", color: "#000" }}>ADD</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ActionSheet>
        </View>
          ) : (
            <View
              style={{
                backgroundColor: "#EFDF6E",
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
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE763",
    // maxHeight: "150%",
  },
  button2: {
    backgroundColor: "#EFDF6E",
    height: "auto",
    padding: 15,
    alignItems: "center",
   
    // borderWidth: 1,
    borderRadius: 30,
    width: 90,
  },
  button: {
    borderWidth: 2,
    width: "40%",
    alignSelf: "center",
    justifyContent: "center",
    borderColor: "#EFDF6E",
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 40,
    marginRight: 10,
    backgroundColor: "#002E47",
  },
  buttonText: {
    borderColor: "#EFDF6E",
    alignSelf: "center",
    padding: 15,
    fontSize: 20,
    color: "#FFCB1F",
    fontWeight: "bold",
  },

  containerOption: {
    backgroundColor: "#002E47",
    height: 65,
    // flexDirection:'row',
    borderRadius: 5,
    // alignItems:'center',
    justifyContent: "center",
    margin: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    paddingTop: 12,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  card3: {
    marginTop: 20,
    marginHorizontal: 20,
    height: "auto",
    borderRadius: 10,
    borderColor: "#EFDF6E", // if you need
    borderWidth: 1,
    backgroundColor: "#000",
    overflow: "hidden",
    shadowColor: "black",
    shadowRadius: 10,
    shadowOpacity: 1,
  },
});
