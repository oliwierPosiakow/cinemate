import {View, FlatList, ScrollView, StyleSheet} from "react-native";
import {Text} from 'react-native-paper';
import MovieItem from "./MovieItem";
import COLORS from '../const'

export default function MoviesOverview(props: {data: any, title: string}) {
    const DATA = props.data.results
    return (
        <View style={styles.container}>
            <Text variant={'headlineLarge'} style={styles.title}>{props.title}</Text>
            <FlatList
                style={styles.flatList}
                data={DATA}
                renderItem={({item}) => {
                    return (
                        <MovieItem
                            poster={item.poster_path}
                            id={item.id}
                            title={item.title}
                            rate={item.vote_average}
                            count={item.vote_count}
                    />)
                }}
                keyExtractor={item => item.id}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        color: COLORS.primary,
        marginVertical: 20,
    }
})