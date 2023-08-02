import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image} from "react-native";
import {Text} from 'react-native-paper';
import {useGetMovieDetailsMutation} from "../redux/api/apiSlice";
import COLORS from "../const";

function Details({route, navigation}) {
    const movieId = route.params?.movieId
    const [getMovieDetails, {data}] = useGetMovieDetailsMutation()
    const [movieDetails, setMovieDetails] = useState<any>({})

    console.log(movieDetails)

    useEffect(() => {
        getDetails()
    }, []);
    const getDetails = async () => {
        await getMovieDetails({movieId})
            .unwrap()
            .then(data => {
                setMovieDetails(data)
                navigation.setOptions({title: data.title})
            })
    }
    return (
        <View style={styles.detailsContainer}>
            <Image style={styles.poster} source={{uri: 'https://image.tmdb.org/t/p/original' + movieDetails.poster}}/>
            <Text variant={"headlineMedium"}>{movieDetails.title}</Text>
        </View>
    );
}

export default Details;

const styles = StyleSheet.create({
    detailsContainer:{
        backgroundColor: COLORS.background
    },
    poster:{
        width: '100%',
        height: 500,
        resizeMode: "cover"
    }
})