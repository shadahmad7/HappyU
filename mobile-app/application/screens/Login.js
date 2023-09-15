import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from "react-native";
import {
 
  Text,
  
  View,
  
} from "native-base";
import { NavigationActions } from "react-navigation";

import { StyleSheet } from "react-native";

import {  Ionicons } from "@expo/vector-icons";
import useFonts from "../hooks/useFonts";
import { login } from "../actions/authAction";
import { AsyncStore } from "../utils/AsyncStore";
import { TextInput } from "react-native-gesture-handler";
export default class Login extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super();
    this.state = {
      email: "",
      p:true,
      emailError: "",
      password: "",
      passError: "",
      selected: false,
      erroMessage: "",
      load:true,
    };
  }

 async componentDidMount() {
    await useFonts();
    this.setState({load:true});
    AsyncStore.getData(`@user`).then((adata) => {
      console.log("SSSSSS", adata);
      if (adata != null && adata != "") {
        this.props.navigation.navigate("App");
      } else {
        this.props.navigation.navigate("Auth");
      }
    });
    setTimeout(() => {

      this.setState({load:false});
    },2000)

  }

  loginSubmit = async () => {
    this.setState({load:true});
    const { email, password } = this.state;
    const strongRegex = new RegExp(
      "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
    );

    if (!strongRegex.test(email)) {
      this.setState({ emailError: "Invalid Email" });
      this.setState({ passError: "" });
    } else if (password.length < 6) {
      this.setState({ passError: "Password should be more than 8 characters" });
      this.setState({ emailError: "" });
    } else {
      let action = await login(email, password);
      console.log("BBBBB", action);
      if (action.status === 404) {
        this.setState({ emailError: "" });
        this.setState({ passError: "" });
        this.setState({ erroMessage: "No user found" });
      } else if (action.data.success === "Wrong Cred") {
        this.setState({ passError: "Wrong Password" });
      } else {
        this.setState({ emailError: "" });
        this.setState({ passError: "" });
        this.setState({ erroMessage: "" });
        AsyncStore.storeData(`@user`, JSON.stringify(action.data.res));

        this.props.navigation.navigate("App");
      }
    }
    this.setState({load:false});

  };

  forgetpass() {
    const navigateAction = NavigationActions.navigate({
      routeName: "ForgetPass",
    });
    this.props.navigation.dispatch(navigateAction);
  }

  onValueChange() {
    this.setState({ selected: !this.state.selected });
  }

  register() {
    const navigateAction = NavigationActions.navigate({
      routeName: "Register",
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <View style={style.container}>
        {this.state.load ? ( 
        <View style={{justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size="large" color="#EFDF6E" />
        </View>
        ):(
        <View>
          {/* image */}
          <View
            style={{
              justifyContent: "center",
              marginVertical: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/logo.png")}
              style={{ height: 180, width: 180 }}
            />
          </View>
          {/* login */}
          <View
            style={{
              justifyContent: "center",
              marginVertical: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 26 , fontFamily:'GothamBold' }}>Login Now</Text>
            <Text
              style={{
                fontSize: 12,
                marginVertical: 10,
                fontWeight: "200",
                fontFamily:'GothamMedium',
                color: "grey",
              }}
            >
              Please enter your details below to continue.
            </Text>
          </View>

          {/* card */}
          <View
            style={{
              borderWidth: 0.1,
              marginHorizontal: 25,
              marginVertical: 10,
              borderRadius: 5,
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}
          >
            <View style={style.inputContainer}>
              {/* <Ionicons name="mail" size={22} color="grey"/> */}
              <TextInput
                placeholder="Email address"
                onChangeText={(email) => this.setState({ email })}
                style={{
                 fontFamily:'GothamLight',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: "#f7f7f7",
                  borderRadius: 10,
                  width: "95%",
                }}
              />
            </View>
            {this.state.emailError.length > 0 && (
              <Text style={{color:'red',fontFamily:'GothamMedium',marginBottom:10,fontSize:12, justifyContent:'flex-start', marginLeft:30}}>
              {this.state.emailError}
              </Text>
            )} 
            <View style={style.inputContainer}>
              <TextInput 
              style={style.input} 
              onChangeText={(password) => this.setState({ password })}
              placeholder="Password" 
              secureTextEntry={this.state.p}
              />
              <Ionicons
                style={style.icon}
                
                name={this.state.p ? "eye" : "eye-off"}
                color={this.state.p ? "grey":"#413D3E"}
                size={20}
                onPress={() => this.setState({p: !this.state.p})}
              />
            </View>
            {this.state.passError.length > 0 && (
              <Text style={{color:'red',fontFamily:'GothamMedium',marginBottom:10,fontSize:12, justifyContent:'flex-start', marginLeft:30}}>
              {this.state.passError}
              </Text>
            )} 
            <Text
             onPress={this.forgetpass.bind(this)}
              style={{
                alignSelf: "flex-end",
                color: "#EFDF6E",
                marginRight: 5,
                fontSize:14,
                fontFamily:'GothamMedium',
              }}
            >
              Forgot Password?
            </Text>
          </View>

          {this.state.erroMessage.length > 0 && (
              <Text style={{color:'red',fontFamily:'GothamMedium',marginBottom:20,fontSize:12, justifyContent:'flex-start', alignSelf:"flex-start", marginLeft:20}}>
              {this.state.erroMessage}
              </Text>
            )} 
          {/* button */}
          <TouchableOpacity
          onPress={this.loginSubmit.bind(this)}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
              marginVertical: 10,
              borderRadius: 40,
              paddingVertical: 20,
              backgroundColor: "#EFDF6E",
              marginHorizontal: 30,
            }}
          >
            <Text style={{ fontSize: 16, fontFamily:'GothamBold' }}>LOGIN</Text>
          </TouchableOpacity>
          <Pressable  onPress={this.register.bind(this)}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              
              marginVertical: 10,
            }}
          >
            <Text style={{fontFamily:'GothamMedium', fontSize:14}}>
              Didn't have account!{" "}
              <Text style={{ color: "#EFDF6E",fontSize:14, fontFamily:'GothamMedium', }}>Register</Text>
            </Text>
          </View>
          </Pressable>
        </View>
        )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    justifyContent: "center",
    marginHorizontal: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    width: 300,
    marginVertical: 10,
  },
  input: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    fontFamily:'GothamLight',
    width: "95%",
  },
  icon: {
    position: "absolute",
    right: 10,
  },
});
