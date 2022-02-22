import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { getHeaderTitle } from '@react-navigation/elements';

import COLORS from '../styles/colors'



import Resources from './resources.js'
import Track from './track.js'
import MyWage from './myWage.js'
import WorkLog from './workLog.js'
import Account from './account.js'
import Header from './header.js'

const Tab = createBottomTabNavigator();

export default function NavBar() {
    return (
      <NavigationContainer>
        <Tab.Navigator

            screenOptions={({ route }) => ({
            
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Resources') {
                    iconName = focused
                        ? 'information-circle'
                        : 'information-circle-outline';
                } 
                else if (route.name === 'Track') {
                    iconName = focused ? 'stopwatch' : 'stopwatch';
                }
                else if (route.name === 'My Wage') {
                    iconName = focused ? 'cash' : 'cash';
                }
                else if (route.name === 'Work Log') {
                    iconName = focused ? 'book' : 'book';
                }
                else if (route.name === 'Account') {
                  iconName = focused ? 'person' : 'person';
              }
    

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
            },

            header: ({ navigation, route, options }) => {
              const title = getHeaderTitle(options, route.name);
            
              return <Header title={title} style={options.headerStyle} navigation={navigation} />;
            },
    

            tabBarInactiveBackgroundColor:COLORS.primary,
            tabBarActiveBackgroundColor:COLORS.active,
            tabBarInactiveTintColor:COLORS.icon,
            tabBarActiveTintColor:"black",


            })}
            tabBar={props => <BottomTabBar {...props} state={{...props.state, routes: props.state.routes.slice(0,5)}}></BottomTabBar>}

        >
        <Tab.Screen name="Resources" component={Resources} />
        <Tab.Screen name="Track" component={Track} />
        <Tab.Screen name="My Wage" component={MyWage} />
        <Tab.Screen name="Work Log" component={WorkLog} />
        <Tab.Screen name="Account" component={Account} />

    

        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  /*
  header: ({ navigation, route, options }) => {
    const title = getHeaderTitle(options, route.name);
  
    return(
      <Header/>
    ) 
  },


  const styles = StyleSheet.create({
    container: {
      flex: 2,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: "row",

    },
  });


             headerRight: () => (
              <TouchableHighlight onPress={()=>{}}>
                <View style={styles.container}> 
                  <Text>User's Account</Text>
                  <Ionicons name="person" size = {25}/>
                </View>
              </TouchableHighlight>
            ),
  */


 



