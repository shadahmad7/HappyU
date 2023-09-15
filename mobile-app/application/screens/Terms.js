import React, {Component} from 'react';
import{  View,ActivityIndicator, Text,ScrollView} from 'react-native';
import useFonts from '../hooks/useFonts';
import { Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Terms extends Component {
   static navigationOptions = ({ navigation }) => ({
    title: "Terms & Conditions",
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


constructor(props) {

    super(props);

    this.state = {
      load: false
    }

  }

  async componentDidMount() {
    await useFonts();
    this.setState({load:true});
    setTimeout(() => {
      this.setState({load:false});

    },2000)
     }


  render () {


    return (

      <View style={{ backgroundColor: "#F1F2F7",height:'100%', }}>
      {this.state.load ? ( 
   <View style={{justifyContent:'center',flex :1, alignContent:'center', alignItems:'center'}}>
     <ActivityIndicator size="large" color="#EFDF6E" />
   </View>
   ):(
   
     <View style={{ backgroundColor: "#EFDF6E",height:'100%', }}>
            <ScrollView>
              <View>
          <View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>
            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10 }}>Terms of Service</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>Thank you for joining HappyU . (“We”, “Us”, “Company”). These Terms of Use, together with the Privacy Policy, and any other documents they expressly incorporate, set forth the terms and conditions upon which you may access and use the health coaching services, mobile application, and Service provided or operated by HappyU (“Service”) including any content and functionality offered through the Service. (“Terms of Use” or “Agreement”)
Please read these Terms of Use carefully before using the Application which developed by HQGPL  Group. These Terms apply to all users and others who use the App. By using the App you agree to be bound by these Terms. If you disagree the terms then you may not use the App. You agree that you will not use the Application Service for any illegal purposes, including but not limited to the pirating or illegal distribution of software. You agree that you will not attempt to access areas and information that you are not authorized to access.
</Text>
</View>
<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>

            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>Limited Liability</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>You accept that; HQGPL do not have any sort of liability what so ever for anything that may arise from the use of our apps.
</Text>
</View>
<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>


            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>Termination</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
</Text>
</View>
<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>


            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>Redirects to other Web Sites</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>Our Service may contain links to third-party web sites or services that are not owned or controlled by HQGPL. HQGPL has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that HGQPL shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services. We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
</Text>
</View>
<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>


            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>Law</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>These Terms shall be governed and construed in accordance with the laws of your country, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
</Text>
</View>
<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>


            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>Changes</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>We also reserve the right at any time to modify or discontinue the Service, temporarily or permanently, with or without notice to you. If you do not agree to the new terms, please stop using the Service.
</Text>
</View>
<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>


            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>Support</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>We always try to fix the Application issue but as some of the our apps depends on phone hardware So we might not be able to solve if the  issue is related to phone Hardware OR if you upgrade to a new Android Phone OR You Change your phone to different one, In this case you change your device your old phone application will be not be able to transfer old Phone Data/Settings to your new Phone automatically you can try with share feature of the app manually.
</Text>
</View>
<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>


            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>Contact Us</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>If you have any questions about these terms. Please contact us via Email: <Text style={{fontFamily:"GothamMedium"}}onPress={() => Linking.openURL('mailto:m.anchan@happinesssamurai.com')}>m.anchan@happinesssamurai.com</Text>
</Text>
</View>


</View>

            </ScrollView>
          </View>
        
         )}
      </View>
    )
  }

}