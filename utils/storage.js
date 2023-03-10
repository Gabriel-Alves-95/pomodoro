import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    getStorage,
    ref,
    uploadString,
    getDownloadURL,
} from "firebase/storage";

const saveImageBase64ToURL = async (app, prefix, imageB64) => {
    const fileName = `${prefix}_profile.jpeg`;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    try{
        await uploadString(storageRef, imageB64, "data_url");
        return fileName;
    } catch(err) {
        throw err;
    }

}

const getImageURL = async (app, image) => {
    const storage = getStorage(app);
    const imageURL = await getDownloadURL(ref(storage, image));;
    return imageURL;
}

const storeData = async (key, value) => {
    
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch(e) {
        // saving error
    }

}

const getData = async (key) => {

    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
    }

}

export {
    saveImageBase64ToURL,
    getImageURL,
    storeData,
    getData
}