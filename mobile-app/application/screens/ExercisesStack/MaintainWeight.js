import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { Component } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { AsyncStore } from "../../utils/AsyncStore";
import useFonts from "../../hooks/useFonts";
import { Ionicons } from "@expo/vector-icons";

export default class MaintainWeight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: "",
      day: "",
      pickerShow: false,
      pickerShow2: false,
      duration: "",
      selectedDays: [],
      time: [
        { label: "15 min", value: "15 min" },
        { label: "30 min", value: "30 min" },
        { label: "45 min", value: "45 min" },
        { label: "60 min", value: "60 min" },
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
async componentDidMount(){
  await useFonts();
}

static navigationOptions = ({ navigation }) => ({
  title: "Maintain Weight",
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

  onChangeItem = (item) => {
    this.setState({ duration: item.value });
    this.setState({ pickerShow: false });
  };

  _renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={{ color: "#000", fontFamily:"GothamMedium" }}>{item.label}</Text>
      </View>
    );
  };

  async submit(){
    const {duration,selectedDays, weight, day} = this.state;
    console.log("new", duration );
   let data={};
   data = Object.assign({days:selectedDays, duration:duration});
    console.log("LKJGDDFG", data);
    AsyncStore.storeData(`@workout`, JSON.stringify(data));
    AsyncStore.getData(`@workout`).then(adata => 
       {
          console.log("NNNNNNNNNNN", adata);
        }
    )
    console.log("herwee")
   await  this.props.navigation.navigate("WorkoutVideos", {days:selectedDays, duration: duration})

  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <ScrollView>
            <View style={{ marginTop: 7, justifyContent: "center" }}>
              <Text
                style={{
                  marginTop: 10,
                  fontFamily:"GothamBold",
                  lineHeight: 30,
                  fontSize: 20,
                  marginHorizontal: 20,
                  color: "#000",
                }}
              >
                What is your current weight?
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
                placeholder="Enter Weight"
                placeholderTextColor="grey"
                keyboardType="numeric"
                onChangeText={(text) => this.setState({ weight: text })}
                style={{ fontSize: 18,   fontFamily:"GothamMedium", color: "#000" }}
              />
              <Text
                style={{
                  fontSize: 10,
                  fontFamily:"GothamMedium",
                  color: this.state.weight.length > 0 ? "#000" : "grey",
                }}
              >
                Kgs
              </Text>
            </View>

            {/* <View style={{ marginTop: 7, justifyContent: "center" }}>
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: "bold",
                  lineHeight: 30,
                  fontSize: 22,
                  marginHorizontal: 20,
                  color: "#fff",
                }}
              >
                How many days do you want to workout in a week?
              </Text>
            </View> */}

            {/* <View
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
                  color: this.state.day.length > 0 ? "#000" : "grey",
                }}
              >
                Days
              </Text>
            </View> */}

            <View style={{ marginTop: 7, justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily:"GothamBold",
                  lineHeight: 30,
                  fontSize: 20,
                  marginHorizontal: 20,
                  color: "#000",
                }}
              >
                Which days do you want to workout?
              </Text>
            </View>

            {/* {this.state.selectedDays.length > 0 && (
              <View style={{flexDirection:'row',marginTop:10, marginHorizontal:20, padding:10, backgroundColor:"#f7f7f7"}}>
                 <Text>Selected Days are: </Text>
                {this.state.selectedDays.map((day, index) => (
                  <View>
                    <Text>{day}, </Text>
                  </View>
                ))}
              </View>
            )} */}

            <View
              style={{
                height: 50,
                width: "90%",
                marginTop: 10,
                alignSelf: "center",
              }}
            >
              <MultiSelect
                data={this.state.weekdays}
                labelField="label"
                valueField="value"
                fontFamily="GothamMedium"
                label="select days"
                placeholder="Select days"
                activeColor="#EFDF6E"
                value={this.state.selectedDays}
                onChange={(item) => {
                  this.setState({selectedDays:item}),
                  console.log("KKKK", this.state.selectedDays)
                }}
                renderItem={(item) => this._renderItem(item)}
                selectedStyle={{flexDirection:'row',   fontFamily:"GothamMedium", width:'22%', zIndex:100}}
                selectedTextStyle={{fontSize:10,   fontFamily:"GothamMedium",color:'#000'}}
                style={{
                  backgroundColor: "#fff",
                  padding: 10,
                  borderColor: "#000",
                  borderWidth: 1,
                  // marginBottom:30,
                  borderRadius: 10,
                  
                }}
                containerStyle={{ paddingLeft: 2 }}
              />
            </View>
            <View style={{marginVertical:37, justifyContent:'center', marginHorizontal:25}}>
              {this.state.selectedDays.length === 0 && ( 
              <Text style={{color:"#fff",    fontFamily:"GothamMedium",}}>Selected Days will appear here.</Text>
              )}
            </View>

            <View style={{ marginTop: 10, justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily:"GothamBold",
                  lineHeight: 30,
                  fontSize: 20,
                  marginHorizontal: 20,
                  color: "#000",
                }}
              >
                How much time do you want your workout to be?
              </Text>
            </View>

            <View
              style={{
                height: 70,
                // elevation: 1000,
                width: "90%",
                marginTop: 10,
                alignSelf: "center",
              }}
            >
              <DropDownPicker
                open={this.state.pickerShow}
                // autoScroll={true}
                onPress={() =>
                  this.setState({ pickerShow: !this.state.pickerShow })
                }
                textStyle={{
                  fontFamily:"GothamMedium",
                }}
                items={this.state.time}
                defaultNull
                value={this.state.duration}
                placeholder="Select an item"
                containerStyle={{ height: 50 }}
                onSelectItem={(item) => this.onChangeItem(item)}
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.submit()}
              disabled={this.state.duration == 0 || this.state.selectedDays.length == 0}
            >
              <Text style={styles.buttonText}>Submit </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "#EFDF6E",
    height: "150%",
  },

  button: {
    borderWidth: 2,
    width: "40%",
    alignSelf: "center",
    justifyContent: "center",
    borderColor: "#000",
    borderRadius: 50,
    marginTop: 40,
    marginBottom:40,
    marginRight: 10,
    backgroundColor: "#000",
  },
  buttonText: {
    borderColor: "#EFDF6E",
    alignSelf: "center",
    padding: 15,
    fontSize: 20,
    color: "#EFDF6E",
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
  //   button: {
  //     backgroundColor: "#fff",
  //     padding: 10,
  //     borderRadius: 5,
  //   },
  //   buttonText: {
  //     color: "#f39c12",
  //     textAlign: "center",
  //     fontSize: 16,
  //     textTransform: "uppercase",
  //     fontWeight: "bold",
  //   },
});
