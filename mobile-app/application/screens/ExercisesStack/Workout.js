import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import {
  
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  
} from "react-native";
import { AsyncStore } from "../../utils/AsyncStore";
import { withNavigationFocus } from "react-navigation";
import useFonts from "../../hooks/useFonts";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

class Workout extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Workout',
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

  async componentDidMount(){
    await useFonts();
    AsyncStore.getData(`@workout`).then(adata => 
      {
        console.log("SSSSSS", adata);
         if(adata!= null && adata!= ''){
           console.log("THERE")
this.props.navigation.navigate("WorkoutVideos");
         } else {
          console.log("HERE")
         }
       }
   )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.check();
    }
  }

  check() {
    AsyncStore.getData(`@workout`).then((adata) => {
      console.log("SSSSSS", adata);
      if (adata != null && adata != "") {
        console.log("HERE");
       this.props.navigation.navigate("WorkoutVideos")
      } else {
        console.log("THERE");

        // this.setState({ mode: "j1" });
      }
    });
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
        <LottieView
                autoPlay
                style={{
                  width: 200,
                  height: 200,
                  marginBottom:-15,
                  alignSelf: "center",
                }}
                source={require("../../../assets/animated/work.json")}
              />
          <View style={{ alignItems:'center', justifyContent: "center" }}>
            <Text
              style={{
                top: 10,
                fontFamily:"GothamBold",
                lineHeight: 40,
                fontSize: 22,
                marginHorizontal: 20,
                color: "#000",
                marginVertical:20,
              }}
            >
              What is your fitness goal?
            </Text>
          </View>

          <TouchableOpacity onPress={this.navigateToScreen("LoseWeight")}>
            <View style={styles.containerOption}>
              <Text style={styles.text}>To lose weight</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen("GainWeight")}>
            <View style={styles.containerOption}>
              <Text style={styles.text}>To gain weight</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen("MaintainWeight")}>
            <View style={styles.containerOption}>
              <Text style={styles.text}>To maintain weight</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#EFDF6E",
  },

  containerOption: {
    backgroundColor: "#000",
    height: 80,
    borderRadius: 5,
    borderColor:"#fff",
    borderWidth:2,
    margin: 10,
    alignItems:'center',
    justifyContent:'center',
   
    marginHorizontal: 50,
   
  },

  text: {
    color: "#EFDF6E",
    fontSize: 19,
    fontFamily:"GothamBold",
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#f39c12",
    textAlign: "center",
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
export default withNavigationFocus(Workout);
