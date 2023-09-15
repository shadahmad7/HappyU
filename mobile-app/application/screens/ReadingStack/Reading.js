import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  StyleSheet,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import NetInfo from "@react-native-community/netinfo";
import CheckBox from "expo-checkbox";
import useFonts from "../../hooks/useFonts";

const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import { getWorkoutStatus } from "../../actions/workoutAction";
import { getReadingBook, getReadingData, putReadingStatus } from "../../actions/readingAction";
import { Ionicons } from "@expo/vector-icons";
import { AsyncStore } from "../../utils/AsyncStore";
var style = require("../../../assets/files/Styles");

export default class Reading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
  
      connection_status: null,
      loading: false,
      load:false,
      modifier:"",
      trigDays:[],
      referBlogs: [
        {
          id: 0,
          name: "Benefits of Reading Books: How It Can Positively Affect Your Life",
          uri: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/09/reading-book-1296x728-header.jpg?w=1575",
          url: "https://www.healthline.com/health/benefits-of-reading-books",
        },
        {
          id: 1,
          name: "Top 10 Benefits of Reading for All Ages",
          uri: "https://d4804za1f1gw.cloudfront.net/wp-content/uploads/sites/74/2020/07/Untitled-design.png",
          url: "https://markhampubliclibrary.ca/blogs/post/top-10-benefits-of-reading-for-all-ages/",
        },
        {
          id: 2,
          name: "Importance of Reading",
          uri: "https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2019/09/23164120/Importance-of-Reading-800x500.png",
          url: "https://leverageedu.com/blog/importance-of-reading/",
        },
        {
          id: 3,
          name: "The Many Benefits of Reading",
          uri: "https://www.rmhp.org/-/media/RMHPdotOrg/Images/Body/Blog/Older/Article/woman-reading-book_desktop.ashx",
          url: "https://www.rmhp.org/blog/2017/september/the-many-benefits-of-reading",
        },
        {
          id: 4,
          name: "10 Benefits of Reading: Why You Should Read Every Day",
          uri: "https://media.wired.com/photos/5955c3573ff99d6b3a1d165c/master/pass/books.jpg",
          url: "https://www.lifehack.org/articles/lifestyle/10-benefits-reading-why-you-should-read-everyday.html",
        },
      ],

      // books
      referBooks: [
        {
          id: 0,
          name: "Beyond happiness by Jenn Lim",
          uri: "https://m.media-amazon.com/images/I/41dh4Fk-3-L.jpg",
          url: "https://www.amazon.com/Beyond-Happiness-Authentic-Leaders-Prioritize-ebook/dp/B08RYQ83MQ",
        },
        {
          id: 1,
          name: "Happiness Samurai by Manny Anchan",
          uri: "https://m.media-amazon.com/images/I/4131084fBlL._SY346_.jpg",
          url: "https://www.amazon.in/Happiness-Samurai-Manny-Anchan-ebook/dp/B08V8SJ6GB",
        },
        {
          id: 2,
          name: "Happy money by Ken Honda ",
          uri: "https://images-eu.ssl-images-amazon.com/images/I/41Dvre41nrL._SY264_BO1,204,203,200_QL40_FMwebp_.jpg",
          url: "https://www.amazon.in/Happy-Money-Japanese-Making-Peace/dp/1501188372",
        },
        {
          id: 3,
          name: "Ikigai by Francesc Miralles ",
          uri: "https://images3.penguinrandomhouse.com/cover/9780143130727",
          url: "https://www.penguinrandomhouse.com/books/549469/ikigai-by-hector-garcia-and-francesc-miralles/",
        },
        {
          id: 4,
          name: "Money in one lesson by Gavin Jackson",
          uri: "https://images-na.ssl-images-amazon.com/images/I/417n168IO+L._SY344_BO1,204,203,200_.jpg",
          url: "https://www.amazon.in/Money-One-Lesson-How-Works/dp/1529051843",
        },
        {
          id: 5,
          name: "Sapiens by Yuval Noah Harari ",
          uri: "https://images-eu.ssl-images-amazon.com/images/I/41rMSm0Lf9L._SY264_BO1,204,203,200_QL40_FMwebp_.jpg",
          url: "https://www.amazon.in/Sapiens-Humankind-Yuval-Noah-Harari/dp/0062316095",
        },
      ],
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Reading",
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
    headerRight: () => (
      <Ionicons
        name={"create-outline"}
        onPress={() => {
          AsyncStore.removeData('@read');

          navigation.popToTop();
        }}
        style={[style.lightarrowbackiconRight, {color:"#EFDF6E", marginRight: 10 }]}
      />
    ),
  });

  async triggerNotificationHandler (){
    var h = Math.floor((Math.random() * 18) + 6);
    var m = Math.floor((Math.random() * 60) + 1);

    console.log("m", m);
    console.log("h", h);

     Notifications.scheduleNotificationAsync({
     content: {
     title: 'Reading',
     body: '“It’s time to enhance your mind with a good reading session!”',
     },
     trigger: {
       channelId:'reading',
       hour: h,
       minute: m,
       repeats: true,
     },
     });
   }
  
 
   _handleNotificationResponse = response => {
     console.log(response);
     this.props.navigation.navigate("Reading")
   };




  async componentDidMount() {
await useFonts();
    this.setState({load:true});

    let action = await getWorkoutStatus();

    action = action.messages[0];
  console.log("WWWWWWWWWWW", action );
  if(action.habit_reading == "1"){
    this.setState({checked: true});

  } else {
    this.setState({checked: false});

  }
  console.log("2wwwwwww", this.state.checked);

  let action2 = await getReadingData();
  await this.setState({referBlogs:action2.messages})
  console.log("2wwwwwww", this.state.referBlogs);

  let action3 = await getReadingBook();
  await this.setState({referBooks:action3.messages})
  console.log("2wwwwwww", this.state.referBooks);


    Permissions.getAsync(Permissions.NOTIFICATIONS)
    .then((status) => {
    if (status !== 'granted') {
    return Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    })
    .then((status) => {
    if (status !== 'granted') {
    return;
    }
    })


    Notifications.setNotificationChannelAsync("reading", {
      name: "reading",
      description: "Remind user",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
    });

    this.NetInfoSubscribtion = NetInfo.addEventListener((state) => {
      this.setState({ connection_status: state.isConnected });
    });
    console.log("HGGGG", this.state.connection_status);


    this.setState({ loading: true });
    

    await AsyncStore.getData(`@read`).then(adata => 
      {
         console.log("OOOOOOOOOOO", adata);
         this.setState({modifier:adata})

       }
   )
   console.log("OOOOOOOpppp", this.state.modifier);



   let arr=[];
   arr= this.state.modifier.days;  
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


    this.triggerNotificationHandler()

    Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
    this.setState({load:false});
  }




  async check() {
    if (this.state.checked === false) {
      let action = await putReadingStatus(true);

      this.setState({ checked: true });
      console.log("Newwwwwww", action)
    } else {
      let action = await putReadingStatus(false);

      this.setState({ checked: false });
      console.log("Newwwwwww", action)

    }
  }

  render() {
    return (
      <View style={{ backgroundColor: "#f7f7f7",height:'100%', }}>
      {this.state.load ? ( 
   <View style={{justifyContent:'center',flex :1, alignContent:'center', alignItems:'center'}}>
     <ActivityIndicator size="large" color="#EFDF6E" />
   </View>
   ):(
     <View>
   {this.state.connection_status ? (
     <View style={{ backgroundColor: "#EFDF6E",height:'100%', }}>
            <ScrollView>
              <LottieView
                autoPlay
                style={{
                  width: 300,
                  height: 300,
                  alignSelf: "center",
                }}
                source={require("../../../assets/animated/reading.json")}
              />

              <View
                style={{
                  paddingHorizontal: 20,
                  backgroundColor:"#fff",
                  marginHorizontal:15,
                  borderRadius:10,
                  alignItems:'center',
                  flexDirection: "row",
                  marginTop:10,
                  justifyContent: "space-between",
                  paddingVertical: 20,
                }}
              >
                <Text style={{ fontSize: 18, fontFamily:"GothamBold" }}>
                Did you read today? 
                </Text>
                <CheckBox
                  disabled={false}
                  value={this.state.checked}
                  onValueChange={() => this.check()}
                  color="#EFDF6E"
                  tintColors={{ true: "#F15927", false: "black" }}
                />
              </View>

              <View style={{paddingHorizontal:15, marginTop:5, marginBottom:20}}>
                <View style={{marginVertical:20, paddingHorizontal:10}}>
                <Text style={{fontSize:16, fontFamily:"GothamBold", color:"#000" }}>
                Suggestive Readings</Text>
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {this.state.referBooks.map((book, index) => (
                    <Pressable 
                    onPress={() => Linking.openURL(book.reading_book_url)}>
                    <View style={{justifyContent:"center",alignItems:"center", marginLeft:10}}>
                      <Image source={{uri:book.reading_book_image}} style={{height:140, width:100, borderRadius:10}}/>
                      <View>
                        
                        <Text style={{width:100,marginTop:10,color:"#000", lineHeight:20,fontSize:12, fontFamily:"GothamMedium" }}>{book.reading_book_name}</Text>
                        
                      </View>
                    </View>
                    </Pressable>
                   
                  ))}
                </ScrollView>
              </View>

           


        
              <View>
                {this.state.referBlogs.map((blog, index) => (
                  <View
                    style={{
                      flexDirection: "row",
                      borderWidth: 0,
backgroundColor:"#fff",
borderRadius:10,

                      //BOX -SHADOW
                      shadowColor: '#ccc',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0,
                      shadowRadius: 0,  
                      elevation: 1.5,

                      justifyContent: "space-around",
                      paddingHorizontal: 8,
                      marginVertical: 5,
                      paddingVertical: 10,
                      marginHorizontal: 22,
                      alignItems: "center",
                    }}
                    onTouchEnd={() => Linking.openURL(blog.reading_article_url)}
                  >
                    <View style={{ width: "30%" }}>
                      <Image
                        source={{ uri: blog.reading_article_image }}
                        style={{ height: 100, borderRadius: 5, width: 120 }}
                      />
                    </View>
                    <View style={{  width: "60%", marginLeft:25 }}>
                      <Text style={{ fontSize: 14,fontFamily:"GothamMedium" , lineHeight:20  }}>
                        {blog.reading_article_name}
                      </Text>
                    </View>
                    
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Please turn on internet</Text>
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
});
