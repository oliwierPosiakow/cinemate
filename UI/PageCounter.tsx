import {Button, Text} from "react-native-paper";
import {FontAwesome5} from "@expo/vector-icons";
import COLORS from "../const";
import {TextInput, View, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "../redux/pageSlice";

export default function PageCounter(){
    const dispatch = useDispatch()
    const page = useSelector((state) => state.page.value)
    return (
        <View>
            <Button onPress={() => dispatch(decrement())}>
                <FontAwesome5 name="minus" size={24} color={COLORS.text} />
            </Button>
            <Text style={styles.pageInput}>{page}</Text>
            <Button onPress={() => dispatch(increment())}>
                <FontAwesome5 name="plus" size={24} color={COLORS.text} />
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    pageInput:{
        width: 50,
        backgroundColor: 'white',
        textAlign: "center"
    }
})