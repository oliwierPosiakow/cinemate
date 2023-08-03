import {Button, Text} from "react-native-paper";
import {MaterialIcons} from '@expo/vector-icons';
import COLORS from "../const";
import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {decrement, increment} from "../redux/pageSlice";

export default function PageCounter(){
    const dispatch = useDispatch()
    // @ts-ignore
    const page = useSelector((state) => state.page.value)
    return (
        <View style={styles.counterWrapper}>
            <Button onPress={() => dispatch(decrement())}>
                <MaterialIcons name="navigate-before" size={20} color={COLORS.text as string} />
            </Button>
            <Text variant={"bodyMedium"} style={styles.pageInput}>{page}</Text>
            <Button onPress={() => dispatch(increment())}>
                <MaterialIcons name="navigate-next" size={20} color={COLORS.text as string} />
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({
    counterWrapper:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        paddingVertical: 5
    },
    pageInput:{
        backgroundColor: null,
        color: COLORS.primary as string,
        textAlign: "center",
    }
})