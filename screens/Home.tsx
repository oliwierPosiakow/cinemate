import {View, StyleSheet} from 'react-native'
import {Text, Button} from 'react-native-paper'
import COLORS from "../const";
import {useNavigation} from "@react-navigation/native";

export default function Home(){

    const navigator = useNavigation()
    function handlePress(){
        // @ts-ignore
        navigator.navigate('MovieDetails')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header} variant={'headlineLarge'}>Cinemate</Text>
            <Button onPress={handlePress}>Press me</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 20,
    },
    header:{
        color: COLORS.primary,
        textAlign: "center",
    }
})
