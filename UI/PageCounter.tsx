import {Button, Text} from "react-native-paper";
import { MaterialIcons } from '@expo/vector-icons';import COLORS from "../const";
import {TextInput, View, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "../redux/pageSlice";
import {transparent} from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";

export default function PageCounter(){
    const dispatch = useDispatch()
    const page = useSelector((state) => state.page.value)
    return (
        <View style={styles.counterWrapper}>
            <Button onPress={() => dispatch(decrement())}>
                <MaterialIcons name="navigate-before" size={20} color={COLORS.text} />
            </Button>
            <Text variant={"headlineSmall"} style={styles.pageInput}>{page}</Text>
            <Button onPress={() => dispatch(increment())}>
                <MaterialIcons name="navigate-next" size={20} color={COLORS.text} />
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    counterWrapper:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        paddingVertical: 5
    },
    pageInput:{
        backgroundColor: null,
        color: COLORS.primary,
        textAlign: "center",
    }
})