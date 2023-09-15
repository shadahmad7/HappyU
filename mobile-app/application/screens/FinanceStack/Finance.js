import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    SafeAreaView,
    Modal,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
  } from "react-native";
  import React, { Component } from "react";
  import DropDownPicker from "react-native-dropdown-picker";
  import { Dropdown, MultiSelect } from "react-native-element-dropdown";
  var style = require("../../../assets/files/Styles");
  import { Ionicons } from "@expo/vector-icons";
  import LottieView from "lottie-react-native";
  import { AsyncStore } from "../../utils/AsyncStore";
  import useFonts from '../../hooks/useFonts'
  
  import { withNavigationFocus } from "react-navigation";
  

  class Finance extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        modal: false,
        mode: "j1",
        day: "",
        pickerShow: false,
        pickerShow2: false,
        duration: "",
        selectedDays: [],
        time: [
          { label: "5 min", value: "5 min" },
          { label: "10 min", value: "10 min" },
          { label: "15 min", value: "15 min" },
          { label: "30 min", value: "30 min" },
        ],
        weekdays: [
          {
            label: "Monday",
            value: "Monday",
          },
          {
            label: "Tuesday",
            value: "Tuesday",
          },
          {
            label: "Wednesday",
            value: "Wednesday",
          },
          {
            label: "Thursday",
            value: "Thursday",
          },
          {
            label: "Friday",
            value: "Friday",
          },
          {
            label: "Saturday",
            value: "Saturday",
          },
          {
            label: "Sunday",
            value: "Sunday",
          },
        ],
      };
    }
    static navigationOptions = ({ navigation }) => ({
      title: "Finance",
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
  
    navigateToScreen = (route) => () => {
      const navigateAction = NavigationActions.navigate({
        routeName: route,
      });
      this.props.navigation.dispatch(navigateAction);
    };
  
    check() {
      AsyncStore.getData(`@finance`).then((adata) => {
        console.log("SSSSSS", adata);
        if (adata != null && adata != "") {
          console.log("HERE");
          this.setState({ mode: "j2" });
        } else {
          console.log("THERE");
  
          this.setState({ mode: "j1" });
        }
      });
    }
  
    async componentDidMount() {
      await useFonts();
      AsyncStore.getData(`@finance`).then((adata) => {
        console.log("SSSSSS", adata);
        if (adata != null && adata != "") {
          console.log("HERE");
          this.setState({ mode: "j2" });
        } else {
          console.log("THERE");
  
          this.setState({ mode: "j1" });
        }
      });
    }
  
    componentDidUpdate(prevProps) {
      if (prevProps.isFocused !== this.props.isFocused) {
        this.check();
      }
    }
  
    onChangeItem = (item) => {
      this.setState({ duration: item.value });
      this.setState({ pickerShow: false });
    };
  
    _renderItem = (item) => {
      return (
        <View style={styles.item}>
          <Text style={{ color: "#000",fontFamily:"GothamMedium"  }}>{item.label}</Text>
        </View>
      );
    };
  
    async submit() {
      this.setState({ modal: true });
    }
  
    async submitOkay() {
      this.setState({ modal: false });
  
      const { duration, selectedDays } = this.state;
      console.log("new", selectedDays, duration);
      let data = {};
      data = Object.assign({ days: selectedDays, duration: duration });
      console.log("LKJGDDFG", data);
      AsyncStore.storeData(`@finance`, JSON.stringify(data));
      AsyncStore.getData(`@finance`).then((adata) => {
        console.log("NNNNNNNNNNN", adata);
      });
      await this.props.navigation.navigate("Financing", {
        days: selectedDays,
      });
    }
  
    render() {
      return (
        <SafeAreaView style={styles.container}>
          {this.state.mode === "j1" ? (
            <View style={styles.container}>
              <ScrollView>
                <LottieView
                  autoPlay
                  style={{
                    width: 270,
                    height: 270,
                    alignSelf: "center",
                  }}
                  source={require("../../../assets/animated/money2.json")}
                />
  
                {/* <View style={{ marginTop: 7, justifyContent: "center" }}>
                  <Text
                    style={{
                      marginTop: 10,
                      fontWeight: "bold",
                      lineHeight: 30,
                      fontSize: 20,
                      marginHorizontal: 25,
                      color: "grey",
                    }}
                  >
                    How many times in a week do you want to journal?
                  </Text>
                </View>
  
                <View
                  style={{
                    marginHorizontal: 20,
                    marginTop: 10,
                    backgroundColor: "#fff",
                    borderColor: "#000",
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                  }}
                >
                  <TextInput
                    placeholder="Enter no. of days"
                    placeholderTextColor="grey"
                    keyboardType="numeric"
                    onChangeText={(text) => this.setState({ day: text })}
                    style={{ fontSize: 18, color: "#000" }}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      color: this.state.day.length > 0 ? "#EFDF6E" : "grey",
                    }}
                  >
                    Days
                  </Text>
                </View> */}
  
                <View style={{ marginTop: 27, justifyContent: "center" }}>
                  <Text
                    style={{
                    
                      lineHeight: 30,
                      fontSize: 18,
                      marginHorizontal: 20,
                      color: "#000",
                      fontFamily:'GothamBold',
                    }}
                  >
                    Which days do you want to practice financial discipline?
                  </Text>
                </View>
  
                <View
                  style={{
                    height: 50,
                    width: "90%",
                    marginTop: 16,
                    alignSelf: "center",
                  }}
                >
                  <MultiSelect
                    data={this.state.weekdays}
                    labelField="label"
                    valueField="value"
                    label="select days"
                    fontFamily="GothamLight"
                    placeholder="Select days"
                    activeColor="#EFDF6E"
                    itemFontFamily="GothamLight"
                    styleItemsContainer={{
                      fontFamily:"GothamLight"
                    }}
                    value={this.state.selectedDays}
                    itemTextColor="#000"
                    onChange={(item) => {
                      this.setState({ selectedDays: item }),
                        console.log("KKKK", this.state.selectedDays);
                    }}
                    renderItem={(item) => this._renderItem(item)}
                    selectedStyle={{
                      flexDirection: "row",
                      width: "22%",
                      zIndex: 100,
                     
                    }}
                    selectedTextStyle={{ fontSize: 10,  color: "#000" }}
                    style={{
                      backgroundColor: "#fff",
                     
  
                      padding: 10,
                      borderColor: "#000",
                      borderWidth: 1,
                      borderRadius: 7,
                    }}
                    containerStyle={{
                      paddingLeft: 2,
                      borderBottomLeftRadius: 10,
                    
  fontFamily:'GothamLight',
                      borderBottomRightRadius: 10,
                      itemTextColor: "black",
                      // backgroundColor: "#E3F7E3",
                      borderColor: "#000",
                    }}
                  
                  />
                </View>
                <View
                  style={{
                    marginVertical: 37,
                    justifyContent: "center",
                    marginHorizontal: 25,
                  }}
                >
                  {this.state.selectedDays.length === 0 && (
                    <Text style={{ color: "grey",fontFamily:"GothamLight" }}>
                      Selected Days will appear here.
                    </Text>
                  )}
                </View>
  
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.submit()}
                  disabled={this.state.selectedDays.length == 0}
                >
                  <Text style={styles.buttonText}>Submit </Text>
                </TouchableOpacity>
              </ScrollView>
  
              {this.state.modal && (
                <View>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modal}
                    onRequestClose={() => {
                      Alert.alert("Modal has been closed.");
                      this.setState({ modal: !this.state.modal });
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <View style={{ padding: 15, }}>
                          <Text
                            style={{
                              fontSize: 14,
                              textAlign: "center",
                              lineHeight:20 ,
                              fontFamily:"GothamBold"
                            }}
                          >
                            Great! It’s time to check your financial equation. Stay Wealthy!
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            borderRadius: 10,
                            backgroundColor: "#EFDF6E",
                          }}
                          onPress={() => this.submitOkay()}
                        >
                          <Text style={{fontFamily:"GothamBold"}}>OKAY</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                </View>
              )}
            </View>
          ) : (
            this.props.navigation.navigate(
              "Financing",
              this.setState({ mode: "j1" })
            )
          )}
        </SafeAreaView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
  
      backgroundColor: "#EFDF6E",
      // height: "150%",
    },
  
    button: {
      borderWidth: 0.3,
      width: "30%",
      alignSelf: "center",
      justifyContent: "center",
      borderColor: "#000",
      borderRadius: 30,
      marginTop: 20,
      marginBottom: 40,
      marginRight: 10,
      backgroundColor: "#000",
    },
    buttonText: {
      borderColor: "#EFDF6E",
      alignSelf: "center",
      fontFamily:"GothamBold",
      padding: 15,
      fontSize: 17,
      color: "#EFDF6E",
      
    },
  
    containerOption: {
      backgroundColor: "#A3DEA3",
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
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 15,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });
  
  export default withNavigationFocus(Finance);
  