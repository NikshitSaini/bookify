import { StyleSheet, Text, useColorScheme} from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors.js'

const ThemedText = ({style,title=false, ...props}) => {
    const colorScheme = useColorScheme();
    const theme=Colors[colorScheme] ?? Colors.light;
    const textcolor=title?theme.title:theme.text;
    const textsize=title?20:15;
  return (
    <Text 
        style={[{color:textcolor,fontSize:textsize},style]} 
        {...props}
    />
  )
}

export default ThemedText

