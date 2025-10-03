import {Keyboard,StyleSheet,Switch,Text,TouchableWithoutFeedback, useColorScheme} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import { UseBooks } from "../../../hooks/UseBooks"; // Assuming updateBook is correctly included here


import Spacer from "../../../components/spacer";
import ThemedText from "../../../components/ThemedText";
import ThemedView from "../../../components/ThemedView";
import ThemedTextInput from "../../../components/ThemedTextInput";
import ThemedButton from "../../../components/ThemedButton";

const edit = () => {
    
    //fetching data of book to be edited
    
    const [title, setTitle] = useState("");
    const[book,setBook]=useState(null);
    const [loading, setLoading] = useState(false);
    // Ensure updateBook is destructured here!
    const { fetchBooksById, updateBook } = UseBooks(); 
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setvisibility] = useState(false);
    const { id } = useLocalSearchParams();
    const theme = useColorScheme();

    useEffect(() => {
        async function loadbook() {
            const fetchedBook = await fetchBooksById(id);
            setBook(fetchedBook);
            setTitle(fetchedBook.title);
            setAuthor(fetchedBook.author);
            setDescription(fetchedBook.description);
            setvisibility(fetchedBook.visibility);
        }
        loadbook();
    }, [id]);


  const toggleSwitch = () => {
    setvisibility((previousState) => !previousState);
  };

  const router = useRouter();

    const handleSubmit = async () => {
        if (!title.trim() || !author.trim() || !description.trim()) {
            alert("Please fill all the fields");
            return;
        }

        try {
            setLoading(true);
            await updateBook(id, { 
            title, 
            author, 
            description,
            visibility
            });

            alert("Book updated successfully!");
            router.replace("/Books"); // navigate back
        } catch (error) {
            alert("Error updating book: " + error.message);
        } finally {
            setLoading(false);
        }
    };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedView style={styles.container}>
        <Spacer />
        <ThemedText title={true} style={styles.heading}>
          Edit Book 
        </ThemedText>
        <Spacer />

        <ThemedTextInput
          placeholder={book?.title} 
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <Spacer />
        <ThemedTextInput
          placeholder={book?.author} 
          value={author}
          onChangeText={setAuthor}
          style={styles.input}
        />

        <Spacer />
        <ThemedTextInput
          placeholder={book?.description} 
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        />

        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-start", // 👈 override parent centering
            marginLeft: 60, // spacing from left edge
            marginTop: 20,
          }}
        >
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={visibility ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={visibility}
          />
          <ThemedText style={{ marginRight: 10, marginLeft: 10 }}>
            {visibility ? "Public" : "Private"}
          </ThemedText>
        </ThemedView>

        <Spacer />
        <ThemedButton onPress={handleSubmit} disabled={loading}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {loading ? "Saving..." : "Save Changes"} {/* Changed button text */}
          </Text>
        </ThemedButton>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default edit;

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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "80%",
    borderRadius: 5,
  },
});