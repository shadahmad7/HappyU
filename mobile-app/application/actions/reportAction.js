import React from "react";
import api from "../config/api";
import { AsyncStore } from "../utils/AsyncStore";



export const getWeeklyReport = async () => {
    let resUserData,uid;
    await AsyncStore.getData(`@user`).then((adata) => {
      console.log("MMMMMM", adata);
      if (adata != null && adata != "") {
        uid = adata[0].user_id;
  
      }
    });  
    
    const workoutResponse = await fetch(api.url + `getWeeklyRecords/${uid}`, {
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


