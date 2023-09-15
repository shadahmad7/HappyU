import React from "react";
import api from "../config/api";
import { AsyncStore } from "../utils/AsyncStore";


export const putEatingStatus = async (s1,s2,s3) => {
  let resUserData,uid;
  console.log("here at least", s1);


  await AsyncStore.getData(`@user`).then((adata) => {
    console.log("MMMMMM", adata);
    if (adata != null && adata != "") {
      uid = adata[0].user_id;

    }
  });

  const workoutPutResponse = await fetch(
    api.url+`putEating/${uid}`,
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       
      },  
      body: JSON.stringify({
        "breakfast":s1,
        "lunch":s2,
        "dinner":s3,
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


export const getEatingStatus = async () => {
    let resUserData,uid;
    console.log("here at least");
  
  
    await AsyncStore.getData(`@user`).then((adata) => {
      console.log("MMMMMM", adata);
      if (adata != null && adata != "") {
        uid = adata[0].user_id;
  
      }
    });
  
    console.log("LLLL", uid);
  
  
    const workoutResponse = await fetch(api.url + `getEating/${uid}`, {
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

export const getEatingData = async () => {
  let resUserData;
  const workoutResponse = await fetch(api.url + `getEatingArticles`, {
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