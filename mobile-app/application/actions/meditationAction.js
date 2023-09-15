import React from "react";
import api from "../config/api";
import { AsyncStore } from "../utils/AsyncStore";


export const putMeditationStatus = async (status) => {
  let resUserData,uid;
  console.log("here at least", status);


  await AsyncStore.getData(`@user`).then((adata) => {
    console.log("MMMMMM", adata);
    if (adata != null && adata != "") {
      uid = adata[0].user_id;

    }
  });

  const workoutPutResponse = await fetch(
    api.url+`putMeditation/${uid}`,
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       
      },  
      body: JSON.stringify({
        "meditation": status,
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


export const getMeditationData = async () => {
  let resUserData;
  const workoutResponse = await fetch(api.url + `getMeditationArticles`, {
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

export const getMeditationApp = async () => {
  let resUserData;
  const workoutResponse = await fetch(api.url + `getMeditationApps`, {
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

export const getMeditationVideo = async (d) => {
  let resUserData;
  const workoutResponse = await fetch(api.url + `getMeditationVideo/${d}`, {
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