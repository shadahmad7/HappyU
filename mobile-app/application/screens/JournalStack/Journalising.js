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

const B = (props) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);

export default class Journalising extends Component {
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
      update: "",
      disabled: false,
      trigDays: [],
      connection_status: null,
      loading: false,
      load:false,
      modifier: {},
      referBlogs: [
        {
          id: 0,
          name: "Journaling for Mental Health",
          uri: "https://www.urmc.rochester.edu/encyclopedia/images/cache/279193.img",
          url: "https://www.urmc.rochester.edu/encyclopedia/content.aspx?ContentID=4552&ContentTypeID=1#:~:text=Journaling%20helps%20control%20your%20symptoms,and%20identifying%20negative%20thoughts%20and",
        },
        {
          id: 1,
          name: "How Journaling Can Help You in Hard Times",
          uri: "https://ggsc.s3.amazonaws.com/images/made/images/uploads/How_Journaling_Can_Help_You_in_Hard_Times_300_200_int_c1-1x.jpg",
          url: "https://greatergood.berkeley.edu/article/item/how_journaling_can_help_you_in_hard_times",
        },
        {
          id: 2,
          name: "5 Powerful Health Benefits of Journaling",
          uri: "https://intermountainhealthcare.org/-/media/images/modules/blog/posts/2018/07/journaling.jpg?la=en&h=597&w=896&mw=896&hash=D97D0C951F65902FF9546BB2EBE93E4589A327EE",
          url: "https://intermountainhealthcare.org/blogs/topics/live-well/2018/07/5-powerful-health-benefits-of-journaling/",
        },
        {
          id: 3,
          name: "6 Journaling Benefits and How to Start Right Now",
          uri: "https://ochsner-craft.s3.amazonaws.com/blog/articles/_930x524_crop_center-center_75_none/woman-with-late-period-missed-period.jpg",
          url: "https://www.healthline.com/health/benefits-of-journaling",
        },
        {
          id: 4,
          name: "What’s All This About Journaling?",
          uri: "https://www.betterup.com/hubfs/Google%20Drive%20Integration/Delivery%20URL%20-%20BetterUp%20-%20how%20to%20start%20journaling%20%5BARTICLE%5D-1.png",
          url: "https://www.nytimes.com/2018/10/25/style/journaling-benefits.html",
        },
      ],
      referBooks: [
        {
          id: 0,
          name: "Happiness memoir by Manoj Anchan ",
          uri: "https://m.media-amazon.com/images/I/4131084fBlL.jpg",
          url: "https://www.amazon.in/Happiness-Samurai-Manny-Anchan-ebook/dp/B08V8SJ6GB",
        },
        {
          id: 1,
          name: "The 5-minute Gratitude Journal by Sophia Godkin",
          uri: "https://images-eu.ssl-images-amazon.com/images/I/41Vca7sVxiL._SY264_BO1,204,203,200_QL40_FMwebp_.jpg",
          url: "https://www.amazon.in/5-Minute-Gratitude-Journal-Practice-Positivity/dp/1647397197",
        },
        {
          id: 2,
          name: "Soul therapy by Jacqueline Kademian",
          uri: "https://images-na.ssl-images-amazon.com/images/I/41fHg1De+IL._SX331_BO1,204,203,200_.jpg",
          url: "https://www.amazon.in/Soul-Therapy-Journal-Exploration-Reflection/dp/1987415132",
        },
        {
          id: 3,
          name: "Wreck this Journal by Keri Smith",
          uri: "https://images-eu.ssl-images-amazon.com/images/I/41G356dE-QL._SY264_BO1,204,203,200_QL40_FMwebp_.jpg",
          url: "https://www.amazon.in/Wreck-This-Journal-Keri-Smith/dp/039953346X",
        },
        {
          id: 4,
          name: "Present, not perfect by Aimee Chase",
          uri: "https://images-eu.ssl-images-amazon.com/images/I/51ZuJkfKziL._SY264_BO1,204,203,200_QL40_FMwebp_.jpg",
          url: "https://www.amazon.in/Present-Not-Perfect-Journal-Slowing/dp/1250147751",
        },
      ],
    };
  }

  // edit(){
  //   AsyncStore.removeData('@journal');
  //   navigation.popToTop();
  // }

  static navigationOptions = ({ navigation }) => ({
    title: "Journaling",
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
          AsyncStore.removeData("@journal");
          navigation.navigate("Journal");
        }}
        style={[style.lightarrowbackiconRight, {color:'#EFDF6E', marginRight: 10 }]}
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
          title: "Journal",
          body: "It’s time to journal! Here are some journaling prompts you can write on today!",
        },
        trigger: {
          channelId: "journal",
          hour: h,
          minute: m,
          repeats: true,
        },
      });
    }
  }

  _handleNotificationResponse = (response) => {
    console.log(response);
    this.props.navigation.navigate("Journalising");
  };

  async componentDidMount() {
    await useFonts();
    this.setState({load:true});
    let action = await getJournalStatus();

    action = action.messages[0];
    console.log("WWWWWWWWWWW", action);
    if (action.journal_q1 == "1") {
      this.setState({ checked1: true });
    } else {
      this.setState({ checked1: false });
    }
    if (action.journal_q1 == "1") {
      this.setState({ checked2: true });
    } else {
      this.setState({ checked2: false });
    }
    if (action.journal_q3 == "1") {
      this.setState({ checked3: true });
    } else {
      this.setState({ checked3: false });
    }
    if (action.journal_q4 == "1") {
      this.setState({ checked4: true });
    } else {
      this.setState({ checked4: false });
    }
    if (action.journal_q5 == "1") {
      this.setState({ checked5: true });
    } else {
      this.setState({ checked5: false });
    }
if(this.state.checked1 && this.state.checked2 && this.state.checked3 && this.state.checked4 && this.state.checked5 ){
  this.setState({checked:true});
}
    // console.log("2wwwwwww", this.state.checked);

    let action2 = await getJournalData();
    await this.setState({ referBlogs: action2.messages });
    console.log("2wwwwwww", this.state.referBlogs);

    let action3 = await getJournalBook();
    await this.setState({ referBooks: action3.messages });
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

    Notifications.setNotificationChannelAsync("journal", {
      name: "journal",
      description: "Remind user!",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
    });

    this.NetInfoSubscribtion = NetInfo.addEventListener((state) => {
      this.setState({ connection_status: state.isConnected });
    });
    console.log("HGGGG", this.state.connection_status);

    this.setState({ loading: true });
    await AsyncStore.getData(`@journal`).then((adata) => {
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
      let action = await putJournalStatus(true, true, true, true, true);

      console.log("Newwwwwww", action);
    } else {
      this.setState({ checked: false });
      this.setState({ checked1: false });
      this.setState({ checked2: false });
      this.setState({ checked3: false });
      this.setState({ checked4: false });
      this.setState({ checked5: false });
      let action = await putJournalStatus(false, false, false, false, false);
      this.setState({ update: "" });
      this.setState({ disabled: false });
    }
  }

  async save() {
    const { checked1, checked2, checked3, checked4, checked5 } = this.state;
    console.log("KKKKJJJJ", checked1, checked2, checked3, checked4, checked5);
    this.setState({modal:true});
    let action = await putJournalStatus(
      checked1,
      checked2,
      checked3,
      checked4,
      checked5
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
          <View style={{ backgroundColor: "#EFDF6E" }}>
            <ScrollView>
              <View style={{ backgroundColor: "#EFDF6E" }}>
                <LottieView
                  autoPlay
                  style={{
                    width: 300,
                    height: 300,
                    alignSelf: "center",
                  }}
                  source={require("../../../assets/animated/journal.json")}
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
                  DID YOU WRITE TODAY?
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
                  <Text style={{fontFamily:"GothamMedium"}}>What happened today?</Text>
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
                  <Text style={{fontFamily:"GothamMedium"}}>What am I grateful for today?</Text>
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
                  <Text style={{fontFamily:"GothamMedium", width:'90%', lineHeight:20}}>What is my most important task today?</Text>
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
                  <Text style={{fontFamily:"GothamMedium"}}>How did I sleep last night?</Text>
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
                  <Text style={{fontFamily:"GothamMedium"}}>How do I feel today?</Text>
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
                    Suggestive Journaling Books
                  </Text>
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {this.state.referBooks.map((book, index) => (
                    <Pressable
                      onPress={() => Linking.openURL(book.journal_book_url)}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: 10,
                        }}
                      >
                        <Image
                          source={{ uri: book.journal_book_image }}
                          style={{ height: 140, width: 100, borderRadius: 10 }}
                        />
                        <View style={{marginTop:5
                        }}>
                          <Text style={{ width: 100,fontFamily:"GothamMedium",lineHeight:15, fontSize:12 }}>
                            {book.journal_book_name}
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
                    onTouchEnd={() => Linking.openURL(blog.journal_article_url)}
                  >
                     <View style={{ width: "30%",  }}>
                      <Image
                        source={{ uri: blog.journal_article_image }}
                        style={{ height: 100, borderRadius: 5, width: 120 }}
                      />
                    </View>
                    <View style={{ width: "60%",marginLeft: 30 }}>
                      <Text style={{ fontSize: 14,fontFamily:"GothamMedium" }}>
                        {blog.journal_article_name}
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
