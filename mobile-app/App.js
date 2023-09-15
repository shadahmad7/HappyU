import React from "react";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import useFonts from "./application/hooks/useFonts";
import { Root } from "native-base";
import { StatusBar, StyleSheet, LogBox,  Image } from "react-native";
import LoggedNavigation from "./application/navigations/Logged";
import { AsyncStore } from "./application/utils/AsyncStore";


LogBox.ignoreAllLogs();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogged: false,
      loaded: false,
      
    };
  }

 

  async componentDidMount() {
   
    LogBox.ignoreAllLogs();

    await useFonts();

    AsyncStore.getData(`@user`).then(adata => 
      {
        console.log("SSSSSS", adata);
         if(adata!= null && adata!= ''){
          this.setState({
            loaded:true,
            isLogged:true
          })
         } else {
         this.setState({
           loaded:true,
           isLogged:false
         })

         }
       }
   )
  }

  
  

  render() {
    const { isLogged, loaded} = this.state;

    if (isLogged && loaded) {
      return (
        <Root>
          <StatusBar barStyle="light-content" backgroundColor="#000" />
          <LoggedNavigation />
        </Root>
      );
    } else {
      return (
        <Root>
          <StatusBar hidden />
          <LoggedNavigation />
        </Root>
      );
    }
  }
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
