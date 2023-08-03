import {FlatList, StyleSheet, View} from "react-native";
import {Text} from 'react-native-paper';
import MovieItem from "./MovieItem";
import COLORS from '../const'
import PageCounter from "./PageCounter";
import {useEffect, useRef} from "react";

export default function MoviesOverview(props: {data: any, title: string}) {
    const DATA = props.data.results
    const flatListRef = useRef()

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
        color: COLORS.primary,
        marginVertical: 10,
    }
})