import { StyleSheet, FlatList, Pressable, useColorScheme } from 'react-native'
import { UseBooks } from '../../hooks/UseBooks'
import { Colors } from '../../constants/Colors'

import Spacer from "../../components/spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedCard from '../../components/ThemedCard'
import { useRouter } from 'expo-router'

const Books = () => {
  const { books } = UseBooks();
  const theme = useColorScheme(); // "light" or "dark"
  const styles = createStyles(theme); // ✅ dynamic styles
  const router=useRouter();

  return (
    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Your Reading List
      </ThemedText>
      <Spacer />
      <FlatList 
        data={books}
        keyExtractor={(item) => item.$id.toString()}
        contentContainerStyle={[{ padding: 16 }, styles.list]}
        renderItem={({ item }) => (
          <Pressable onPress={()=> router.push(`/books/${item.$id}`)}>
            <ThemedCard style={styles.card}>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <ThemedText style={styles.author}>{item.author}</ThemedText>
            </ThemedCard>
          </Pressable>
        )}
      />
    </ThemedView>
  )
}

export default Books

// 🔹 Move style creation into a function that accepts theme
const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors[theme].background,
    paddingTop: 20,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 15,
    color: Colors[theme].title,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 8,
    padding: 16,
    borderRadius: 10,
    backgroundColor: Colors[theme].uiBackground,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: Colors[theme].text,
  },
  description: {
    fontSize: 14,
    color: Colors[theme].iconColor,
    lineHeight: 20,
  },
  author: {
    marginTop: 8,
    fontSize: 12,
    fontStyle: "italic",
    color: Colors[theme].iconColor,
    textAlign: "right",
  },
});
