import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet} from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import Home from './screens/Home';
import Details from "./screens/Details";
import React from "react";
import COLORS from "./const";

import {Provider} from "react-redux";
import {ApiProvider} from "@reduxjs/toolkit/dist/query/react";
import {apiSLice} from "./redux/api/apiSlice";
import {store} from "./redux/store";

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
                          <Stack.Screen name={"MovieDetails"} component={Details} options={{presentation: 'modal'}}/>
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
    backgroundColor: COLORS.background,
  },
});
