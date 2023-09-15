import React, { Component } from "react";
import {
  View
} from "react-native";
import { AsyncStore } from "../utils/AsyncStore";



export default class Landing extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super();
    this.state = {
        logged:false,
    };
  }

  componentDidMount() {
    AsyncStore.getData(`@user`).then((adata) => {
      console.log("SSSSSS", adata);
      if (adata != null && adata != "") {
          this.props.navigation.navigate("App");
          this.setState({logged:true})
      } else {
          
          this.props.navigation.navigate("Login");
          this.setState({logged:false})
      }
    });
  }

  
  render() {
    return (
      <View>
     {this.state.logged ? (
         this.props.navigation.navigate("App")
     ): (
        this.props.navigation.navigate("Login")

     )}
      </View>
    );
  }
}


