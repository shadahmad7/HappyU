import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createAppContainer,createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Dimensions, Text, Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
var { height, width } = Dimensions.get("window");

//Auth
import Landing from "../screens/Landing";
import Login from "../screens/Login";
import Register from "../screens/Register";
import ForgetPass from '../screens/ForgetPass'
//Profile Tab
import ProfileScreen from "../screens/Profile";
import LogoutScreen from "../screens/Logout";
import Notification from "../screens/Notification";
import WeeklyReport from "../screens/WeeklyReport";
import ChangePassword from "../screens/ChangePassword";
import Terms from "../screens/Terms";
import Privacy from "../screens/Privacy";


// ToDo Tab
import Todo from "../screens/TodoStack/Todo";


//Journal
import Journal from "../screens/JournalStack/Journal";
import Journalising from "../screens/JournalStack/Journalising";


//FInance
import Finance from "../screens/FinanceStack/Finance";
import Financing from "../screens/FinanceStack/Financing";

//MainHome Tab
import MainHome from "../screens/MainHome";


// Exercises
import Workout from "../screens/ExercisesStack/Workout";
import GainWeight from "../screens/ExercisesStack/GainWeight";
import LoseWeight from "../screens/ExercisesStack/LoseWeight";
import MaintainWeight from "../screens/ExercisesStack/MaintainWeight";
import WorkoutVideos from "../screens/ExercisesStack/WorkoutVideos";


// Meditation
import Meditate from "../screens/MeditationStack/Meditate";
import YoutubeMeditate from "../screens/MeditationStack/YoutubeMeditate";

// EatingRight
import Eating from "../screens/EatingRightStack/Eating";

//Socializing
import Socialize from "../screens/SocializingStack/Socialize";

//Reading
import Read from "../screens/ReadingStack/Read";
import Reading from "../screens/ReadingStack/Reading";

//Movement
import Movement from "../screens/MovementStack/Movement";

//Water
import Water from "../screens/WaterStack/Water";

// Screen Break
import Screen from "../screens/ScreenStack/Screen";

// Kindness
import Kindness from "../screens/KindnessStack/Kindness";
import Profile from "../screens/Profile";
import Logout from "../screens/Logout";




export const SplashStack = createStackNavigator(
  {
    Landing: { screen: Landing },
   
    
  },
  {
    initialRoute: "Landing",
  }
  );


//AUTH   


export const AuthStack = createStackNavigator(
  {

    Login: {
			screen: Login
		},
    ForgetPass: {
			screen: ForgetPass
		},

		Register: {
			screen: Register
		},
    Terms: { screen: Terms },
    Privacy: { screen: Privacy },
  },
  {
    initialRoute: "Landing",
  }
);




export const WorkoutStack = createStackNavigator(
  {
    Workout: { screen: Workout },
    LoseWeight: { screen: LoseWeight },
    GainWeight: { screen: GainWeight },
    MaintainWeight: { screen: MaintainWeight },
    WorkoutVideos: { screen: WorkoutVideos},
  },
  {
    initialRoute: "Workout",
  }
);



export const MeditateStack = createStackNavigator(
  {
    Meditate: { screen: Meditate },
    YoutubeMeditate: { screen: YoutubeMeditate },
  },
  {
    initialRoute: "Meditate",
  }
);


export const EatingStack = createStackNavigator(
  {
    Eating: { screen: Eating },
   
  },
  {
    initialRoute: "Eating",
  }
);
export const SocializeStack = createStackNavigator(
  {
    Socialize: { screen: Socialize },
   
  },
  {
    initialRoute: "Socialize",
  }
);
export const ReadingStack = createStackNavigator(
  {
    Read: { screen: Read },
    Reading: { screen: Reading },
   
  },
  {
    initialRoute: "Read",
  }
);
export const MovementStack = createStackNavigator(
  {
    Movement: { screen: Movement },
   
  },
  {
    initialRoute: "Movement",
  }
);
export const WaterStack = createStackNavigator(
  {
    Water: { screen: Water },
   
  },
  {
    initialRoute: "Water",
  }
);
export const ScreenStack = createStackNavigator(
  {
    Screen: { screen: Screen },
   
  },
  {
    initialRoute: "Screen",
  }
);
export const KindnessStack = createStackNavigator(
  {
    Kindness: { screen: Kindness },
   
  },
  {
    initialRoute: "Kindness",
  }
);



export const TodoNavigator = createStackNavigator(
  {
    Todo: { screen: Todo },
  },
  {
    initialRoute: "Todo",
  }
);




export const ProfileStack = createStackNavigator(
  {
    Profile: { screen: Profile },
    Logout: { screen: Logout },
    Notification: { screen: Notification },
    WeeklyReport: { screen: WeeklyReport },
    ChangePassword: { screen: ChangePassword },
    Terms: { screen: Terms },
    Privacy: { screen: Privacy },
    
  },
  {
    initialRoute: "Profile",
  }
  );

  

    
  
  export const FinanceStack = createStackNavigator(
  {
  
    Finance: { screen: Finance },
    Financing: { screen: Financing },
  
  },
  {
  
  initialRoute: "",
  }
  );

  
  export const JournalStack = createStackNavigator(
  {
  
       Journal: { screen: Journal },
  Journalising: { screen: Journalising },
  
  },
  {
  
  initialRoute: "",
  }
  );

  

 
  
 
   
 
  

const HomeNavigator = createStackNavigator(
  {
    MainHome: { screen: MainHome, navigationOptions: { header: null,  } },
    WorkoutStack: { screen: WorkoutStack, navigationOptions: { header: null,  } },
    MeditateStack: { screen: MeditateStack, navigationOptions: { header: null,  } },
    EatingStack: { screen: EatingStack, navigationOptions: { header: null,  } },
    SocializeStack: { screen: SocializeStack, navigationOptions: { header: null,  } },
    ReadingStack: { screen: ReadingStack, navigationOptions: { header: null,  } },
    MovementStack: { screen: MovementStack, navigationOptions: { header: null,  } },
    WaterStack: { screen: WaterStack, navigationOptions: { header: null,  } },
    ScreenStack: { screen: ScreenStack, navigationOptions: { header: null,  } },
    KindnessStack: { screen: KindnessStack, navigationOptions: { header: null,  } },
    FinanceStack: { screen: FinanceStack, navigationOptions: { header: null,  } },
   
  },
  {
    initialRoute: "MainHome",
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5 name="home" size={22} style={{ color: tintColor }} />
        ),
      },
    },
    Journal: {
      screen: JournalStack,
       
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5 name="book" size={22} style={{ color: tintColor }} />
        ),
      },
    },

    Todo: {
      screen: TodoNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5 name="calendar-check" size={22} style={{ color: tintColor }} />
        ),
      },
    },
    
   
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome5 name="user" size={22} style={{ color: tintColor }} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      tabStyle: {
        borderRadius: 20,
      },
      activeTintColor: "#EFDF6E",
      // activeBackgroundColor:'#ffc500',
      style: {
        backgroundColor: '#000',//color you want to change
      },
      inactiveTintColor: "#D3D3D3",
    },
  }
);


export const SwitchNavigator = createSwitchNavigator({
  // Splash:SplashStack,
  Auth: AuthStack,
  App: TabNavigator,
}, {
  initialRouteName: 'Auth'
});


export default createAppContainer(SwitchNavigator);
