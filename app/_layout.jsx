import { StyleSheet, useColorScheme } from 'react-native'
import {Stack} from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {Colors} from '../constants/Colors.js'
import { UserProvider } from '../contexts/UserContext.jsx'
import { BooksProvider } from '../contexts/BooksContext.jsx'

const rootLayout = () => {
  const colorscheme= useColorScheme();
  const theme=Colors[colorscheme] ?? Colors.light;
  return (
    <UserProvider>
      <BooksProvider>
        <StatusBar value="auto"/>
        <Stack screenOptions={{
          headerStyle:{backgroundColor:theme.navBackground},
          headerTintColor:theme.title,
          headerTitleStyle:{fontWeight:'bold',fontSize:20},
        }}>
          <Stack.Screen name="index" options={{ title:'Main Page' }} />
          <Stack.Screen name="(auth)" options={{headerShown:false}} />
          <Stack.Screen name="(dashboard)" options={{headerShown:false}} />
        </Stack>
      </BooksProvider>
    </UserProvider>
  )
}

export default rootLayout

const styles = StyleSheet.create({})