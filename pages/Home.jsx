import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Easing } from 'react-native';
import { Box, Button, HStack } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import NavBar from '../components/NavBar';

import { Audio } from 'expo-av';

import { authLogout } from '../utils/auth';
import { getData } from '../utils/storage';


const Home = ({ defaultTime, themeColor, updateLoginState, navigation } = props) => {   
  
    const [sound, setSound] = useState();

    const [time, setTime] = useState(5)
    // const [timeInSeconds, setTimeInSeconds] = useState(defaultTime*60);
    const [timeInSeconds, setTimeInSeconds] = useState(time*60);
    useEffect(() => {
        setTimeInSeconds(time*60);
    }, [time]);    
    
    const [isPaused, setIsPaused] = useState(true);  

    const [username, setUsername] = useState('');
    const [photoURL, setPhotoURL] = useState(null);

    const getProfileData = async () => {
        const user = await getData("user");
        setUsername(user.displayName);
        setPhotoURL(user.photoURL);
    }

    const handleTimeCounting = () => {
        setIsPaused(current_value => !current_value);
    }
    
    const maskTime = (value) => {
        const time_format = new Date(value*1000);
        const hours = time_format.getUTCHours();
        const minutes = time_format.getUTCMinutes();
        const seconds = time_format.getSeconds();

        const timeString = hours > 0 
            ? hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
            : minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') ;

        return timeString;
    };

    const playSound = async () => {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/beep-sound/beep-sound.mp3') );
        setSound(sound);

        console.log("Playing Sound");
        await sound.playAsync();
    }

    useEffect(() => {
        getProfileData();
    }, []);

    useEffect(() => {
        let aux = 0;   

        if (timeInSeconds > 0 && !isPaused) {
            aux = setInterval(() => setTimeInSeconds(currentTime => currentTime - 1), 1000);
            setIsPaused(false);
        } else {      ;
            setIsPaused(true);
            setTimeInSeconds(defaultTime*60);      
            playSound();
            console.log("Hi!");
        }

        return () => { clearInterval(aux) };
    }, [isPaused]); 

    useEffect(() => {
        return sound 
            ? () => { 
                console.log("Unloading Sound");
                sound.unloadAsync();
            }
            : undefined
    }, [sound]);
    
    return(

        <View style={styles.container}> 
            <Box style={styles.overHeader} /> 
            <NavBar
                themeColor={themeColor}
                profileData={{
                    username,
                    photoURL
                }}
            />  
            <View>
                <AnimatedCircularProgress
                    size={250}
                    width={10}
                    fill={isPaused ? 0 : 100} 
                    easing={Easing.linear}                       
                    duration={isPaused ? 0 : time*60000}                
                    tintColor={themeColor}
                    onAnimationComplete={() => handleTimeCounting()}
                    backgroundColor="transparent"
                    rotation={0}
                    style={{marginTop: 15, marginBottom: 25}}        
                />
                <Text style={{color: 'white', position: 'absolute', top: 80, right: 25, fontSize: 80}}>
                    {maskTime(time*60 - timeInSeconds)}
                </Text>
            </View>          
            <Text style={{fontSize: 16, color: '#d7e0ff', fontWeight: 'bold', letterSpacing: 2, textTransform: 'uppercase'}}>Time (Minutes)</Text>
            <HStack style={{padding: 5, color: '#d7e0ff', borderWidth: 2, borderRadius: 8, borderColor: '#d7e0ff', maxWidth: 300 }}>                
                <TextInput 
                    keyboardType="numeric"
                    style={{backgroundColor: 'transparent', flex: 1, padding: 5, fontSize: 30, color: '#d7e0ff'}}
                    value={time}
                    textAlign="center"
                    cursorColor="#d7e0ff"                    
                    onChangeText={(text) => setTime(parseInt(text))}                    
                />   
                <Button
                    title={"Start"}
                    leading={props => <Icon name="play" {...props} />}
                    disabled={!isPaused}
                    style={{justifyContent: 'center', color: '#d7e0ff', backgroundColor: themeColor}}
                    onPress={handleTimeCounting}                
                />     
            </HStack>                                  
            <Button                
                title="Edit Profile"
                leading={props => <Icon name="account-edit" {...props} />}
                style={{...styles.button, backgroundColor: themeColor}}  
                onPress={() => navigation.navigate('Profile')}
            />      
            <Button
                variant="text"
                title="Log Out"
                leading={props => <Icon name="logout" {...props} />}
                style={{...styles.button, borderColor: "#d7e0ff"}}                  
                onPress={async () => {                    
                    await authLogout();                    
                    updateLoginState(false);
                    navigation.navigate('Login');
                }}
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
    button: {
        color: "#d7e0ff",
        width: 300,
        marginTop:20,
        marginBottom: 2.5
    }
});

export default Home;