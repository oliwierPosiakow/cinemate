import {View, Image, StyleSheet, Pressable} from "react-native";
import {Text}  from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';
import COLORS from "../const";
import {useNavigation} from "@react-navigation/native";
export default function MovieItem(props:{poster: string, id: number, title: string, rate: number, count: number}){

    const navigator = useNavigation()
    function handlePress() {
        // @ts-ignore
        navigator.navigate('MovieDetails', {
            movieId: props.id
        })
    }

    return(
        <Pressable
            onPress={handlePress}
            android_ripple={{color: "rgba(0,0,0,0.32)"}}
            style={({pressed}) => pressed ? [styles.pressed, styles.movieContainer] : styles.movieContainer}>
            <View style={styles.posterWrapper}>
                <Image source={{uri: 'https://image.tmdb.org/t/p/original' +  props.poster}} style={styles.poster}/>
            </View>
            <View>
                <Text variant={'headlineSmall'} style={[styles.text, styles.title]}>{props.title}</Text>
            </View>
            <View style={[styles.iconsWrapper, styles.gap20]} >
                <View style={styles.iconsWrapper}>
                    <MaterialIcons name="star-rate" size={24} color={COLORS.text} />
                    <Text variant={'bodySmall'} style={styles.text}>{props.rate}</Text>
                </View>
                <View style={styles.iconsWrapper}>
                    <MaterialIcons name="account-circle" size={24} color={COLORS.text} />
                    <Text variant={'bodySmall'} style={styles.text}>{props.count}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    movieContainer:{
        backgroundColor: '#212121',
        marginVertical: 10,
        padding: 10,
        borderRadius: 12,
    },
    text:{
        color: COLORS.text,
    },
    poster:{
        width: '100%',
        height: 300,
        resizeMode: 'contain',
    },
    posterWrapper:{
        overflow: "hidden",
        borderRadius: 12,
    },
    title:{
        textAlign: "center",
    },
    iconsWrapper:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    },
    gap20:{
        gap: 20,
    },
    pressed:{
        opacity: .8,
    }
})