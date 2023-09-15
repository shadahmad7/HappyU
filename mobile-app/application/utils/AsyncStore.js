

import AsyncStorage from '@react-native-async-storage/async-storage';



const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value); 
    } catch (error) {
      console.log(error);
    }
};


  
 const getData = async (key) => {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        let parseData;
        parseData = JSON.parse(data);
        return parseData;
      }
    } catch (error) {
      console.log(error);
    }
};
const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(error) {
        console.log(error);
    }
}

const getItem = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // We have data!!
            return value;
        }
    } catch (error) {
        // Error retrieving data
        throw error;
    }
};

const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        // Error saving data
    }
};

const multiSet = async (data) => {
    try {
        await AsyncStorage.multiSet(key, value);
    } catch (error) {
        // Error saving data
    }
}

// const setUser = async (user_data, username, password) => {

//     // Set global variable on login
//     let avatar_data = '';
//     let fullNameData = '';
//     let tokenData = '';
//     let fullAddress = '';
//     global.user_id = user_data._id;
//     global.user_first_name = user_data.firstName;
//     global.role = user_data.role;
//     global.email = user_data.email;
//     global.username = username;
//     global.isLogin = true;
//     if (user_data.avatar && !Helper.isNull(user_data.avatar)) {
//         avatar_data = Helper.getMediaUrl(user_data.avatar, 'user');
//     }

//     if (user_data.fullName !== undefined) {
//         fullNameData = user_data.fullName;
//     } else {
//         fullNameData = user_data.firstName + ' ' + user_data.lastName;
//     }

//     if (user_data.token !== undefined) {
//         tokenData = user_data.token;
//     } else {
//         tokenData = global.token;
//     }
//     if (!Helper.isUndefined(user_data.addressStreet)) {
//         fullAddress = user_data.addressStreet.trim() + ',';
//     }
//     if (!Helper.isUndefined(user_data.addressCity)) {
//         fullAddress = fullAddress.trim() + ' ' + user_data.addressCity.trim();
//     }
//     if (!Helper.isUndefined(user_data.addressState)) {
//         fullAddress = fullAddress.trim() + ', ' + user_data.addressState.trim();
//     }
//     if (!Helper.isUndefined(user_data.addressCountry)) {
//         fullAddress = fullAddress.trim() + ', ' + user_data.addressCountry.trim();
//     }
//     if (!Helper.isUndefined(user_data.addressZipCode)) {
//         fullAddress = fullAddress.trim() + ', ' + user_data.addressZipCode.trim();
//     }

//     global.fullName = fullNameData;
//     global.user_avatar = avatar_data;
//     global.token = tokenData;
//     global.fullAddress = fullAddress.trim();;

//     let data = [
//         ['username', username],
//         ['password', password],
//         ['user_id', user_data._id],
//         ['fullName', fullNameData],
//         ['firstName', user_data.firstName],
//         ['role', user_data.role],
//         ['user_avatar', avatar_data],
//         ['token', tokenData],
//         ['email', user_data.email],
//         ['isLogin', "true"],
//         ['fullAddress', fullAddress],
//     ];
//     try {
//         await AsyncStorage.multiSet(data, (error) => {
//             if (error) {
//                 console.log('data saving Error');
//                 console.log(error);
//             }
//         });
//     } catch (error) {
//         console.log(error);
//         // Error saving data
//     }

    // Setting External User Id with Callback Available in SDK Version 3.7.0+
    // OneSignal.setExternalUserId(user_data._id, (results) => {
    //     // The results will contain push and email success statuses
    //     console.log('Results of setting external user id');
    //     // Push can be expected in almost every situation with a success status, but
    //     // as a pre-caution its good to verify it exists
    //     if (results.push && results.push.success) {
    //         console.log('Results of setting external user id push status:');
    //     }
    //     // Verify the email is set or check that the results have an email success status
    //     if (results.email && results.email.success) {
    //         console.log('Results of setting external user id email status:');
    //     }
    // });
// };

const removeUser = async () => {
    let data = [
        'username',
        'password',
        'user_id',
        'fullName',
        'firstName',
        'role',
        'user_avatar',
        'token',
        'email'
    ];
    try {
        global.isLogin = false;
        global.user_id = "";
        global.user_first_name = "";
        global.fullName = "";
        global.role = "";
        global.token = "";
        global.username = "";
        global.user_avatar = "";
        global.email = "";
        await AsyncStorage.setItem('isLogin', "false");
        // Remove External User Id with Callback Available in SDK Version 3.7.0+
        // OneSignal.removeExternalUserId((results) => {
        //     // The results will contain push and email success statuses
        //     console.log('Results of removing external user id');
        //     // console.log(results);
        //     // Push can be expected in almost every situation with a success status, but
        //     // as a pre-caution its good to verify it exists
        //     if (results.push && results.push.success) {
        //         console.log('Results of removing external user id push status:');
        //         //console.log(results.push.success);
        //     }

        //     // Verify the email is set or check that the results have an email success status
        //     if (results.email && results.email.success) {
        //         console.log('Results of removoing external user id email status:');
        //         //console.log(results.email.success);
        //     }
        // });
        await AsyncStorage.multiRemove(data, (err) => {
            if (err) {
                console.log('data saving Error');
                console.log(err);
            }
        });
    } catch (error) {
        console.log(error);
        // Error saving data
    }
};

const reloadUser = async () => {
    global.username = await AsyncStorage.getItem('username');
    global.user_id = await AsyncStorage.getItem('user_id');
    global.firstName = await AsyncStorage.getItem('firstName');
    global.fullName = await AsyncStorage.getItem('fullName');
    global.role = await AsyncStorage.getItem('role');
    global.user_avatar = await AsyncStorage.getItem('user_avatar');
    global.token = await AsyncStorage.getItem('token');
    global.isLogin = await AsyncStorage.getItem('isLogin');
    global.email = await AsyncStorage.getItem('email');
    global.fullAddress = await AsyncStorage.getItem('fullAddress');
};

export const AsyncStore = {
    getItem,
    setItem,
    multiSet,
    // setUser,
    removeUser,
    reloadUser,
    storeData,
    getData, 
    removeData,
};
