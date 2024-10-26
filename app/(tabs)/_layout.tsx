/* eslint-disable prettier/prettier */

import { Entypo, Feather } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';



export default function TabLayout ()
{
  return (
    <Tabs
      screenOptions={ {
        tabBarActiveTintColor: 'black',
        tabBarStyle: {
          backgroundColor: '#fffdf7',
          // Set background color of the tab bar
          // borderTopWidth: 0,          // Remove top border
          // height: 60,                 // Set the height of the tab bar
          // paddingBottom: 10,          // Add some padding at the bottom
          // elevation: 0,               // Remove shadow on Android
        },
      } }
    >

      <Tabs.Screen
        name="home"
        options={ {
          title: 'Home',
          tabBarShowLabel: false,
          headerShown: false,

          tabBarIcon: ( { color } ) => <Feather name="film" size={ 24 } color={ color } />,

        } }

      />
      <Tabs.Screen
        name="prompt"
        options={ {
          title: 'Search',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ( { color } ) => <Feather name="search" size={ 24 } color={ color } />,

        } }
      />

      <Tabs.Screen
        name="liked"
        options={ {
          title: 'Liked List',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ( { color } ) => <Feather name="heart" size={ 24 } color={ color } />,

        } }
      />


    </Tabs>
  );
}

const styles = StyleSheet.create( {
  tabBarStyle: {
    backgroundColor: "black"
  }
} );