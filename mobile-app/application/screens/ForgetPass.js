import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import { NavigationActions } from "react-navigation";
import { forget } from "../actions/authAction";

import useFonts from "../hooks/useFonts";

export default class ForgetPass extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor() {
    super();

    this.state = {
      email: "",
      loggedIn: false,
      isLoading: true,
      emailError: "",
      success: false,
    };
  }

  async componentDidMount() {
    await useFonts();
  }

  login() {
    const navigateAction = NavigationActions.navigate({
      routeName: "Login",
    });
    this.props.navigation.dispatch(navigateAction);
  }

  regex(text) {
    const strongRegex = new RegExp(
      "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
    );

    if (!strongRegex.test(text)) {
      this.setState({ emailError: "Invalid Email" });
    } else {
      this.setState({ email: text });
      this.setState({ emailError: "" });
    }
  }

  forgotPass = async () => {
    const { email } = this.state;
    const strongRegex = new RegExp(
      "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
    );

    if (email === "") {
      this.setState({ emailError: "Name cannot be empty" });
    } else if (!strongRegex.test(email)) {
      this.setState({ emailError: "Invalid Email" });
      this.setState({ passError: "" });
      this.setState({ nameError: "" });
    } else {
      let action = await forget(email);
      console.log("BBBBB", action);
      if (action.status === 200) {
        this.setState({
          emailError: "Email sent to your registered email address.",
        });
        this.setState({ success: true });
      } else if (action.status === 501) {
        this.setState({
          emailError: "Something went wrong, Please try again later!!",
        });
		this.setState({ success: false });
      } else {
        this.setState({ emailError: "User not found." });
		this.setState({ success: false });
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
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

          <View
            style={{
              marginHorizontal: 20,
              paddingHorizontal: 25,
              marginVertical: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 16, lineHeight: 25, fontFamily: "GothamBold" }}
            >
              Enter your email address to get your credentials.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter email address"
              onChangeText={(text) => this.regex(text)}
              style={{
                fontFamily: "GothamLight",
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: "#f7f7f7",
                borderRadius: 10,
                width: "95%",
              }}
            />
          </View>
          {this.state.emailError.length > 0 && (
            <Text
              style={{
                color: this.state.success ? "green" : "red",
                fontFamily: "GothamMedium",
                marginBottom: 10,
                fontSize: 12,
                alignSelf: "flex-start",
                marginLeft: 50,
              }}
            >
              {this.state.emailError}
            </Text>
          )}

          {/* button */}
          <TouchableOpacity
            disabled={this.state.email.length === 0 ? true : false}
            onPress={this.forgotPass.bind(this)}
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 10,
              marginVertical: 10,
              borderRadius: 40,
              paddingVertical: 15,
              backgroundColor:
                this.state.email.length > 0 ? "#EFDF6E" : "#808080",
              width: 120,
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: "GothamBold" }}>SEND</Text>
          </TouchableOpacity>
          <Pressable onPress={this.login.bind(this)}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Text style={{ fontFamily: "GothamMedium", color: "#EFDF6E" }}>
                Back to login
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    marginVertical: 15,
  },
});
