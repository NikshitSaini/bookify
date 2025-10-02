import { StyleSheet, TextInput, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors';



const ThemedTextInput = ({style,...props}) => {
    const colorscheme= useColorScheme();
    const theme=Colors[colorscheme] || Colors.light;
  return (
    <TextInput 
    style={[style,{
        backgroundColor:theme.background,
        borderColor:theme.text,
        borderWidth:1,
        padding:10,
        marginVertical:10,
        borderRadius:6,
        color:theme.text
    }]}
    placeholderTextColor={theme.text + "99"}
     {...props}/>
  )
}

export default ThemedTextInput

const styles = StyleSheet.create({})