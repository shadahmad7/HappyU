import React, { Component } from "react";
import {
  View,
  Dimensions,
  Image,
  CheckBox,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import { NavigationActions } from "react-navigation";

import { Ionicons } from "@expo/vector-icons";
import useFonts from "../hooks/useFonts";
import { register } from "../actions/authAction";
import { AsyncStore } from "../utils/AsyncStore";


export default class Register extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      loggedIn: false,
      isLoading: true,
      nameError:'',
      emailError:'',
      passError:'',
      selected: false,
      erroMessage:'',
      selected:false,
    };
  }

  async componentDidMount() {
    await useFonts();
  }

  onValueChange() {
    this.setState({ selected: !this.state.selected });
  }

  login() {
    const navigateAction = NavigationActions.navigate({
      routeName: "Login",
    });
    this.props.navigation.dispatch(navigateAction);
  }




  registerSubmit = async () => {
    const {name , email, password} = this.state;
    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");

if(name === ''){
  this.setState({nameError:'Name cannot be empty'});
  this.setState({emailError: ''});
        this.setState({passError: ''});

}

    else if (!strongRegex.test(email)) {
this.setState({emailError:'Invalid Email'});
this.setState({passError: ''});
  this.setState({nameError: ''});
    } 
    else if (password.length < 6) {
      this.setState({passError:'Password should be more than 8 characters'});
      this.setState({emailError: ''});
  this.setState({nameError: ''});
    }
     else {
      console.log("GGTTT", name, email, password);
      let action = await register(name,email,password);
      console.log("BBBBB", action);
      if(action.data.success === "User already exists.") {
        this.setState({emailError: ''});
        this.setState({nameError: ''});
        this.setState({passError: ''});
        this.setState({erroMessage:'User already exists.'})

      } 
       else
        {
          this.setState({emailError: ''});
          this.setState({nameError: ''});
          this.setState({passError: ''});
          this.setState({erroMessage:''})
          AsyncStore.storeData(`@user`, JSON.stringify(action.data.res));

       this.props.navigation.navigate("App")

      }

    }

}

  

  terms() {
    const navigateAction = NavigationActions.navigate({
      routeName: "Terms",
    });
    this.props.navigation.dispatch(navigateAction);
  }
  privacy() {
    const navigateAction = NavigationActions.navigate({
      routeName: "Privacy",
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <View style={style.container}>
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
            <Text style={{ fontSize: 26,fontFamily:'GothamBold', }}>Sign Up Now</Text>
            <Text
              style={{
                fontSize: 12,
                marginVertical: 10,
                fontWeight: "200",
                color: "grey",
                fontFamily:'GothamMedium',
              }}
            >
              Please fill your details below to create.
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
                placeholder="Full Name"
                onChangeText={(name) => this.setState({ name })}
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
            {this.state.nameError.length > 0 && (
              <Text style={{color:'red',fontFamily:'GothamMedium',marginBottom:10,fontSize:12, justifyContent:'flex-start', marginLeft:30}}>
              {this.state.nameError}
              </Text>
            )} 
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
              <Text style={{color:'red',fontFamily:'GothamMedium',marginBottom:10, marginLeft:5, fontSize:12, justifyContent:'flex-start', marginLeft:30}}>
              {this.state.passError}
              </Text>
            )} 
          
          </View>

          <View style={style.checkboxContainer}>
                <CheckBox
                  value={this.state.selected}
                  onChange={() => this.onValueChange()}
                  tintColors={{ true: '#EFDF6E', false: 'black' }}
                  style={style.checkbox}
                />
                <Text style={style.labelMain}>
                  I agree to{" "}
                  <Text style={style.label} onPress={this.privacy.bind(this)}>
                    Privacy Policy
                  </Text>{" "}
                  and{" "}
                  <Text style={style.label} onPress={this.terms.bind(this)}>
                    Terms & Conditions
                  </Text>
                </Text>
              </View>



          {this.state.erroMessage.length > 0 && (
              <Text style={{color:'red',fontFamily:'GothamMedium',marginBottom:10,fontSize:12, justifyContent:'flex-start', marginLeft:30}}>
              {this.state.erroMessage}
              </Text>
            )} 
          {/* button */}
          <TouchableOpacity
          disabled={!this.state.selected}
           onPress={this.registerSubmit.bind(this)}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
              marginVertical: 10,
              borderRadius: 40,
              paddingVertical: 20,
              backgroundColor: this.state.selected
              ? "#EFDF6E"
              : "#808080",
              marginHorizontal: 30,
            }}
          >
            <Text style={{ fontSize: 16, fontFamily:'GothamBold', }}>CREATE</Text>
          </TouchableOpacity>
          <Pressable  
          onPress={this.login.bind(this)}
>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Text style={{fontFamily:'GothamMedium',}}>
              Already have account?{" "}
              <Text style={{ color: "#EFDF6E" }}>Login</Text>
            </Text>
          </View>
          </Pressable>
        </View>
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
    width: "95%",
    fontFamily:'GothamLight',
  },
  icon: {
    position: "absolute",
    right: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    paddingHorizontal:30,
    alignItems:'center',
    marginVertical:10,
    tintColor:'#fff'
   
  },
  checkbox: {
    alignSelf: "flex-start",
    // transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
  },
  label: {
    // marginTop: 9,
    fontSize: 12,
    color: "#EFDF6E",
  },
  labelMain: {
    fontFamily:'GothamMedium',
    fontSize: 12,
     color: "#000",
  },
});
