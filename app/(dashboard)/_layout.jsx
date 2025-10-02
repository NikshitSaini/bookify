import { Tabs } from "expo-router"
import { useColorScheme } from "react-native"
import { Colors } from "../../constants/Colors";
import {Ionicons} from '@expo/vector-icons'
import UserOnly from "../../components/auth/UserOnly";
const DashboardLayout = () => {
    const colorscheme= useColorScheme();
    const theme=Colors[colorscheme] ?? Colors.light;
  return (
    <UserOnly>
        <Tabs
            screenOptions={{
                headerShown:false,
                tabBarStyle:{
                    backgroundColor:theme.navBackground,
                    paddingTop:10,
                    height:90,
                },
                tabBarActiveTintColor:theme.iconColorFocused,
                tabBarInactiveTintColor:theme.iconColor,
                
            }}>  
            <Tabs.Screen name="Explore" 
            options={{title:'Explore Books',tabBarIcon:({focused})=>(
                <Ionicons name={focused ? 'layers' : 'layers-outline'} size={30} color={focused ? theme.iconColorFocused : theme.iconColor} />
            )}}/>
            <Tabs.Screen name="Books" 
            options={{title:'Books',tabBarIcon:({focused})=>(
                <Ionicons name={focused ? 'book' : 'book-outline'} size={30} color={focused ? theme.iconColorFocused : theme.iconColor} />
            )}}
            />
            <Tabs.Screen name="Create" 
            options={{title:'Add New',tabBarIcon:({focused})=>(
                <Ionicons name={focused ? 'create' : 'create-outline'} size={30} color={focused ? theme.iconColorFocused : theme.iconColor} />
            )}}/>
            <Tabs.Screen name="Profile" 
            options={{title:'Profile',tabBarIcon:({focused})=>(
                <Ionicons name={focused ? 'person' : 'person-outline'} size={30} color={focused ? theme.iconColorFocused : theme.iconColor} />
            )}}/>
            <Tabs.Screen name="books/[id]" options={{href:null}}/> 
            <Tabs.Screen name="explore/[id]" options={{href:null}}/> 

        </Tabs>
    </UserOnly>
  )
}

export default DashboardLayout
