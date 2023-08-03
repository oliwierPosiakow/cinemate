import {View, Image, StyleSheet, Pressable, TextStyle, OpaqueColorValue} from "react-native";
import {Text, Button}  from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';
import COLORS from "../const";
import {useNavigation} from "@react-navigation/native";
import {Movie} from '../interfaces'
export default function MovieItem(props:Movie){

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
            <View style={styles.itemRight}>
                <View>
                    <Text variant={'headlineSmall'} style={[styles.text, styles.title]}>{props.title}</Text>
                </View>
                <View style={[styles.iconsWrapper, styles.gap20]} >
                    <View style={styles.iconsWrapper}>
                        <MaterialIcons name="star-rate" size={24} color={COLORS.text as string} />
                        <Text variant={'bodySmall'} style={styles.text}>{Math.round(props.popularity)}</Text>
                    </View>
                    <View style={styles.iconsWrapper}>
                        <MaterialIcons name="people-alt" size={24} color={COLORS.text as string} />
                        <Text variant={'bodySmall'} style={styles.text}>{props.count}</Text>
                    </View>
                </View>
                <Button mode="outlined" style={styles.movieButton} textColor={COLORS.primary as string}>
                    Read more
                </Button>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    movieContainer:{
        backgroundColor: '#212121',
        marginVertical: 10,
        padding: 20,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "center",
        gap: 20,
    },
    text:{
        color: COLORS.text as TextStyle['color'],
    },
    poster:{
        width: 100,
        height: 150,
        resizeMode: 'contain',
    },
    itemRight: {
        flex: 2,
        justifyContent: "center",
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
    movieButton:{
      borderWidth: 1,
      borderColor: COLORS.primary as TextStyle['color'],
        marginTop: 20,
    },
    gap20:{
        gap: 20,
    },
    pressed:{
        opacity: .8,
    }
})