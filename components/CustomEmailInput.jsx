import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { HStack } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const CustomEmailInput = ( { themeColor, email, handleChange } = props ) => {

    const [isOnFocus, setIsOnFocus] = useState(false);

    return(
        <HStack
            style={{
                ...styles.inputContainer,
                borderColor: isOnFocus ? themeColor : "#d7e0ff"
            }}     
            center
            spacing={5}
        >
            <Icon
                name="email"
                style={{
                    ...styles.icon,
                    color: isOnFocus ? themeColor : "#d7e0ff"
                }}
                size={25}
            />
            <HStack fill>                  
                <TextInput 
                    inputMode="email"
                    keyboardType="email-addres" 
                    autoCapitalize="none"                   
                    placeholder="Email"
                    placeholderTextColor={isOnFocus ? themeColor : "#d7e0ff"}
                    style={{
                        ...styles.textInput,
                        borderColor: isOnFocus ? themeColor : "#d7e0ff",
                        color: isOnFocus ? themeColor : "#d7e0ff"
                    }}            
                    onFocus={() => setIsOnFocus(true)}
                    onBlur={() => setIsOnFocus(false)}
                    onChangeText={(text) => handleChange(text)}   
                    value={email}   
                    cursorColor={themeColor}                
                />                
            </HStack>
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

export default CustomEmailInput;