import React, {Component} from 'react';
import{  View,ActivityIndicator, Text,ScrollView} from 'react-native';
import useFonts from '../hooks/useFonts';
import { Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Privacy extends Component {
   static navigationOptions = ({ navigation }) => ({
    title: "Privacy Policy",
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
            {/* <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10 }}>Terms of Service</Text> */}
            <Text style={{fontFamily:"GothamMedium",fontSize:16, lineHeight:18}}>Your privacy is important to our application and always has been. So we’ve developed a Privacy Policy that covers how we collect, use, disclose, transfer, and store your information. Please take a moment to familiarize yourself with our privacy practices. We collect information from you in order to provide corresponding service and better user experience.
</Text>
</View>
<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>

            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>Information Collection and Use</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>We store your profiles data on your device only, we don’t store them on our server. We may collect Non-Personal Information about users whenever they interact with our application. Non-Personal Information is in a form that does not, on its own, permit direct association with any specific individual, which may include the information about your devices, including the list of installed apps on your devices, the versions of phone model and other similar information. We may collect and store details of how you use our services, which may be used to improve the relevancy of results provided by our services.
</Text>
</View>
<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>


            <Text style={{fontSize:18,lineHeight:25, fontFamily:"GothamBold",marginVertical:10}}>PRIVACY POLICY OF THIRD PARTY SERVICE PROVIDERS USED BY THE APP</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>For a better experience, while using our Service, We may require you to provide us with certain personally identifiable information. The information that we request is retained on your device and is not collected by me in any way.
            The app does use third party services that may collect information used to identify you.
</Text>
</View>
<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>


            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>Google Play Services</Text>
            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>Ad Mob</Text>
            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>Firebase Analytics</Text>
            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>How your information may be disclosed?</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>We may use your information only for serving you better as below:

A. Personal Information. In general, we use Session and Usage Data internally to serve our Users and enable them to take maximum advantage of the Applications, the Services and the Site. We do not store Personal Information and therefore we do not disclose your Personal Information.
B. Non-Personal Information. We may disclose Non-Personal Information to our trusted partners who shall comply with this privacy policy and the relevant privacy laws. We do not combine Non-Personal Information with Personal Information (such as combining your name with your unique User Device number).

</Text>
</View>
<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>


            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>Third-Party Sites and Services</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>Our application and services may contain links to third-party websites, products, and services. Our products and services may also use or offer products or services from third parties. Data collected by third party parties, which may include such things as location data or contact details, is governed by their privacy practices. We encourage you to learn about the privacy practices of those third parties. We are not responsible for, the privacy practices of Websites operated by third parties, whether they are linked to or otherwise accessible from application. The inclusion of a link or accessibility of third party Websites does not imply endorsement of such third party Website by us.
</Text>
</View>
<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>


            <Text style={{fontSize:17, fontFamily:"GothamBold",marginVertical:10}}>THIRD- PARTY SITES</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>In general, the Applications, the Services and the Site access third party information (such as your Facebook account information) through application interfaces. We may provide links to third-party Web sites, such as Facebook, as a service to our Users. The Site may also carry advertisements from other companies. When you click on links of third parties in an Application, the Services or the Site, you may leave the Application, the Services or the Site. Some of these third party sites may be co-branded with our name/logo or our affiliated entity’s name/logo, even though they are not operated or maintained by us. This Policy does not address, and we are not responsible for, the privacy practices of Web sites operated by third parties, whether they are linked to or otherwise accessible from an Application, the Services or the Site. The inclusion of a link or accessibility of third party Websites does not imply endorsement of such third party Website by us

The data that you transfer and share through application may be intercepted, collected, used and disclosed by third parties. We are not responsible for any interception, collection, use and disclosure of your information by any third party.

</Text>
</View>
<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>


            <Text style={{fontSize:17, fontFamily:"GothamBold",marginVertical:10}}>Will This Privacy Policy Ever Change?</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>As our Apps evolves, we may need to update this Policy to keep pace with changes in the Service, our business and laws applicable to us and you; we will, however, always maintain our commitment to respect your privacy. We will post any revisions to this Policy, along with their effective date, in an easy to find area of our website, so we recommend that you periodically check back here to stay informed of any changes. As long as you continue to use the Service, you are bound by the terms of the Privacy Policy. If you disagree with any changes to this Policy and do not wish your information to be subject to a revised Policy, you will need to close your account and/or stop using the Service.

For material changes that impact the collection, use, disclosure or retention of personal information, or for other changes where obtaining your prior consent may be required by applicable law, we will provide notice by sending you an email at the address we have on file for you prior to any changes.

</Text>
</View>
<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>


            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>Advertising and promotion</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>What adverts you may see as a result of playing our application or using our Services. We promote our own applications and services in a number of ways. That might include cross promoting one of our applications while you are playing a different application of ours. It might also include advertising our applications within websites and other media published by others, or sending you marketing materials by email.
</Text>
</View>


<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>


            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>How secure is My Data?</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>We take the security of your data very seriously. We do not collect Personal Information, and we employ administrative, physical and electronic measures designed to protect your Non-Personal Information from unauthorized access and use. Please be aware that no security measures that we take to protect your data are absolutely guaranteed to avoid unauthorized access or use of your data.

When you use some our applications or services, the data and content you share is visible to other users and can be read, collected or used by them. You are responsible for the information you choose to share or submit in these instances.

</Text>
</View>

<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>


            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>Deletion Information</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>When information is no longer needed, we shall delete it using reasonable measures to protect the information from unauthorized access or use.

</Text>
</View>
<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>


            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>Sensitive Information</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>We ask that you not send us, and you not to disclose, any sensitive Personal Information (e.g., information related to racial or ethnic origin, political opinions, religion or other beliefs, health, sexual orientation, criminal background or membership in past organizations, including trade union memberships) on or through an Application, the Services or the Site or otherwise to us.

</Text>
</View>
<View style={{marginHorizontal:15, marginVertical:20, justifyContent:'center'}}>


            <Text style={{fontSize:20, fontFamily:"GothamBold",marginVertical:10}}>Contacting Us</Text>
            <Text style={{fontFamily:"GothamLight", lineHeight:18}}>If you have any questions or queries about this policy or out privacy practices, or to report any violations of this policy of our applications, please contact us at <Text style={{fontFamily:"GothamMedium"}}onPress={() => Linking.openURL('mailto:m.anchan@happinesssamurai.com')}>m.anchan@happinesssamurai.com</Text>

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