import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({

    GothamBold: require('../../assets/fonts/GothamBold.ttf'),
    GothamLight: require('../../assets/fonts/GothamLight.ttf'),
    GothamMedium: require('../../assets/fonts/GothamMedium.ttf'),
   
  });