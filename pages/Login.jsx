import { useState } from "react";
import { 
    View,    
    Text,
    StyleSheet
} from "react-native";
import { Button, Box } from "@react-native-material/core";
import CustomEmailInput from '../components/CustomEmailInput';
import CustomPasswordInput from "../components/CustomPasswordInput";

import { firebaseApp } from '../utils/firebase-config';
import { authLogin, userIsLoggedIn } from "../utils/auth";
import { getData, storeData } from "../utils/storage";

const Login = ( { themeColor, updateLoginState, navigation } = props ) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logIn = async () => {
        const result = await authLogin(firebaseApp, email, password);
        if(result.status === 200) {
            navigation.navigate('Home');
        }        
    }

    return(
        <View style={styles.container}>
            <Box  style={styles.overHeader} />
            <Text style={styles.title}>pomodoro</Text>
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
            <Button
                title="Enter"
                style={{...styles.button, backgroundColor: themeColor}}
                // onPress={async () => {
                //     const result = await authLogin(firebaseApp, email, password);
                //     if(result.status === 200) {
                //         navigation.navigate('Home');
                //     }        
                // }}                
                onPress={async () => {
                    const result = await authLogin(firebaseApp, email, password)
                    if(result.status === 200) {                        
                        updateLoginState(true);
                        navigation.navigate('Home');
                    }
                    
                }} 
            />
            <Button
                variant="text"
                title="Register"
                style={{...styles.button, borderColor: "#d7e0ff"}}
                color="#d7e0ff"
                tintColor="#d7e0ff"
                onPress={() => navigation.navigate('Register')}
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
        marginBottom: 50,
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

export default Login;