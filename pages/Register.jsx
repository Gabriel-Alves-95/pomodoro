import { useState } from "react";
import { 
    View,    
    Text,
    StyleSheet
} from "react-native";
import { Button, Box } from "@react-native-material/core";
import CustomUsernameInput from "../components/CustomUsernameInput";
import CustomEmailInput from '../components/CustomEmailInput';
import CustomPasswordInput from "../components/CustomPasswordInput";

import { TextInput } from "react-native";

import { firebaseApp } from '../utils/firebase-config'
import { authRegister } from '../utils/auth';

const Register = ( { themeColor, navigation } = props ) => {
      

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassWord] = useState('');

    const register = async () => {
        try {
            const result = await authRegister("appHere", email, password);
            return result;            
        }catch(err) {
            console.log(err.toSting());
        }        
    }

    return(
        <View style={styles.container}>
            <Box style={styles.overHeader} />
            <Text style={styles.title}>pomodoro</Text>
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
                password={password}          
                handleChange={setPassword}
            />
            <CustomPasswordInput
                themeColor={themeColor}
                label="Confirm Password"
                password={confirmPassword}          
                handleChange={setConfirmPassWord}
            />
            <Button
                title="Register"
                style={{...styles.button, backgroundColor: themeColor}}    
                onPress={async () => {
                    const result = await authRegister(firebaseApp, username, email, password);
                    if(result.status === 200) {
                        navigation.navigate('Home');
                    }                    
                }}            
            />
            <Text style={{color: '#d7e0ff'}}>Already have an account? </Text>            
            <Button
                variant="text"
                title="Log In"
                style={{...styles.button, borderColor: "#d7e0ff"}}
                color="#d7e0ff"
                tintColor="#d7e0ff"
                onPress={() => navigation.navigate('Login')}
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
        backgroundColor: '#1e2140'        
    },
    title: {
        color: "#d7e0ff",
        marginTop: 30,
        marginBottom: 40,
        fontSize: 30,
        fontWeight: 'bold'
    },
    button: {
        color: "#d7e0ff",
        width: 300,
        marginTop:20,
        marginBottom: 2.5
    }
});

export default Register;