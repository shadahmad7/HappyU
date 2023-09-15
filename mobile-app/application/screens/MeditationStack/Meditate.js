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
var style = require("../../../assets/files/Styles");
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import { AsyncStore } from "../../utils/AsyncStore";
import { withNavigationFocus } from "react-navigation";
import useFonts from '../../hooks/useFonts'

class Meditate extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
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
    title: "Meditation",
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
   


  check() {
    AsyncStore.getData(`@meditate`).then((adata) => {
      console.log("SSSSSS", adata);
      if (adata != null && adata != "") {
        console.log("HERE");
        this.props.navigation.navigate("YoutubeMeditate")
      } else {
        console.log("THERE");

        // this.setState({ mode: "j1" });
      }
    });
  }


  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.check();
    }
  }

  async componentDidMount(){
   await useFonts();
    AsyncStore.getData(`@meditate`).then(adata => 
      {
        console.log("SSSSSS", adata);
         if(adata!= null && adata!= ''){
           console.log("THERE")
this.props.navigation.navigate("YoutubeMeditate");
         } else {
          console.log("HERE")
         }
       }
   )
  }

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
        <Text style={{ color: "#000",fontFamily:"GothamMedium" }}>{item.label}</Text>
      </View>
    );
  };

  async submit(){
    const {duration,selectedDays} = this.state;
    console.log("new",selectedDays, duration );
    let data={};
    data = Object.assign({days:selectedDays, duration:duration});
     console.log("LKJGDDFG", data);
    AsyncStore.storeData(`@meditate`, JSON.stringify(data));
    AsyncStore.getData(`@meditate`).then(adata => 
       {
          console.log("NNNNNNNNNNN", adata);
        }
    )
    console.log("herwee")
   await  this.props.navigation.navigate("YoutubeMeditate", {days:selectedDays, duration: duration})

  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <ScrollView>
            {/* <View style={{justifyContent:'center',marginVertical:5, alignItems:'center'}}>
            <Text>Medidatiob</Text>
            </View> */}
  <LottieView
                autoPlay
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: "center",
                }}
                source={require("../../../assets/animated/meditation2.json")}
              /> 
            <View style={{ marginTop: 7, justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily:"GothamBold",
                  lineHeight: 30,
                  fontSize: 20,
                  marginHorizontal: 20,
                  color: "#fff",
                }}
              >
                Which days do you want to meditate?
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
                selectedStyle={{flexDirection:'row', width:'22%', zIndex:100}}
                selectedTextStyle={{fontSize:10,color:'#000'}}
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
              <Text style={{color:"#fff",  fontFamily:"GothamMedium"}}>Selected Days will appear here.</Text>
              )}
            </View>


            <View style={{ marginTop: 10, justifyContent: "center" }}>
              <Text
                style={{
                  fontFamily:"GothamBold",
                  lineHeight: 30,
                  fontSize: 20,
                  marginHorizontal: 20,
                  color: "#fff",
                }}
              >
                How much time do you want to meditate?
              </Text>
            </View>

            <View
              style={{
                height: 90,
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
                  fontFamily:"GothamMedium"
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
              disabled={this.state.duration == 0 || this.state.day == 0}
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
    height: "100%",
  },

  button: {
    borderWidth: 2,
    width: "40%",
    alignSelf: "center",
    justifyContent: "center",
    borderColor: "#000",
    borderRadius: 50,
    marginTop: 20,
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
export default withNavigationFocus(Meditate);
