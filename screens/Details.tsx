import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, TextStyle, View} from "react-native";
import {ActivityIndicator, Text} from 'react-native-paper';
import {useGetMovieDetailsMutation} from "../redux/api/apiSlice";
import COLORS from "../const";
import {FontAwesome5} from '@expo/vector-icons';
import {Movie} from "../interfaces";

function Details({route, navigation}) {
    const movieId = route.params?.movieId
    const [getMovieDetails] = useGetMovieDetailsMutation()
    const [movieDetails, setMovieDetails] = useState<any>()
    const [error, setError] = useState<string>()
    const [loading, setLoading] = useState<boolean>(true)

    //using function on the first render of a component
    useEffect(() => {
        try{
            getDetails()
        }
        catch (e){
            setError(e.message)
        }
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
    //if component is still loading show activityIndicator
    if(loading || error){
        return (
            <View style={styles.loadingView}>
                <ActivityIndicator size={100} animating={true} color={COLORS.primary as string}/>
                {error && <Text variant={"bodyLarge"} style={styles.error}>{error}</Text>}
            </View>
        )
    }

    return (
        <View style={styles.detailsContainer}>
            <ScrollView>
                <View style={styles.posterWrapper}>
                    <View style={styles.posterContainer}>
                        <Image style={styles.poster} source={{uri: 'https://image.tmdb.org/t/p/original' + movieDetails.poster_path}}/>
                    </View>
                </View>
                <View style={styles.movieDetails}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.lightText} variant={"headlineLarge"}>{movieDetails.title}</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <FontAwesome5 name="star" size={20} color={COLORS.textDarker} />
                        <Text style={styles.darkText} variant={"bodyMedium"}>{movieDetails.vote_average?.toFixed(2)}</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <FontAwesome5 name="clock" size={20} color={COLORS.textDarker} />
                        <Text style={styles.darkText} variant={"bodyMedium"}>{movieDetails.runtime} min</Text>
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
                    <Text variant={"bodyMedium"} style={[styles.lightText, styles.desc]}>
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
        backgroundColor: COLORS.background as TextStyle['color'],
        flex: 1,
        padding: 20,
    },
    posterWrapper:{
        alignItems: "center"
    },
    posterContainer:{
        overflow: "hidden",
      borderRadius: 12,
    },
    poster:{
        width: 300,
        height: 350,
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
        color: COLORS.text as TextStyle['color'],
    },
    infoWrapper:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginVertical: 5,
    },
    darkText:{
        color: COLORS.textDarker as TextStyle['color'],
    },
    desc:{
        marginVertical: 10,
    },
    loadingView:{
        flex: 1,
        backgroundColor: COLORS.background as TextStyle['color'],
        justifyContent: "center"
    },
    error:{
        textAlign: "center",
        color: COLORS.secondary as string,
        marginVertical: 10,

    }
})