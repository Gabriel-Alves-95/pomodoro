import {
    getAuth,    
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    updateEmail,
    updatePassword
} from "firebase/auth";
import { storeData, getData } from "./storage";

const authLogin = async (app, emailText, passwordText) => {
    const auth = getAuth(app);

    try {
        await signInWithEmailAndPassword(auth, emailText, passwordText);        

        const { displayName, email, photoURL, uid } = auth.currentUser;      
        
        await storeData("user", {
            displayName,
            email, 
            photoURL,
            uid,            
            passwordText
        });       

        return {
            status: 200,
            msg: "User successfully logged in!"
        }
    } catch(err){
        console.log(err.toString());
        const msg = err.toString().indexOf("auth/invalid-email") > -1 ? "Invalid data." : "An error has occured during login."
        
        return {
            status: 400,
            msg
        }
    }

}

const reautenticate = async (app) => {
    const user = await getData("user");
    if(user !== null) {
        await authLogin(app, user.email, user.password)
    }
}

const userIsLoggedIn = async () => {
    const result = await getData("user");
    return result;
}

const authRegister = async (app, username, emailText, passwordText) => {
    const auth = getAuth(app);

    try{
        await createUserWithEmailAndPassword(auth, emailText, passwordText);

        await updateProfile(auth.currentUser, {displayName: username});

        const { displayName, email, photoURL, uid } = auth.currentUser;

        await storeData("user", {
            displayName,
            email,
            photoURL,
            uid,
            passwordText
        });

        console.log(await getData("user"));

        return {
            status: 200,
            msg: 'User successfully created!'
        }

    } catch(err) {
        console.log(err.toString());
        const msg = err.toString().indexOf("auth/invalid-email") > -1 ? "Invalid data." : "An error has occurred during user resgistration";

        return {
            status: 400,
            msg
        }
    }

}

const authLogout = async () => {    
    await storeData("user", null)
}

const authUpdateProfile = async (app, profileData, email, password) => {
    const auth = getAuth(app);
    const user = auth.currentUser
    await updateProfile(user, profileData);
    await updateEmail(user, email);
    if(password) {
        await updatePassword(user, password);
    }   
    
    const { uid } = user;

    await storeData("user", {
        ...profileData,
        email,
        password,
        uid   
    });

    console.log(await getData("user"));    
}

export {
    authLogin,
    reautenticate,
    userIsLoggedIn,
    authRegister,
    authLogout,
    authUpdateProfile
}