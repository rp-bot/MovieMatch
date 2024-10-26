/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { movies } from '~/assets/data';
import MovieList from '~/components/MovieList';


const HomeScreen = () =>
{
  return (
    <SafeAreaView>
      <View>
        <MovieList />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;