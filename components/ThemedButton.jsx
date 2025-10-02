import { StyleSheet,Pressable } from 'react-native'
import {Colors} from '../constants/Colors'


const ThemedButton = ({style, ...props}) => {
  return (
        <Pressable 
            style={({pressed})=>[styles.btn ,pressed && styles.pressed,style]}
            {...props}
        />
  )
}

export default ThemedButton

const styles = StyleSheet.create({
    btn :{
        backgroundColor:Colors.primary,
        padding:15,
        borderRadius:8,
        marginVertical:10
    },
    pressed:{
        opacity:0.8
    }
})