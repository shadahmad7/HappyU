import React from "react";
import api from "../config/api";
import { AsyncStore } from "../utils/AsyncStore";


export const putReadingStatus = async (status) => {
  let resUserData,uid;
  console.log("here at least", status);


  await AsyncStore.getData(`@user`).then((adata) => {
    console.log("MMMMMM", adata);
    if (adata != null && adata != "") {
      uid = adata[0].user_id;

    }
  });

  const workoutPutResponse = await fetch(
    api.url+`putReading/${uid}`,
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       
      },  
      body: JSON.stringify({
        "reading": status,
        "id":uid
      }),    
    }
  )
    .then((response) => response.json())
    .then((resData) => {
      if (resData.status == 200) {
        resUserData = resData;
        console.log("success", resUserData);
      } else {
        resUserData = resData;
        console.log("fail", resUserData);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return resUserData;
};


export const getReadingData = async () => {
  let resUserData;
  const workoutResponse = await fetch(api.url + `getReadingArticles`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((resData) => {
      if (resData.status == 200) {
        resUserData = resData;
        console.log("success", resUserData);
      } else {
        resUserData = resData;
        console.log("fail", resUserData);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return resUserData;
};


export const getReadingBook = async () => {
    let resUserData;
    const workoutResponse = await fetch(api.url + `getReadingBooks`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((resData) => {
        if (resData.status == 200) {
          resUserData = resData;
          console.log("success", resUserData);
        } else {
          resUserData = resData;
          console.log("fail", resUserData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  
    return resUserData;
  };