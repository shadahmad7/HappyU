import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Button,
  Modal,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
var style = require("../../../assets/files/Styles");
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import NetInfo from "@react-native-community/netinfo";
import { AsyncStore } from "../../utils/AsyncStore";
import CheckBox from "expo-checkbox";
import useFonts from '../../hooks/useFonts'
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import {
  getJournalBook,
  getJournalData,
  getJournalStatus,
  putJournalStatus,
} from "../../actions/journalAction";
import { getFinanceBook, getFinanceData, getFinanceStatus, putFinanceStatus } from "../../actions/financeAction";

const B = (props) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);

export default class Financing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      checked1: false,
      modal:false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      checked6: false,
      update: "",
      disabled: false,
      trigDays: [],
      connection_status: null,
      loading: false,
      load:false,
      modifier: {},
      referBlogs: [
       
      ],
      referBooks: [
     
      ],
    };
  }

  // edit(){
  //   AsyncStore.removeData('@journal');
  //   navigation.popToTop();
  // }

  static navigationOptions = ({ navigation }) => ({
    title: "Financing",
    headerTitleStyle: {
      fontFamily: "GothamBold",
      color:'#EFDF6E'
    },
    headerStyle: {
      backgroundColor: '#000'
    },
    headerLeft: null,
    headerRight: () => (
      <Ionicons
        name={"create-outline"}
        onPress={() => {
          AsyncStore.removeData("@finance");
          navigation.navigate("Finance");
        }}
        style={[style.lightarrowbackiconRight, { color:'#EFDF6E',marginRight: 10 }]}
      />
    ),
  });

  async triggerNotificationHandler() {
    var h = Math.floor(Math.random() * 18 + 6);
    var m = Math.floor(Math.random() * 60 + 1);

    console.log("m", m);
    console.log("h", h);

    let arr = this.state.trigDays;
    console.log("MMMMMMMMM", arr);
    for (let i = 0; i < arr.length; i++) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Finance",
          body: "It’s time to check your financial equation! Here are some prompts you can action on today.",
        },
        trigger: {
          channelId: "finance",
          hour: h,
          minute: m,
          repeats: true,
        },
      });
    }
  }

  _handleNotificationResponse = (response) => {
    console.log(response);
    this.props.navigation.navigate("Financing");
  };

  async componentDidMount() {
    await useFonts();
    this.setState({load:true});
    let action = await getFinanceStatus();

    action = action.messages[0];
    console.log("WWWWWWWWWWW", action);
    if (action.finance_q1 == "1") {
      this.setState({ checked1: true });
    } else {
      this.setState({ checked1: false });
    }
    if (action.finance_q1 == "1") {
      this.setState({ checked2: true });
    } else {
      this.setState({ checked2: false });
    }
    if (action.finance_q3 == "1") {
      this.setState({ checked3: true });
    } else {
      this.setState({ checked3: false });
    }
    if (action.finance_q4 == "1") {
      this.setState({ checked4: true });
    } else {
      this.setState({ checked4: false });
    }
    if (action.finance_q5 == "1") {
      this.setState({ checked5: true });
    } else {
      this.setState({ checked5: false });
    }
    if (action.finance_q6 == "1") {
      this.setState({ checked6: true });
    } else {
      this.setState({ checked6: false });
    }
if(this.state.checked1 && this.state.checked2 && this.state.checked3 && this.state.checked4 && this.state.checked5 && this.state.checked6 ){
  this.setState({checked:true});
}
    // console.log("2wwwwwww", this.state.checked);

    let action2 = await getFinanceData();
    await this.setState({ referBlogs: action2.data });
    console.log("2wwwwwww", this.state.referBlogs);

    let action3 = await getFinanceBook();
    await this.setState({ referBooks: action3.data });
    console.log("rtrgdrtdg", this.state.referBooks);

    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((status) => {
        if (status !== "granted") {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
      })
      .then((status) => {
        if (status !== "granted") {
          return;
        }
      });

    Notifications.setNotificationChannelAsync("finance", {
      name: "finance",
      description: "Remind user!",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
    });

    this.NetInfoSubscribtion = NetInfo.addEventListener((state) => {
      this.setState({ connection_status: state.isConnected });
    });
    console.log("HGGGG", this.state.connection_status);

    this.setState({ loading: true });
    await AsyncStore.getData(`@finance`).then((adata) => {
      console.log("OOOOOOOOOOO", adata);
      this.setState({ modifier: adata });
    });
    console.log("OOOOOOOpppp", this.state.modifier);

    let arr = [];
    arr = this.state.modifier.days;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "Sunday") {
        this.state.trigDays.push(1);
      }
      if (arr[i] === "Monday") {
        this.state.trigDays.push(2);
      }
      if (arr[i] === "Tuesday") {
        this.state.trigDays.push(3);
      }
      if (arr[i] === "Wednesday") {
        this.state.trigDays.push(4);
      }
      if (arr[i] === "Thursday") {
        this.state.trigDays.push(5);
      }
      if (arr[i] === "Friday") {
        this.state.trigDays.push(6);
      }
      if (arr[i] === "Saturday") {
        this.state.trigDays.push(7);
      }
    }

    console.log("MKJHG", this.state.trigDays);

    this.triggerNotificationHandler();

    Notifications.addNotificationResponseReceivedListener(
      this._handleNotificationResponse
    );

    this.setState({load:false});

  }

  async checkToggle() {
    this.setState({ disabled: true });
    this.setState({ update: "Data updated successfully!" });

    if (this.state.checked === false) {
      this.setState({ checked: true });
      this.setState({ checked1: true });
      this.setState({ checked2: true });
      this.setState({ checked3: true });
      this.setState({ checked4: true });
      this.setState({ checked5: true });
      this.setState({ checked6: true });
      let action = await putFinanceStatus(true, true, true, true, true,true);

      console.log("Newwwwwww", action);
    } else {
      this.setState({ checked: false });
      this.setState({ checked1: false });
      this.setState({ checked2: false });
      this.setState({ checked3: false });
      this.setState({ checked4: false });
      this.setState({ checked5: false });
      this.setState({ checked6: false });
      let action = await putFinanceStatus(false, false, false, false, false, false);
      this.setState({ update: "" });
      this.setState({ disabled: false });
    }
  }

  async save() {
    const { checked1, checked2, checked3, checked4, checked5, checked6 } = this.state;
    console.log("KKKKJJJJ", checked1, checked2, checked3, checked4, checked5, checked6);
    this.setState({modal:true});
    let action = await putFinanceStatus(
      checked1,
      checked2,
      checked3,
      checked4,
      checked5,
      checked6
    );

    console.log("Newwwwwww", action);
  }

  render() {
    return (
      <View style={{ flex: 1,color:"#f7f7f7", height: "100%" }}>
         {this.state.load ? ( 
        <View style={{justifyContent:'center',flex :1, alignContent:'center', alignItems:'center'}}>
          <ActivityIndicator size="large" color="#EFDF6E" />
        </View>
        ):(
          <View>
        {this.state.connection_status ? (
          <View style={{ backgroundColor: "#EFDF6E", paddingBottom: 20 }}>
            <ScrollView>
              <View style={{ backgroundColor: "#EFDF6E" }}>
                <LottieView
                  autoPlay
                  style={{
                    width: 300,
                    height: 300,
                    alignSelf: "center",
                  }}
                  source={require("../../../assets/animated/money.json")}
                />
              </View>

              <View
                style={{
                  paddingHorizontal: 35,
                  // marginVertical:5,
                  backgroundColor: "#fff",
                  marginHorizontal: 10,
                  paddingTop: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                }}
              >
                <Text style={{ fontSize: 16,fontFamily:"GothamBold"  }}>
                  MARK ALL
                </Text>
                <CheckBox
                  disabled={false}
                  value={this.state.checked}
                  color="#EFDF6E"
                  onValueChange={() => this.checkToggle()}
                  tintColors={{ true: "#F15927", false: "black" }}
                />
              </View>

              <View
                style={{
                  backgroundColor: "#fff",
                  paddingBottom: 20,
                  marginHorizontal: 10,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}
              >
                <View style={styles.queContainer}>
                  <Text style={{fontFamily:"GothamMedium"}}>Did you save today?</Text>
                  <CheckBox
                    disabled={this.state.checked}
                    color="#EFDF6E"
                    value={this.state.checked1}
                    onValueChange={() =>
                      this.setState({ checked1: !this.state.checked1 })
                    }
                    tintColors={{ true: "#F15927", false: "black" }}
                  />
                </View>
                <View style={styles.queContainer}>
                  <Text style={{fontFamily:"GothamMedium"}}>Did you mindfully spend today?</Text>
                  <CheckBox
                    disabled={this.state.checked}
                    color="#EFDF6E"
                    value={this.state.checked2}
                    onValueChange={() =>
                      this.setState({ checked2: !this.state.checked2 })
                    }
                    tintColors={{ true: "#F15927", false: "black" }}
                  />
                </View>
                <View style={styles.queContainer}>
                  <Text style={{fontFamily:"GothamMedium", width:'90%', lineHeight:20}}>Did you pay your EMI’S this week?</Text>
                  <CheckBox
                    disabled={this.state.checked}
                    color="#EFDF6E"
                    value={this.state.checked3}
                    onValueChange={() =>
                      this.setState({ checked3: !this.state.checked3 })
                    }
                    tintColors={{ true: "#F15927", false: "black" }}
                  />
                </View>
                <View style={styles.queContainer}>
                  <Text style={{width:'90%',lineHeight:20,fontFamily:"GothamMedium"}}>Did you pay your Credit Card Bill/Utility payments this month?</Text>
                  <CheckBox
                    disabled={this.state.checked}
                    color="#EFDF6E"
                    value={this.state.checked4}
                    onValueChange={() =>
                      this.setState({ checked4: !this.state.checked4 })
                    }
                    tintColors={{ true: "#F15927", false: "black" }}
                  />
                </View>
                <View style={styles.queContainer}>
                  <Text style={{width:'90%',lineHeight:20,fontFamily:"GothamMedium"}}>Are you saving through a Systematic Investment Plan?</Text>
                  <CheckBox
                    disabled={this.state.checked}
                    color="#EFDF6E"
                    value={this.state.checked5}
                    onValueChange={() =>
                      this.setState({ checked5: !this.state.checked5 })
                    }
                    tintColors={{ true: "#F15927", false: "black" }}
                  />
                </View>
                <View style={styles.queContainer}>
                  <Text style={{width:'90%',lineHeight:20, fontFamily:"GothamMedium"}}>Have you taken insurance (Medical, Life, Home and Vehicle)?</Text>
                  <CheckBox
                    disabled={this.state.checked}
                    color="#EFDF6E"
                    value={this.state.checked6}
                    onValueChange={() =>
                      this.setState({ checked6: !this.state.checked6 })
                    }
                    tintColors={{ true: "#F15927", false: "black" }}
                  />
                </View>


                <View
                style={{
                  justifyContent: "center",
                  alignSelf: "flex-end",
                  padding: 10,
                  marginRight:10
                }}
              >
                <TouchableOpacity
               
                  style={styles.button2}
                  onPress={() => this.save()}
                >
                  <Text style={{ fontSize: 14, fontFamily:"GothamBold", color: "#000" }}>SAVE</Text>
                </TouchableOpacity>
              </View>


              </View>

              {this.state.update.length === 0 && (
                <View
                  style={{
                    paddingHorizontal: 10,
                    width: 200,
                    margin: 10,
                    alignSelf: "center",
                  }}
                >
                  <Text>{this.state.update}</Text>
                </View>
              )}

              <View style={{ paddingHorizontal: 15, marginVertical: 10 }}>
                <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                  <Text style={{ fontSize: 16, fontFamily:"GothamBold" }}>
                    Suggested Finance Books
                  </Text>
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {this.state.referBooks.map((book, index) => (
                    <Pressable
                      onPress={() => Linking.openURL(book.finance_book_url)}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: 10,
                        }}
                      >
                        <Image
                          source={{ uri: book.finance_book_image }}
                          style={{ height: 140, width: 100, borderRadius: 10 }}
                        />
                        <View style={{marginTop:5
                        }}>
                          <Text style={{ width: 100,fontFamily:"GothamMedium",lineHeight:15, fontSize:12 }}>
                            {book.finance_book_name}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              <View style={{ marginTop: 10, paddingVertical:10 }}>
                {this.state.referBlogs.map((blog, index) => (
                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 0,
backgroundColor:'#fff',
borderRadius:10,
                      //BOX -SHADOW
                      shadowColor: '#ccc',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0,
                      shadowRadius: 0,  
                      elevation: 1.5,

                      justifyContent: "space-around",
                      paddingHorizontal: 12,
                      marginVertical: 5,
                      paddingVertical: 10,
                      marginHorizontal: 22,
                      alignItems: "center",
                    }}
                    onTouchEnd={() => Linking.openURL(blog.finance_video_url)}
                  >
                     <View style={{ width: "30%",  }}>
                      <Image
                        source={{ uri: blog.finance_video_image }}
                        style={{ height: 100, borderRadius: 5, width: 120 }}
                      />
                    </View>
                    <View style={{ width: "60%",marginLeft: 30 }}>
                      <Text style={{ fontSize: 14,fontFamily:"GothamMedium" }}>
                        {blog.finance_video_name}
                      </Text>
                    </View>
                   
                  </View>
                ))}
              </View>
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
                <View
                    style={{
                      justifyContent: "flex-end",
                      alignSelf: "flex-end",
                    }}
                  >
                    <Ionicons
                      name="close"
                      size={18}
                      onPress={() =>
                        this.setState({ modal: !this.state.modal })
                      }
                    />
                  </View>
                  <View style={{  padding:15}}>
                  <LottieView
                autoPlay
                style={{
                  width: 100,
                  height: 100,
                  alignSelf: "center",
                }}
                source={require("../../../assets/animated/feedback.json")}
              />
                    <Text style={{ fontSize: 16, fontFamily:"GothamBold"}}>
                      Thanks for response!!
                    </Text>
                  </View>
               
                </View>
              </View>
            </Modal>
          </View>
        )}
          </View>
        ) : (
          <View
            style={{
              backgroundColor: "#EFDF6E",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{fontFamily:"GothamBold"}}>Please turn on internet</Text>
          </View>
        )}
       </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  queContainer: {
    paddingVertical: 10,
    alignItems: "center",
    flexDirection: "row",

    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: "#000",
    paddingHorizontal: 15,
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
  button2: {
    backgroundColor:  "#EFDF6E" ,
    height: "auto",
    
    padding: 15,
    alignItems: "center",
   

    borderRadius: 10,
    
  },
});
