import {StyleSheet,Text} from 'react-native'
import {Link} from 'expo-router'
import ThemedView from '../components/ThemedView'
import ThemedLogo from '../components/ThemedLogo'
import { useColorScheme } from 'react-native'
import ThemedText from '../components/ThemedText'
import Spacer from '../components/spacer'
const Home = () => {
  const themeview= useColorScheme();
  const theme=themeview==='dark'?'light':'dark';
  return (
    <ThemedView style={styles.container}>
      <ThemedLogo />
      <ThemedText title style={styles.title}>This is the Title </ThemedText>
      <ThemedText >My Name is Nikshit Saini bla bla bla bla bla bla .......</ThemedText>

      <Spacer/>

      <Link style={[styles.links,{}]} href="/register">
        <ThemedText> Register Page</ThemedText>
      </Link>
      <Link style={styles.links} href="/login">
        <ThemedText>Login Page</ThemedText>
      </Link>

      <Link style={styles.links} href="/Profile">
        <ThemedText>Profile Page</ThemedText>
      </Link>
       
    </ThemedView>
    
  )
}

export default Home
const styles = StyleSheet.create({
  container: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{ 
    fontSize:20,
    fontWeight:'bold',
    marginBottom:10, 
  },
  links:{
    fontSize:15,
    fontWeight:'bold',
    color:'blue',
    borderBottomWidth:1,
    borderBottomColor:'blue',
    margin:5,
  }
})
