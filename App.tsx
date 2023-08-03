import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, TextStyle} from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import Home from './screens/Home';
import Details from "./screens/Details";
import React from "react";
import COLORS from "./const";

import {Provider} from "react-redux";
import {store} from "./redux/store";
import {FontAwesome5} from '@expo/vector-icons';
import {Button} from 'react-native-paper'

const Stack: any = createNativeStackNavigator();
export default function App(): React.JSX.Element {
  return (
      <>
          <StatusBar style={'light'}/>
          <SafeAreaView style={styles.container}>
              <Provider store={store}>
                  <NavigationContainer>
                      <Stack.Navigator screenOptions={{
                          headerStyle: {backgroundColor: COLORS.background},
                          headerTintColor: COLORS.primary
                      }}>
                          <Stack.Screen name={"Home"} component={Home} options={{headerShown: false}}/>
                          <Stack.Screen name={"MovieDetails"} component={Details} options={{
                              presentation: 'modal',
                              headerRight: () => (
                                  //in the future 'watchLater' may be added
                                  <Button>
                                      <FontAwesome5 name="plus" size={20} color={COLORS.primary} />
                                  </Button>
                              ),
                          }}/>
                      </Stack.Navigator>
                  </NavigationContainer>
              </Provider>
          </SafeAreaView>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background as TextStyle['color'],
  },
});
