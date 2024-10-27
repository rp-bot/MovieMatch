/* eslint-disable prettier/prettier */
import { View, Text, SafeAreaView, ScrollView, RefreshControl, Button, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
const LikedList = () =>
{
    const [ likedCards, setLikedCards ] = useState( [] );
    const [ refreshing, setRefreshing ] = useState( false );
    // Fetch liked cards from AsyncStorage
    const fetchLikedCards = async () =>
    {
        try
        {
            const storedCards = await AsyncStorage.getItem( 'likedCards' );
         
            if ( storedCards )
            {
                setLikedCards( JSON.parse( storedCards.replace( /\r?\n|\r/g, '' ) ) );
            }
        } catch ( error )
        {
            console.log( 'Error fetching liked cards:', error );
        }
    };

    // Pull-to-refresh function
    const onRefresh = async () =>
    {
        setRefreshing( true );
        await fetchLikedCards();
        setRefreshing( false );
    };

    const handleDelete = async ( cardIndex: number ) =>
    {
        const updatedCards = likedCards.filter( ( _, index ) => index !== cardIndex );
        setLikedCards( updatedCards );

        // Update AsyncStorage with the updated liked cards
        try
        {
            await AsyncStorage.setItem( 'likedCards', JSON.stringify( updatedCards ) );
            console.log( 'Deleted card and updated AsyncStorage:', updatedCards );
        } catch ( error )
        {
            console.log( 'Error deleting card:', error );
        }
    };

    // Automatically fetch liked cards whenever the screen is focused
    useFocusEffect(
        React.useCallback( () =>
        {
            fetchLikedCards(); // Fetch the latest liked cards when navigating to this page
        }, [] )
    );
    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={ { padding: 0, height: '100%' } }
                refreshControl={
                    <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
                }
            >
                { likedCards.length > 0 ? (
                    likedCards.map( ( card: any, index ) => (
                        <View key={ index } className='flex-col justify-end  w-full'>
                            <Image source={ { uri: "https://image.tmdb.org/t/p/original" + card.backdrop_path } } className='absolute w-full h-full'
                                resizeMode='cover' />
                            <View className='bg-black opacity-30 h-32  w-full absolute'></View>
                            <View className='h-32 flex-col justify-end p-4 '>
                                <Text className='text-white text-2xl font-bold'>{ card.title }</Text>
                                <Text className='text-white text-lg font-semibold'>{ card.duration }</Text>
                                <Text className='text-white'>{ card.release_year } • { card.vote_average.toFixed( 1 ) } • { card.similarity_score.toFixed( 1 ) * 100 }%</Text>


                                <Button title="Delete" onPress={ () => handleDelete( index ) } />

                            </View>

                        </View>
                    ) )
                ) : (
                    <Text>No liked cards yet.</Text>
                ) }
            </ScrollView>
        </SafeAreaView>
    );
};

export default LikedList;;