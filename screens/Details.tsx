import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, ScrollView} from "react-native";
import {Text, ActivityIndicator} from 'react-native-paper';
import {useGetMovieDetailsMutation} from "../redux/api/apiSlice";
import COLORS from "../const";
import { FontAwesome5 } from '@expo/vector-icons';

function Details({route, navigation}) {
    const movieId = route.params?.movieId
    const [getMovieDetails, {data}] = useGetMovieDetailsMutation()
    const [movieDetails, setMovieDetails] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(false)

    console.log(movieDetails)

    //using function on the first render of a component
    useEffect(() => {
        getDetails()
    }, []);

    //function which gets the data from an API and controls the loading animation on the screen
    const getDetails = async () => {
        setLoading(true)
        await getMovieDetails({movieId})
            .unwrap()
            .then(data => {
                setMovieDetails(data)
                navigation.setOptions({title: data.title})
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            })
    }

    if(loading){
        return (
            <View style={styles.loadingView}>
                <ActivityIndicator size={100} animating={true} color={COLORS.primary}/>
            </View>
        )
    }

    return (
        <View style={styles.detailsContainer}>
            <ScrollView>
                <View style={styles.posterWrapper}>
                    <Image style={styles.poster} source={{uri: 'https://image.tmdb.org/t/p/original' + movieDetails.poster_path}}/>
                </View>
                <View style={styles.movieDetails}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.lightText} variant={"headlineLarge"}>{movieDetails.lightText}</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <FontAwesome5 name="star" size={20} color={COLORS.textDarker} />
                        <Text style={styles.darkText} variant={"bodyMedium"}>{movieDetails.vote_average?.toFixed(2)}</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <FontAwesome5 name="theater-masks" size={20} color={COLORS.textDarker} />
                        <Text style={styles.darkText} variant={'bodyMedium'}>
                            {movieDetails.genres?.map(item => item.name).join(', ')}
                        </Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <FontAwesome5 name="globe-americas" size={20} color={COLORS.textDarker} />
                        <Text style={styles.darkText} variant={'bodyMedium'}>
                            {movieDetails.production_countries?.map(item => item.name).join(', ')}
                        </Text>
                    </View>
                    <Text variant={"bodyMedium"} style={styles.lightText}>
                        {movieDetails.overview}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default Details;

const styles = StyleSheet.create({
    detailsContainer:{
        backgroundColor: COLORS.background,
        flex: 1,
        padding: 20,
    },
    posterWrapper:{
        alignItems: "center"
    },
    poster:{
        width: 350,
        height: 400,
        resizeMode: "contain",
    },
    movieDetails:{
        marginVertical: 10,
    },
    titleWrapper:{
        flexDirection: "row",
        alignItems: "center",
    },
    lightText:{
        color: COLORS.text,
    },
    infoWrapper:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginVertical: 5,
    },
    darkText:{
        color: COLORS.textDarker,
    },
    loadingView:{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center"
    }

})