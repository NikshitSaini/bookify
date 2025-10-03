import { StyleSheet, useColorScheme } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { UseBooks } from '../../../hooks/UseBooks';
import { Colors } from '../../../constants/Colors';

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

    useEffect(() => {
        async function loadbook() {
            const fetchedBook = await fetchBooksById(id);
            setBook(fetchedBook);
        }
        loadbook();
    }, [id]);

    return (
        <ThemedView safe={true} style={[styles.container, { backgroundColor: Colors[theme].background }]}>
            <ThemedText style={{ color: Colors[theme].title, fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
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