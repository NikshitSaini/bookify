import { Keyboard, StyleSheet, Switch, Text, TouchableWithoutFeedback ,View} from "react-native";
import Spacer from "../../components/spacer";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import ThemedTextInput from "../../components/ThemedTextInput"; // <-- import this
import { useState } from "react";
import { UseBooks } from "../../hooks/UseBooks";
import { useRouter } from "expo-router";
import ThemedButton from "../../components/ThemedButton";

const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibility, setvisibility] = useState(false);
  const toggleSwitch = () => {
    setvisibility(previousState => !previousState);
  }

  const { createBook } = UseBooks();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title.trim() || !author.trim() || !description.trim()) {
      alert("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);
      const book = await createBook({ 
        title, 
        author, 
        description,
        visibility: visibility // Make sure visibility is passed as a boolean
      });
      setTitle("");
      setAuthor("");
      setDescription("");
      setvisibility(false);
      router.replace("/Books");
    } catch (error) {
      alert("Error creating book: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ThemedView style={styles.container}>
        <Spacer />
        <ThemedText title={true} style={styles.heading}>
          Add a New Book
        </ThemedText>
        <Spacer />

        <ThemedTextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <Spacer />
        <ThemedTextInput
          placeholder="Author"
          value={author}
          onChangeText={setAuthor}
          style={styles.input}
        />

        <Spacer />
        <ThemedTextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        />
          
        <ThemedView style={{ 
            flexDirection: "row", 
            alignItems: "center", 
            alignSelf: "flex-start", // 👈 override parent centering
            marginLeft: 60,          // spacing from left edge
            marginTop: 20 
          }}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={visibility ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={visibility}
            />
            <ThemedText style={{ marginRight: 10 , marginLeft: 10 }}>
              {visibility ? "Public" : "Private"}
            </ThemedText>
          </ThemedView>

        <Spacer />
        <ThemedButton onPress={handleSubmit} disabled={loading}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {loading ? "Adding..." : "Add Book"}
          </Text>
        </ThemedButton>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Create;

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
