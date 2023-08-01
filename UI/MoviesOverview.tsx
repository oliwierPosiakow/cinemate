import {View, FlatList} from "react-native";

export default function MoviesOverview({data}){
    return (
        <View>
            <FlatList
                data={data}
                renderItem={(item) => }
            />
        </View>
    )
}