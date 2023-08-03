import {FlatList, StyleSheet, View} from "react-native";
import {Text} from 'react-native-paper'
import MovieItem from "./MovieItem";
import COLORS from '../const'
import PageCounter from "./PageCounter";
import {useRef} from "react";
import {FontAwesome5} from '@expo/vector-icons';

export default function MoviesOverview(props: {data: any, title: string}) {
    const DATA = props.data.results
    const flatListRef = useRef()

    if (DATA?.length === 0) {
        return (
            <View style={styles.errorContainer}>
                <FontAwesome5 name="sad-tear" size={48} color={COLORS.secondary as string}/>
                <Text style={styles.error} variant={'bodyLarge'}>No movie with such title, try different one.</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                ref={flatListRef}
                renderItem={({item}) => {
                    return (
                        <MovieItem
                            poster={item.poster_path}
                            id={item.id}
                            title={item.title}
                            popularity={item.popularity}
                            count={item.vote_count}
                        />)
                }}
                keyExtractor={item => item.id}
            />
            <PageCounter/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    title:{
        color: COLORS.primary as string,
        marginVertical: 10,
    },
    errorContainer:{
      flex: 1,
      justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },
    error:{
        textAlign: "center",
        color: COLORS.secondary as string,
    }
})