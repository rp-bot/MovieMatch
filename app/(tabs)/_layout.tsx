/* eslint-disable prettier/prettier */

import { Entypo, Feather } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';



export default function TabLayout ()
{
  return (
    <Tabs
      screenOptions={ {
        tabBarActiveTintColor: 'black',
      } }>
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
