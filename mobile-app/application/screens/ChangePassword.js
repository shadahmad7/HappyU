import React, { Component } from "react";
import {
 
  View,
  Text,
  TextInput,
  TouchableOpacity,
 
  Dimensions,
  StyleSheet,
 
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import useFonts from "../hooks/useFonts";
import { updatePass } from "../actions/authAction";
const B = (props) => (
  <Text style={{ fontWeight: "bold", fontSize: 18, color: "#EFDF6E" }}>
    {props.children}
  </Text>
);


export default class ChangePassword extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Change Password`,
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
        currentPass:'',
        p1:true,
        p2:true,
        p3:true,
        newPass:'',
        confirmNewPass:'',
        errorMsg:"",
        success:false,
    };
  }

 async componentDidMount(){
    await useFonts();
   
  }

  async done(){
      const{currentPass, newPass, confirmNewPass} = this.state;
      if(currentPass === ""){
          this.setState({errorMsg:"Please enter current password"})
      }  else if(currentPass.length < 8){
        this.setState({errorMsg:"Current Password should be 8 characters."})

      }  else if(newPass === ""){
        this.setState({errorMsg:"Please enter new password"})

      } 
      else if(newPass.length < 8){
        this.setState({errorMsg:"Current Password should be 8 characters."})

      } 

      else if(newPass === currentPass){
        this.setState({errorMsg:"New password cannot be as old one."})

      }  



       else if(confirmNewPass === ""){
        this.setState({errorMsg:"Please confirm new password"})

      }  

     
     
      else if(confirmNewPass.length < 8){
        this.setState({errorMsg:"Current Password should be 8 characters."})

      }  
     
       else if(confirmNewPass !== newPass){
        this.setState({errorMsg:"Passwords don't match"})

      }  else {
        let action = await updatePass(currentPass, newPass);
        console.log("dfdsfsdf",action.data);
        if(action.status ===  201){
          this.setState({errorMsg:"Password updated successfully"});
          this.setState({success:true});

        } else {
          this.setState({errorMsg:"Please enter correct old password"})
          this.setState({success:false});

        }

      } 
    
  }
  
  


  render() {
    return (
      <View style={style.container}>
      <View>
      <View style={style.inputContainer}>
              <TextInput 
              style={style.input} 
              onChangeText={(currentPass) => this.setState({ currentPass })}
              placeholder=" Current Password" 
              secureTextEntry={this.state.p1}
              />
              <Ionicons
                style={style.icon}
                
                name={this.state.p1 ? "eye" : "eye-off"}
                color={this.state.p1 ? "grey":"#413D3E"}
                size={20}
                onPress={() => this.setState({p1: !this.state.p1})}
              />
            </View>
      <View style={style.inputContainer}>
              <TextInput 
              style={style.input} 
              onChangeText={(newPass) => this.setState({ newPass })}
              placeholder="New Password" 
              secureTextEntry={this.state.p2}
              />
              <Ionicons
                style={style.icon}
                
                name={this.state.p2 ? "eye" : "eye-off"}
                color={this.state.p2 ? "grey":"#413D3E"}
                size={20}
                onPress={() => this.setState({p2: !this.state.p2})}
              />
            </View>
      <View style={style.inputContainer}>
              <TextInput 
              style={style.input} 
              onChangeText={(confirmNewPass) => this.setState({ confirmNewPass })}
              placeholder="Confirm New Password" 
              secureTextEntry={this.state.p3}
              />
              <Ionicons
                style={style.icon}
                
                name={this.state.p3 ? "eye" : "eye-off"}
                color={this.state.p3 ? "grey":"#413D3E"}
                size={20}
                onPress={() => this.setState({p3: !this.state.p3})}
              />
            </View>
            <TouchableOpacity
          onPress={this.done.bind(this)}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
              marginVertical: 10,
              borderColor:'#EFDF6E',
              borderRadius: 40,
              paddingVertical: 20,
              backgroundColor: "#000",
              marginHorizontal: 50,
            }}
          >
            <Text style={{ fontSize: 16,color:"#EFDF6E", fontFamily:'GothamBold' }}>UPDATE</Text>
          </TouchableOpacity>

          {this.state.errorMsg.length > 0 && (
              <Text style={{color: this.state.success ? 'green':'red',fontFamily:'GothamMedium',marginBottom:20,fontSize:12, justifyContent:'flex-start', alignSelf:"flex-start", marginLeft:20}}>
              {this.state.errorMsg}
              </Text>
            )} 
      </View>
      </View>
    );
  }
}

const style = StyleSheet.create({

    container: {
        flex: 1,
        height: "100%",
        backgroundColor: "#EFDF6E",
        paddingVertical:20,
        // justifyContent: "center",
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
