import COLORS from '../styles/colors.js';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

const styles = StyleSheet.create({
  article: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.2,
    margin: 25,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    borderColor: COLORS.dark,
    borderWidth: 2,
  },
  item: {
    margin: 25,
    padding: 10,
    backgroundColor: COLORS.active,
    fontSize: 18,
    height: 44,
  },
});

import Header from './Header.js';

const Tab = createBottomTabNavigator();




//Account Page Content
const AcccountView = () => {
  return (
    <View>
      <View>
        <TouchableOpacity onPress={() => Alert.alert('This is a test')}>
          <View style={styles.article}>
            <Text style={styles.item}>
              Account items will be shown here.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}




//Handles stack navigation settings for account//
export default function Account({ navigation }: { navigation: any }) {
  return (
    //Display header in here
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTitleStyle: {
          display: 'none',
        },
        //For some reason touch target for account icon is too tall, abt double height
        headerRight: () => (

          <Header title="Account Info" />

        ),
        headerLeft: () => (
          <TouchableOpacity style={{ backgroundColor: COLORS.secondary, marginLeft: 10, padding: 2 }} onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 20, fontWeight: "800" }}>[BACK BTN HERE]</Text>
          </TouchableOpacity>
        ),


      })}
    >
      <Tab.Screen
        name="accountView"
        component={AcccountView}
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tab.Navigator>
  );
}
