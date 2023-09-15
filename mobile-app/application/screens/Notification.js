import React, { Component } from "react";
import {
 
  View,
  Text,
 
  Dimensions,
  StyleSheet,
 
} from "react-native";

import { Switch } from "react-native-paper";
import useFonts from "../hooks/useFonts";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

const B = (props) => (
  <Text style={{ fontWeight: "bold", fontSize: 18, color: "#EFDF6E" }}>
    {props.children}
  </Text>
);


export default class Notification extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Notifications`,
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

  constructor(props) {
    super(props);

    this.state = {
      status1: true,
      status2: true,
      status3: true,
      status4: true,
      status5: true,
      status6: true,
      status7: true,
      status8: true,
      status9: true,
      status10: true,
      status11: true,
      status12: true,
     
    };
  }

 async componentDidMount(){
    await useFonts();
    let a = Notifications.getAllScheduledNotificationsAsync();
    console.log("SKKSKKS", a);
  }

  setStatus1(val) {
    if (val === true) {
      this.setState({ status1: !this.state.status1 });
      Notifications.scheduleNotificationAsync({ id: "workout" })
    } else {
      this.setState({ status1: !this.state.status1 });
      Notifications.cancelScheduledNotificationAsync({id: "workout"});
    }
  }
  setStatus2(val) {
    if (val === true) {
      this.setState({ status2: !this.state.status2 });
      Notifications.scheduleNotificationAsync({ id: "meditate" })
    } else {
      this.setState({ status2: !this.state.status2 });
      Notifications.cancelScheduledNotificationAsync({id: "meditate"});
    }
  }
  setStatus3(val) {
    if (val === true) {
      this.setState({ status3: !this.state.status3 });
      Notifications.scheduleNotificationAsync({ id: "eating" })
    } else {
      this.setState({ status3: !this.state.status3 });
      Notifications.cancelScheduledNotificationAsync({id: "eating"});
    }
  }
  setStatus4(val) {
    if (val === true) {
      this.setState({ status4: !this.state.status4 });
      Notifications.scheduleNotificationAsync({ id: "social" })
    } else {
      this.setState({ status4: !this.state.status4 });
      Notifications.cancelScheduledNotificationAsync({id: "social"});
    }
  }
  setStatus5(val) {
    if (val === true) {
      this.setState({ status5: !this.state.status5 });
      Notifications.scheduleNotificationAsync({ id: "reading" })
    } else {
      this.setState({ status5: !this.state.status5 });
      Notifications.cancelScheduledNotificationAsync({id: "reading"});
    }
  }
  setStatus6(val) {
    if (val === true) {
      this.setState({ status6: !this.state.status6 });
      Notifications.scheduleNotificationAsync({ id: "movement" })
    } else {
      this.setState({ status6: !this.state.status6 });
      Notifications.cancelScheduledNotificationAsync({id: "movement"});
    }
  }
  setStatus7(val) {
    if (val === true) {
      this.setState({ status7: !this.state.status7 });
      Notifications.scheduleNotificationAsync({ id: "water" })
    } else {
      this.setState({ status7: !this.state.status7 });
      Notifications.cancelScheduledNotificationAsync({id: "water"});
    }
  }
  setStatus8(val) {
    if (val === true) {
      this.setState({ status8: !this.state.status8 });
      Notifications.scheduleNotificationAsync({ id: "screen" })
    } else {
      this.setState({ status8: !this.state.status8 });
      Notifications.cancelScheduledNotificationAsync({id: "screen"});
    }
  }
  setStatus9(val) {
    if (val === true) {
      this.setState({ status9: !this.state.status9 });
      Notifications.scheduleNotificationAsync({ id: "kindness" })
    } else {
      this.setState({ status9: !this.state.status9 });
      Notifications.cancelScheduledNotificationAsync({id: "kindness"});
    }
  }
  setStatus10(val) {
    if (val === true) {
      this.setState({ status10: !this.state.status10 });
      Notifications.scheduleNotificationAsync({ id: "journal" })
    } else {
      this.setState({ status10: !this.state.status10 });
      Notifications.cancelScheduledNotificationAsync({id: "journal"});
    }
  }
  setStatus11(val) {
    if (val === true) {
      this.setState({ status11: !this.state.status11 });
      Notifications.scheduleNotificationAsync({ id: "todo" })
    } else {
      this.setState({ status11: !this.state.status11 });
      Notifications.cancelScheduledNotificationAsync({id: "todo"});
    }
  }
  setStatus12(val) {
    if (val === true) {
      this.setState({ status12: !this.state.status12 });
      Notifications.scheduleNotificationAsync({ id: "finance" })
    } else {
      this.setState({ status12: !this.state.status12 });
      Notifications.cancelScheduledNotificationAsync({id: "finance"});
    }
  }
  


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#EFDF6E" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
             marginVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18 , fontFamily:'GothamBold' }}>Workout Notifications</Text>
          <Switch
            value={this.state.status1}
            color="grey"
            trackColor={{ true: "#FFEFBA", false: "grey" }}
            onValueChange={(val) => this.setStatus1(val)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
             marginVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontFamily:'GothamBold' }}>Meditation Notifications</Text>
          <Switch
            value={this.state.status2}
            color="grey"
            trackColor={{ true: "#FFEFBA", false: "grey" }}
            onValueChange={(val) => this.setStatus2(val)}
          />
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
             marginVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}>Eating Right Notifications</Text>
          <Switch
            value={this.state.status3}
            color="grey"
            trackColor={{ true: "#FFEFBA", false: "grey" }}
            onValueChange={(val) => this.setStatus3(val)}
          />
        </View> */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
             marginVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontFamily:'GothamBold' }}>Socializing Notifications</Text>
          <Switch
            value={this.state.status4}
            color="grey"
            trackColor={{ true: "#FFEFBA", false: "grey" }}
            onValueChange={(val) => this.setStatus4(val)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
             marginVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontFamily:'GothamBold' }}>Reading Notifications</Text>
          <Switch
            value={this.state.status5}
            color="grey"
            trackColor={{ true: "#FFEFBA", false: "grey" }}
            onValueChange={(val) => this.setStatus5(val)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
             marginVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontFamily:'GothamBold' }}>Movement Notifications</Text>
          <Switch
            value={this.state.status6}
            color="grey"
            trackColor={{ true: "#FFEFBA", false: "grey" }}
            onValueChange={(val) => this.setStatus6(val)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
             marginVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontFamily:'GothamBold' }}>Drink Water Notifications</Text>
          <Switch
            value={this.state.status7}
            color="grey"
            trackColor={{ true: "#FFEFBA", false: "grey" }}
            onValueChange={(val) => this.setStatus7(val)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
             marginVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontFamily:'GothamBold' }}>Screen Break Notifications</Text>
          <Switch
            value={this.state.status8}
            color="grey"
            trackColor={{ true: "#FFEFBA", false: "grey" }}
            onValueChange={(val) => this.setStatus8(val)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
             marginVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontFamily:'GothamBold' }}>Kindness Notifications</Text>
          <Switch
            value={this.state.status9}
            color="grey"
            trackColor={{ true: "#FFEFBA", false: "grey" }}
            onValueChange={(val) => this.setStatus9(val)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
            marginVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontFamily:'GothamBold' }}>Finance Notifications</Text>
          <Switch
            value={this.state.status12}
            color="grey"
            trackColor={{ true: "#FFEFBA", false: "grey" }}
            onValueChange={(val) => this.setStatus12(val)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
             marginVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18 , fontFamily:'GothamBold'}}>Journal Notifications</Text>
          <Switch
            value={this.state.status10}
            color="grey"
            trackColor={{ true: "#FFEFBA", false: "grey" }}
            onValueChange={(val) => this.setStatus10(val)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
             marginVertical: 15,
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontFamily:'GothamBold' }}>To-Do Notifications</Text>
          <Switch
            value={this.state.status11}
            color="grey"
            trackColor={{ true: "#FFEFBA", false: "grey" }}
            onValueChange={(val) => this.setStatus11(val)}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({});
