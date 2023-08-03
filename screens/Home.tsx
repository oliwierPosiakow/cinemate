import {Keyboard, StyleSheet, View} from 'react-native'
import {Button, Searchbar, Text} from 'react-native-paper'
import COLORS from "../const";
import {useEffect, useState} from "react";
import {useGetMovieTitleMutation, useGetPopularMutation} from "../redux/api/apiSlice";
import MoviesOverview from "../UI/MoviesOverview";
import {useSelector, useDispatch} from "react-redux";
import {setDefault} from "../redux/pageSlice";

export default function Home(){
    const [search, setSearch] = useState('')
    const [popular, setPopular] = useState<any>({})
    const [title, setTitle] = useState<any>({})
    const [getPopular] = useGetPopularMutation()
    const [getMovieTitle] = useGetMovieTitleMutation()
    const page = useSelector((state) => state.page.value)
    const dispatch = useDispatch()

    useEffect(() => {
        if(search.length === 0){
            fetchPopular()
        }
        else{
            fetchTitle()
        }

    }, [page]);

    const fetchPopular = async ()=> {
        try{
            getPopular({page})
                .unwrap()
                .then(data => {
                    setPopular(data)
                })
        }
        catch (e) {}
    }

    const fetchTitle = async () => {
        if(search.trim() === ''){
            fetchPopular()
            return
        }
        await getMovieTitle({search, page})
            .unwrap()
            .then(data => {
                setPopular(data)
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header} variant={'headlineLarge'}>Cinemate</Text>
            <View style={styles.inputContainer}>
                <Searchbar
                    style={styles.searchInput}
                    value={search}
                    onChangeText={text => {
                        if(search.trim() === '') {
                            fetchPopular()
                        }
                        setSearch(text)
                    }}
                    iconColor={COLORS.primary}
                    placeholder={'Tittle of a movie'}
                    onIconPress={() => {
                        dispatch(setDefault())
                        Keyboard.dismiss()
                        fetchTitle()
                    }}

                />
                <Button
                    style={styles.searchButton}
                    mode={'outlined'}
                    buttonColor={COLORS.primary}
                    textColor={COLORS.text}
                    onPress={() => {
                        dispatch(setDefault())
                        Keyboard.dismiss()
                        fetchTitle()
                    }}
                >
                    Search
                </Button>
            </View>
            <View style={styles.flatlist}>
                <MoviesOverview title={'Popular'} data={popular}/>
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
    },
    pressed:{
        opacity: .8,
    },
    flatlist:{
        flex:1,
    },
})
