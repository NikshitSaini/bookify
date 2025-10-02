import { StyleSheet } from 'react-native'
import { UseUser } from '../../hooks/UseUser'

import Spacer from "../../components/spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedButton from '../../components/ThemedButton'
const Profile = () => {
    const { logout, user } = UseUser();

  return (
    <ThemedView safe={true} style={styles.container}>

      <ThemedText title={true} style={styles.heading}>
        {user ? user.email : "Loading user..."}
      </ThemedText>

      <Spacer />

      {user && <ThemedText>Time to start reading some books...</ThemedText>}
      <Spacer />

      <ThemedButton onPress={logout}>
        <ThemedText style={{color:'#f2f2f2'}}>Logout</ThemedText>
      </ThemedButton>
    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
})