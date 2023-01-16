import { Text, Button, StyleSheet } from 'react-native'
import {     
    Divider,
    HStack,
    VStack,
    IconButton,
    Avatar    
} from "@react-native-material/core";

const NavBar = ({ themeColor, profileData } = props ) => {  

    const { username, photoURL } = profileData;      
   
    return(        
        <HStack style={styles.container} center>            
            <Text style={styles.title}>pomodoro</Text>            
            {
                photoURL
                ? <Avatar size={38} image={{ uri: photoURL }}  />
                : <Avatar size={38} label={username} color={themeColor} tintColor="#fff" />
            }                                          
        </HStack>          
    );

}

export default NavBar;

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 2,
        borderBottomColor: '#d7e0ff',
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 8,
        paddingBottom: 12,
        paddingHorizontal: 10
    },
    title: {
        color: '#d7e0ff',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'                    
    }   
});