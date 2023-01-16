import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Box, Avatar, FAB } from "@react-native-material/core";
import NavBar from "../components/NavBar";
import CustomUsernameInput from "../components/CustomUsernameInput";
import CustomEmailInput from "../components/CustomEmailInput";
import CustomPasswordInput from "../components/CustomPasswordInput";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { firebaseApp } from "../utils/firebase-config";
import { getData, storeData } from "../utils/storage";
import { authUpdateProfile } from "../utils/auth";
import { pickImage } from "../utils/photo";

const Profile = ( { themeColor, navigation } = props ) => {

    const [photoURL, setPhotoURL] = useState(null);
    const [username, setUsername] = useState('');    
    const [email, setEmail] = useState('');    
    const [newPassword, setNewPassword] = useState('');

    const uploadPhoto = async () => {
        const image = await pickImage();
        setPhotoURL(image)        
    }

    const loadProfile = async () => {
        const user = await getData("user");
        setUsername(user.displayName);
        setEmail(user.email);    
        setNewPassword(user.password);
        setPhotoURL(user.photoURL);    
    }

    useEffect(() => {
        loadProfile();
    }, []);

    return(
        <View style={styles.container}>
            <Box style={styles.overHeader} />
            <NavBar
                themeColor={themeColor}
                profileData={{
                    username: username,
                    photoURL
                }}
            />
            <Box style={styles.avatarContainer}>
                {
                    photoURL 
                    ? <Avatar size={120} image={{ uri: photoURL }}  />
                    : <Avatar size={120} label={username} color={themeColor} tintColor="#fff" />
                }                 
                <TouchableOpacity
                    style={styles.changeImage}
                    onPress={ async () => {
                        const result = await uploadPhoto();
                        console.log(result);
                    }}
                >
                    <Icon name="circle-edit-outline" color={themeColor} size={20} />
                </TouchableOpacity>
            </Box>           
            <CustomUsernameInput
                themeColor={themeColor} 
                username={username}               
                handleChange={setUsername}
            />
            <CustomEmailInput
                themeColor={themeColor}
                email={email}
                handleChange={setEmail}                
            />    
            <CustomPasswordInput
                themeColor={themeColor}
                label="Password"      
                password={newPassword}          
                handleChange={setNewPassword}
            />                    
            <Button                
                title="Save"
                leading={props => <Icon name="content-save" {...props} />}
                style={{...styles.button, backgroundColor: themeColor}}  
                onPress={async () => {
                    const profileData = {
                        displayName: username,
                        photoURL                      
                    };
                    await authUpdateProfile(firebaseApp, profileData, email, newPassword);
                    storeData("user", )
                    await loadProfile();
                }}
            />      
            <Button
                variant="text"
                title="Home"
                leading={props => <Icon name="home" {...props} />}
                style={{...styles.button, borderColor: "#d7e0ff"}}                  
                onPress={() => navigation.navigate('Home')} 
                color="#d7e0ff"
                tintColor="#d7e0ff"             
            />            
        </View>
    );

}

const styles = StyleSheet.create({   
    overHeader: {
        height: 25,
        width: '100%',
        backgroundColor: '#d7e0ff'
    }, 
    container: {
        flex: 1,         
        alignItems: 'center',
        justifyContent: 'flex-start',      
        backgroundColor: '#1e2140',
        width: '100%'         
    }, 
    avatarContainer: {
        marginTop: 25,
        marginBottom: 35
    },
    avatar: {
        marginTop: 30,
        marginBottom: 40,
        color: '#fff'
    },
    changeImage: {
        backgroundColor: '#d7e0ff',
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    button: {
        color: "#d7e0ff",
        width: 300,
        marginTop:20,
        marginBottom: 2.5
    }
});

export default Profile;