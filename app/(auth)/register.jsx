import { Keyboard, StyleSheet,Text, TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/spacer'
import {Link} from 'expo-router'
import ThemedButton from '../../components/ThemedButton'
import ThemedTextInput from '../../components/ThemedTextInput'
import { useState } from 'react'
import { UseUser } from '../../hooks/UseUser'
import { Colors } from '../../constants/Colors'

const register = () => { 
    const [email,setemail]  =useState('');
    const [password,setpassword]  =useState('');
    const [confpassword,setconfpassword]  =useState('');
    const[error,seterror]=useState(null);

    const{register}= UseUser();

    const handleSubmit=async ()=>{
        seterror(null);
        try {
            await register(email,password);
        } catch (error) {
            seterror(error.message);
        }
    }
  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <ThemedView style={styles.container}>
            <Spacer/>
            <ThemedText title={true} style={styles.title}>
                Register For an account
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
            <ThemedTextInput 
                style={{width:'80%',marginBottom:20}}
                placeholder="Password"
                onChangeText={setconfpassword}
                value={confpassword}
                secureTextEntry={true}
            />
            <ThemedButton  onPress={handleSubmit}>
                <ThemedText style={{color:'#f2f2f2'}}>Register here</ThemedText>
            </ThemedButton>

            <Spacer/>
            {error && <ThemedText style={styles.erorr}>{error}</ThemedText>}
            

            <Spacer height={100}/>
            <Link href="/login">
                <ThemedText style={{textAlign:'center'}} >Login Here</ThemedText>
            </Link>
        </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default register

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