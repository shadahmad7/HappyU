'use strict';

import {Dimensions} from "react-native";

var React = require('react-native');

var { StyleSheet } = React;

var {height, width} = Dimensions.get('window');

export const PrimaryColor = "#ffc500";

module.exports = StyleSheet.create({


  
//////////////////////// GENERAL

padding_general:{
padding: 20,
backgroundColor: '#FFF'
},

arrowbackicon:{
  color: '#000',
  fontSize: 27,
  marginLeft: 30
},

arrowbackiconRight:{
  color: '#000',
  fontSize: 27,
  marginRight: 30
},

lightarrowbackicon:{
  color: '#000',
  fontSize: 27,
  marginLeft: 30
},

lightarrowbackiconRight:{
  color: '#000',
  fontSize: 27,
  marginRight: 30
},

background_general:{
backgroundColor: '#000'
},

card_general:{
width: width,
},

inputLogin:{

backgroundColor: '#000',
width: width*0.80,
shadowRadius: 5,
marginBottom: 10,
borderColor: '#ffc500',
color: '#a4a4a4'

},

gradient_general:{
position: 'absolute',
padding:15,
left: 0,
right: 0,
bottom: 0,
height: '100%',
alignItems: 'center',
justifyContent: 'center'
},

title_general:{
color: '#FFF',
fontSize: 28,
fontWeight: 'bold' 
},

subtitle_general:{
color: PrimaryColor,
fontSize: 16,
fontWeight: '300' 
},

touchBookmark:{
backgroundColor: PrimaryColor,
width: 50,
height: 50,
position: 'absolute',
right: 15,
bottom: -25,
borderRadius: 50,
alignItems: 'center',
justifyContent: 'center'
},

touchBookmarkTran:{
backgroundColor: 'rgba(0,0,0,0.4)',
width: 50,
height: 50,
position: 'absolute',
right: 15,
top: 10,
borderRadius: 50,
alignItems: 'center',
justifyContent: 'center'
},


//////////////////////// CATEGORIES

title_categories:{
color: '#FFF',
fontSize: 16,
fontFamily: 'Oxygen_Bold',
},

title_categories_background:{
  width: width,
  alignItems: 'center',
  padding: 15,
 
},

title_categories_border:{
height: 2,
backgroundColor: PrimaryColor,
width: 50,

},

gradient_categories:{
position: 'absolute',
left: 0,
right: 0,
bottom: 0,
height: height /4.35,
alignItems: 'center',
justifyContent: 'flex-end'
},

background_categories:{
width: width,
height: height /4.35,
alignItems: 'center',
justifyContent: 'flex-end',
},

gradient_2columns:{
position: 'absolute',
left: 0,
right: 0,
bottom: 0,
height: height /4.35,
alignItems: 'center',
justifyContent: 'flex-end'
},

title_2columns_background:{
  width: width * 0.50,
  alignItems: 'center',
  padding: 15
},

background_2columns:{
width: width * 0.50,
height: height /4.35,
alignItems: 'center',
justifyContent: 'flex-end',
},

background_exercises:{
width: width * 0.50,
height: height /4.35,
alignItems: 'flex-start',
justifyContent: 'flex-end',
},

//////////////////////// POSTS


title_posts_categories:{
color: '#FFF',
fontSize: 13,
padding: 10,
fontWeight: 'bold',
paddingTop: 2
},

date_posts:{
color: 'rgba(255,255,255,0.50)',
fontSize: 11,
padding: 10,
paddingBottom: 0,
fontWeight: 'bold'
},

gradient_posts_2columns:{
position: 'absolute',
left: 0,
right: 0,
bottom: 0,
height: height * 0.15,
alignItems: 'flex-start',
justifyContent: 'flex-end'
},

background_posts_2columns:{
width: width * 0.46,
height: height * 0.15,
alignItems: 'flex-start',
justifyContent: 'flex-end',
},

postDetail_background:{
width: width,
height: height * 0.25,
alignItems: 'center',
justifyContent: 'center',
},

postDetail_gradient:{
position: 'absolute',
padding:15,
left: 0,
right: 0,
bottom: 0,
height: height * 0.10,
alignItems: 'flex-start',
justifyContent: 'flex-end'
},

postDetail_title:{
  fontSize: 20,
  fontFamily: 'Oxygen_Medium',
    color:'#ffc500',
  marginBottom: 5,
  lineHeight: 30,
},

postDetail_tag:{
  fontSize: 18,
  fontFamily: 'Oxygen_Medium',
    color: PrimaryColor,
  lineHeight: 30,
},

postDetail_date:{
  fontSize: 14,
  fontFamily: 'Oxygen_Medium',
  color: '#ffc500',
  marginLeft: 0,
  paddingLeft: 8
},

postCommentButton:{
  backgroundColor: PrimaryColor,
  elevation: 0,
  shadowOpacity: 0
},

postCommentText:{
  fontFamily: 'Oxygen_Regular',
  color: '#FFFFFF'
},

//////////////////////// DIETS

title_diets:{
color: '#FFF',
fontSize: 17,
marginBottom: 8,
fontFamily: 'Oxygen_Bold',
},

title_diets_categories:{
color: '#FFF',
fontSize: 14,
padding: 10,
fontFamily: 'Oxygen_Bold',
},

category_diets:{
color: PrimaryColor,
fontSize: 17,
fontWeight: 'bold',
paddingVertical: 8
},

subcategory_diets:{
color: '#FFF',
fontSize: 15,
opacity: 0.8,
marginBottom: 10,
},

gradient_diets:{
position: 'absolute',
padding:15,
left: 0,
right: 0,
bottom: 0,
height: height * 0.29,
alignItems: 'flex-start',
justifyContent: 'flex-end'
},

background_diets:{
width: width,
height: height * 0.29,
alignItems: 'flex-start',
justifyContent: 'flex-end',
padding: 15 
},

gradient_diets_2columns:{
position: 'absolute',
left: 0,
right: 0,
bottom: 0,
height: height * 0.15,
alignItems: 'flex-start',
justifyContent: 'flex-end'
},

background_diets_2columns:{
width: width * 0.46,
height: height * 0.15,
alignItems: 'flex-start',
justifyContent: 'flex-end',
},

background_diets_col:{
width: width,
height: height * 0.25,
alignItems: 'center',
justifyContent: 'center',
},

info_diets:{
  backgroundColor: 'rgba(0,0,0,0.70)',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 6,
  paddingBottom: 11,
  paddingTop: 11
},

title_diets_detail:{
  fontSize: 20,
  fontFamily: 'Oxygen_Regular',
  lineHeight: 30,
},

gtitle_diets_detail:{
  fontSize: 16,
  fontFamily: 'Oxygen_Bold',
},

description_diets_detail:{
  fontSize: 14,
},

col_diets: {
height: 70,
alignItems: 'center',
justifyContent: 'center'

},

titlecol_diets: {
  fontFamily: 'Oxygen_Bold',
  fontSize: 15,
marginTop: 5,
color: PrimaryColor

},

tabs_diets: {
backgroundColor: '#000',
},

activetabs_diets: {
backgroundColor: '#ffc500',
},

tabs_text_diets: {
color: '#fff',
fontWeight: 'normal'
},



activetabs_text_diets: {
color: '#000',
fontWeight: 'normal'
},

//////////////////////// CARDS

title_card:{
color: '#FFF',
fontSize: 16,
marginBottom: 3,
fontWeight: 'bold' 
},

category_card:{
color: PrimaryColor,
marginBottom: 3,
fontSize: 14
},

subcategory_card:{
color: '#FFF',
fontSize: 14,
opacity: 0.8
},

gradient_card:{
position: 'absolute',
padding:15,
left: 0,
right: 0,
bottom: 0,
height: height * 0.23,
alignItems: 'flex-start',
justifyContent: 'flex-end'
},

background_card:{
width: width,
height: height * 0.23,
alignItems: 'flex-start',
justifyContent: 'flex-end',
padding: 15 
},

//////////////////////// WORKOUT DETAILS

title_workout:{
color: '#FFF',
fontSize: 18,
marginBottom: 3,
fontFamily: 'Oxygen_Bold',
},

category_workout:{
color: PrimaryColor,
fontSize: 16,
fontFamily: 'Oxygen_Bold',

},

gradient_workout:{
position: 'absolute',
left: 0,
right: 0,
bottom: 0,
height: height * 0.25,
alignItems: 'center',
justifyContent: 'center'
},

background_workout:{
width: width,
height: height * 0.25,
alignItems: 'center',
justifyContent: 'center',
},

col_workout: {
height: 70,
alignItems: 'center',
justifyContent: 'center'

},

titlecol_workout: {
  fontFamily: 'Oxygen_Bold',
fontSize: 18,
color: PrimaryColor

},

icon_workout:{

fontSize: 22,
fontFamily: 'Oxygen_Bold',
color: '#ffc500',
position: 'absolute',
right: 25

},

textButton_workout:{
color: '#fff',
fontFamily: 'Oxygen_Regular',
},

button_workout:{
backgroundColor: 'transparent',
borderBottomWidth: 1,
justifyContent: "center",
alignItems: 'flex-start',
borderColor: '#ffc500',
borderWidth: 1,
height: 48,
borderRadius: 6,
marginHorizontal: 15,
paddingLeft: 15,
marginVertical: 5,
elevation: 0,
shadowOpacity: 0
 },

//////////////////////// EXERCISE

footer_exercise:{
backgroundColor: '#fff',
borderColor: '#fff',
marginTop: 10,
marginBottom: 5,
elevation: 0,
shadowOpacity: 0,
 },

start_exercise:{
backgroundColor: '#fff',
borderColor: PrimaryColor,
borderWidth: 1,
elevation: 0,
shadowOpacity: 0,
borderRadius: 5,
width: width * 0.9
 },

 textStart_exercise:{
color: PrimaryColor,
fontSize: 16,
fontFamily: 'Oxygen_Bold',
 },

 col_exercise:{
alignItems: 'center',
justifyContent: 'center'
 },

 titlecol_exercise: {
fontWeight: 'bold',
marginTop: 2,
marginBottom: 6,
fontSize: 16,

},

title_exercise_background:{
  width: width,
  alignItems: 'flex-start',
  padding: 15
},

subtitle_exercise:{
color: PrimaryColor,
},

icon_get:{

fontSize: 14,
fontWeight: 'bold',
color: PrimaryColor

},

icon_exercise:{
width: 40, height: 40,
marginTop: 10,
marginBottom: 7
},

icon_videoexercise:{
width: 50, height: 50,
marginTop: 10,
marginBottom: 7
},

playButton:{
  backgroundColor: PrimaryColor,
  elevation: 0,
  shadowOpacity: 0
},

playCol_exercise:{
alignItems: 'center',
justifyContent: 'center',
margin: 15
 },

//////////////////////// START

button_start:{
minWidth: 250,
backgroundColor: 'transparent',
borderWidth: 1,
borderColor: PrimaryColor,
marginBottom: 11,
height: 53
},

logo_start:{
width: 140,
height: 140,
marginTop: 15,
marginBottom: 30},



//////////////////////// LOGIN & SIGNUP

button_auth:{
minWidth: 200,
backgroundColor:  PrimaryColor,
marginBottom: 8,
height: 53,
shadowOpacity: 0,
shadowRadius: 0,
elevation: 0,
shadowOffset: {
  width: 0,
  height: 0
}
},

text_auth:{
backgroundColor: 'transparent',
// textAlign:'center',
minWidth: 200,
marginTop: 5,
fontFamily: 'Oxygen_Regular',
textAlign:'right',
marginBottom:10,
color: '#808080',
shadowOpacity: 0,
shadowRadius: 0,
elevation: 0,
marginRight: -40,
shadowOffset: {
  width: 0,
  height: 0
}
},

//////////////////////// HOME


listitem_home:{

borderBottomWidth: 0,
backgroundColor: 'transparent',
},

icon_home:{

	fontSize: 20,
	color: '#ddd'

},

note_home:{

  fontSize: 13,

},

//////////////////////// MENU

container_menu: {
    flex: 1,
    backgroundColor: '#FFF'
  },

item_menu:{

borderBottomWidth: 0,
borderBottomColor: '#f7f8f9',
marginLeft: 0,
paddingRight: 20,
paddingLeft: 20,
},

text_menu:{
  fontFamily: 'Oxygen_Regular',
fontSize: 16

},

thumbnail_menu:{
marginRight: 10,
maxWidth: 40
},

icon_menu:{

  fontSize: 14,
  color: '#ddd'

},

  footer_menu: {
    padding: 20,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center' 
  },


});
