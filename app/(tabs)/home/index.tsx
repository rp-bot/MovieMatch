/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { movies } from '~/assets/data';
import MovieList from '~/components/MovieList';


const HomeScreen = () =>
{
  return (
    <SafeAreaView className='bg-[#ffeff1] h-full' >

      <MovieList />

    </SafeAreaView>
  );
};

export default HomeScreen;