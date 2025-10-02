import { ActivityIndicator,useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";
import ThemedView from "./ThemedView";

const themedloader=({size='large',color})=>{
    const colorscheme= useColorScheme();
    const theme=Colors[colorscheme]?? Colors.light;
    return(
        <ThemedView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size={size} color={theme.text}/>
        </ThemedView>
    )
}
export default themedloader;