import { StyleSheet , Text, TouchableWithoutFeedback, Keyboard} from 'react-native'
import ThemedButton from '../../components/ThemedButton'
import React, { useState } from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/spacer'
import {Link} from 'expo-router'
import ThemedTextInput from '../../components/ThemedTextInput'
import { UseUser } from '../../hooks/UseUser'
import { Colors } from '../../constants/Colors'
const login = () => {

    const [email,setemail]  =useState('');
    const [password,setpassword]  =useState('');

    const {login}= UseUser();
    const[error,seterror]=useState(null);
    
    
    const handleSubmit=async ()=>{
        seterror(null);
        try {
            await login(email,password);
        } catch (error) {
            seterror(error.message);
        }
    }
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <ThemedView style={styles.container}>
            <Spacer/>
            <ThemedText title={true} style={styles.title}>
                Login to Your account
            </ThemedText>

            <ThemedTextInput 
                style={{width:'80%',marginBottom:20}}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={setemail}
                value={email}
            />

            <ThemedTextInput 
                style={{width:'80%',marginBottom:20}}
                placeholder="Password"
                onChangeText={setpassword}
                value={password}
                secureTextEntry={true}
            />


            <ThemedButton  onPress={handleSubmit}>
                <Text style={{color:'#f2f2f2'}}>Login here</Text>
            </ThemedButton>
            {error && <ThemedText style={styles.erorr}>{error}</ThemedText>}
            <Spacer/>

            
            <Link href="/register">
                <ThemedText style={{textAlign:'center'}} >Register Here</ThemedText>
            </Link>
        </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default login

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:20
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        marginBottom:20
    },
    erorr:{
        color:Colors.warning,
        marginTop:10,
        borderColor:Colors.warning,
        borderWidth:1,
        padding:10,
        borderRadius:5,
        textAlign:'center',
        width:'80%',
        backgroundColor:'#f5c1c8',
    },

})