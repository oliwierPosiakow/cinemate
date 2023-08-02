import {View, ScrollView, StyleSheet} from 'react-native'
import {Text, Searchbar, Button} from 'react-native-paper'
import COLORS from "../const";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {useGetMovieTitleQuery, useGetPopularMutation, useGetPopularQuery} from "../redux/api/apiSlice";
import {OMD_API_KEY} from '@env'
import MoviesOverview from "../UI/MoviesOverview";

export default function Home(){
    const [search, setSearch] = useState('')
    const [getPopular, {data}] = useGetPopularMutation()

    useEffect(() => {
        fetchPopular()
    }, []);

    const fetchPopular = async ()=> {
        await getPopular()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header} variant={'headlineLarge'}>Cinemate</Text>
            <View style={styles.inputContainer}>
                <Searchbar
                    style={styles.searchInput}
                    value={search}
                    onChangeText={text => setSearch(text)}
                    iconColor={COLORS.primary}
                    placeholder={'Tittle of a movie'}

                />
                <Button
                    style={styles.searchButton}
                    mode={'outlined'}
                    buttonColor={COLORS.primary}
                    textColor={COLORS.text}
                >
                    Search
                </Button>
            </View>
            <View>
                {data && <MoviesOverview title={'Popular'} data={data}/>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 20,
    },
    header:{
        color: COLORS.primary,
        textAlign: "center",
    },
    inputContainer:{
        flexDirection: "row",
        gap: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    searchInput:{
        flex: 1
    },
    searchButton:{
        height: '100%',
        justifyContent: "center",
        borderWidth: 0,
        borderRadius: 30,
    }



})
