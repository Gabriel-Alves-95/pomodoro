import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { HStack, IconButton } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const CustomPasswordInput = ({ themeColor, label, password, handleChange } = props) => {

    const [isOnFocus, setIsOnFocus] = useState(false);
    const [isPassHiden, setIsPassHiden] = useState(true);  

    return(
        <HStack
            style={{
                ...styles.inputContainer,
                borderColor: isOnFocus ? themeColor : "#d7e0ff"
            }}     
            center
            spacing={5}
        >            
            <HStack fill>                  
                <TextInput 
                    autoCapitalize="none"
                    placeholder={label}
                    placeholderTextColor={isOnFocus ? themeColor : "#d7e0ff"}
                    style={{
                        ...styles.textInput,
                        borderColor: isOnFocus ? themeColor : "#d7e0ff",
                        color: isOnFocus ? themeColor : "#d7e0ff"
                    }}            
                    onFocus={() => setIsOnFocus(true)}
                    onBlur={() => setIsOnFocus(false)}
                    onChangeText={(text) => handleChange(text)}   
                    value={password}   
                    cursorColor={themeColor} 
                    secureTextEntry={isPassHiden}               
                />                
            </HStack>
            <IconButton
                icon={props => <Icon name={isPassHiden ? "eye" : "eye-off"} style={{...styles.icon, color: isOnFocus ? themeColor : "#d7e0ff"}} size={25} {...props} />}
                color="#d7e0ff"
                onPress={() => setIsPassHiden(value => !value)}
            />
            
        </HStack>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        minWidth: 300,
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,   
        marginVertical: 7.5             
    },
    textInput: {                            
        padding: 5        
    }
});

export default CustomPasswordInput;  