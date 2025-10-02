import { StyleSheet, useColorScheme } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { UseBooks } from '../../../hooks/UseBooks';
import { Colors } from '../../../constants/Colors'; // Import Colors

import ThemedButton from '../../../components/ThemedButton';
import ThemedCard from '../../../components/ThemedCard';
import ThemedView from '../../../components/ThemedView';
import ThemedText from '../../../components/ThemedText';
import Spacer from '../../../components/spacer';

// 1. Create a dynamic style function
// ... (imports and other code are the same)

const BookDetails = () => {
    const [book, setBook] = useState(null);
    const { id } = useLocalSearchParams();
    const { fetchBooksById, deleteBook } = UseBooks(); // Destructure deleteBook
    const theme = useColorScheme();
    const styles = createStyles(theme);
    const router = useRouter();

    useEffect(() => {
        async function loadbook() {
            const fetchedBook = await fetchBooksById(id);
            setBook(fetchedBook);
        }
        loadbook();
    }, [id]);

    const handleDelete = async () => {
        if (!book) return;
        // 1. Use the destructured deleteBook function
        await deleteBook(book.$id);
        setBook(null);
        // 2. Enclose the path in quotes
        router.replace('/Books');
    };

    return (
        <ThemedView safe={true} style={[styles.container, { backgroundColor: Colors[theme].background }]}>
            <ThemedText style={{ color: Colors[theme].title }}>
                {book ? book.title : 'Loading...'}
            </ThemedText>
            <Spacer />
            <ThemedCard style={{ backgroundColor: Colors[theme].uiBackground }}>
                <ThemedText style={{ fontWeight: 'bold', fontSize: 18, color: Colors[theme].text }}>
                    {book ? book.author : 'Loading...'}
                </ThemedText>
                <Spacer />
                <ThemedText style={{ color: Colors[theme].text }}>
                    {book ? book.description : 'Loading...'}
                </ThemedText>
            </ThemedCard>
            <ThemedButton style={styles.delete} onPress={handleDelete}>
                <ThemedText style={{ color: '#f2f2f2' }}>Delete Book</ThemedText>
            </ThemedButton>
        </ThemedView>
    );
};

export default BookDetails;

// ... (createStyles function is the same)
const createStyles = (theme) => {
  const colorScheme = Colors[theme];
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      backgroundColor: colorScheme.background, // Use dynamic background color
      paddingHorizontal: 16,
    },
    delete:{
        marginTop:40,
        backgroundColor:Colors. warning,
        borderColor:'#ff4d4d',
        width:130,
        alignItems:'center',
        alignSelf:'center',
        borderWidth:1,
        borderRadius:8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    }
  });
};