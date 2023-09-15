import React from 'react';
import api from '../config/api';
import { AsyncStore } from '../utils/AsyncStore';



export const login = async (email, pass) => {  
    let resUserData;    

var formdata = new FormData();
formdata.append("email", email);
formdata.append("pass", pass);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};


await fetch(api.url+"login", requestOptions)
  .then(response => response.json())
  .then((resData) => { 

    if (resData.status == 200) {
        resUserData = resData;
       console.log('success', resUserData);
      } else {
        resUserData = resData;
        console.log('fail', resUserData);

      }
    })
    .catch((error) => {
        console.error(error);
      });

    return resUserData;
  };

  
export const register = async (name, email, pass) => {  
console.log("NNNNNNNNN", name, email, pass);
    let resUserData;    

var formdata = new FormData();
formdata.append("name", name);
formdata.append("email", email);
formdata.append("password", pass);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};


await fetch(api.url+"register", requestOptions)
  .then(response => response.json())
  .then((resData) => { 

    if (resData.status == 200) {
        resUserData = resData;
       console.log('success', resUserData);
      } else {
        resUserData = resData;
        console.log('fail', resUserData);

      }
    })
    .catch((error) => {
        console.error(error);
      });

    return resUserData;
  };



  export const forget = async (email) => {  
    let resUserData;    

var formdata = new FormData();
formdata.append("email", email);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};


await fetch(api.url+"forgot", requestOptions)
  .then(response => response.json())
  .then((resData) => { 

    if (resData.status == 200) {
        resUserData = resData;
       console.log('success', resUserData);
      } else {
        resUserData = resData;
        console.log('fail', resUserData);

      }
    })
    .catch((error) => {
        console.error(error);
      });

    return resUserData;
  };


  export const updatePass = async (cpass,npass) => {  
    let resUserData, id;    

    await AsyncStore.getData(`@user`).then((adata) => {
      console.log("MMMMMM", adata);
      if (adata != null && adata != "") {
        id = adata[0].user_id;
  
      }
    });

var formdata = new FormData();
formdata.append("id", id);
formdata.append("cpass", cpass);
formdata.append("npass", npass);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};


await fetch(api.url+"updatePass", requestOptions)
  .then(response => response.json())
  .then((resData) => { 

    if (resData.status == 200) {
        resUserData = resData;
       console.log('success', resUserData);
      } else {
        resUserData = resData;
        console.log('fail', resUserData);

      }
    })
    .catch((error) => {
        console.error(error);
      });

    return resUserData;
  };

  