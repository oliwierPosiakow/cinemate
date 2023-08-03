import {Keyboard, StyleSheet, TextStyle, View} from 'react-native'
import {Button, Searchbar, Text} from 'react-native-paper'
import COLORS from "../const";
import {useEffect, useState} from "react";
import {useGetMovieTitleMutation, useGetPopularMutation} from "../redux/api/apiSlice";
import MoviesOverview from "../UI/MoviesOverview";
import {useDispatch, useSelector} from "react-redux";
import {setDefault} from "../redux/pageSlice";

export default function Home(){
    const [search, setSearch] = useState<string>('')
    const [popular, setPopular] = useState<any>({})
    const [getPopular] = useGetPopularMutation()
    const [getMovieTitle] = useGetMovieTitleMutation()
    const [error, setError] = useState<string>()
    // @ts-ignore
    const page = useSelector((state) => state.page.value)
    const dispatch = useDispatch()

    useEffect(() => {
        if(search.length === 0){
            void fetchPopular()
        }
        else{
            void fetchTitle()
        }
    }, [page]);
    //function responsible for fetching popular movies if no title is provided
    const fetchPopular = async ()=> {
        try{
            void await getPopular({page})
                .unwrap()
                .then(data => {
                    if(data.results.length === 0){
                        setError('No movies which such title, try different one.')
                    }
                    setPopular(data)
                })
        }
        catch (e) {
            setError(e.message)
        }
    }
    //function responsible for fetching movie details while searching via title
    const fetchTitle = async () => {
        try {
            void await getMovieTitle({search, page})
                .unwrap()
                .then(data => {
                    setPopular(data)
                })
        }
        catch (e) {
            setError(e.message)
        }
    }

    const handleSearch = (text: string) => {
        dispatch(setDefault())
        Keyboard.dismiss()
        if(search.trim() === '') {
            void fetchPopular()
            return
        }
        setSearch(text)
        fetchTitle()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header} variant={'headlineLarge'}>Cinemate</Text>
            <View style={styles.inputContainer}>
                <Searchbar
                    style={styles.searchInput}
                    value={search}
                    onChangeText={text => setSearch(text)}
                    iconColor={COLORS.primary as any}
                    placeholder={'Title of a movie'}
                    onIconPress={() => handleSearch(search)}
                    onClearIconPress={() => handleSearch('')}
                />
                <Button
                    style={styles.searchButton}
                    mode={'outlined'}
                    buttonColor={COLORS.primary as any}
                    textColor={COLORS.text as any}
                    onPress={() => handleSearch(search)}
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
        backgroundColor: COLORS.background as TextStyle['color'],
        padding: 20,
    },
    header:{
        color: COLORS.primary as TextStyle['color'],
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
