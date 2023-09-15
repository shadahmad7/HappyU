import React from "react";
import api from "../config/api";
import { AsyncStore } from "../utils/AsyncStore";


export const putFinanceStatus = async (s1,s2,s3,s4,s5, s6) => {
  let resUserData,uid;
  console.log("here at least", s1,s2,s3,s4,s5,s6);


  await AsyncStore.getData(`@user`).then((adata) => {
    console.log("MMMMMM", adata);
    if (adata != null && adata != "") {
      uid = adata[0].user_id;

    }
  });

  const workoutPutResponse = await fetch(
    api.url+`putFinance/${uid}`,
    {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       
      },  
      body: JSON.stringify({
        "q1":s1,
        "q2":s2,
         "q3":s3,
          "q4":s4,
           "q5":s5,
           "q6":s6,
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


export const getFinanceStatus = async () => {
  let resUserData, uid;
  await AsyncStore.getData(`@user`).then((adata) => {
    console.log("MMMMMM", adata);
    if (adata != null && adata != "") {
      uid = adata[0].user_id;

    }
  });

  const workoutResponse = await fetch(api.url + `getFinance/${uid}`, {
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


export const getFinanceData = async () => {
  let resUserData;
  const workoutResponse = await fetch(api.url + `getFinanceVideos`, {
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

export const getFinanceBook = async () => {
  let resUserData;
  const workoutResponse = await fetch(api.url + `getFinanceBooks`, {
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