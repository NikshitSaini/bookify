import {Stack} from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';
import Guestonly from '../../components/auth/Guestonly';
export default function AuthLayout() { 
    const colorscheme= useColorScheme();
    const theme=Colors[colorscheme] ?? Colors.light;
    return (
        <Guestonly> 
            <StatusBar value="auto" />
            <Stack screenOptions={{
                    headerStyle:{backgroundColor:theme.navBackground},
                    headerTintColor:theme.title,
                    headerTitleStyle:{fontWeight:'bold',fontSize:20},
                    animation:null,
                  }}>
                <Stack.Screen name="login" />
                <Stack.Screen name="register" />
            </Stack>
        </Guestonly>
    );
}  