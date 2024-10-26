/* eslint-disable prettier/prettier */
import { View, Text, SafeAreaView, ScrollView, RefreshControl, Button } from 'react-native';
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
                setLikedCards( JSON.parse( storedCards ) );
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
                contentContainerStyle={ { padding: 20, height: '100%' } }
                refreshControl={
                    <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
                }
            >
                { likedCards.length > 0 ? (
                    likedCards.map( ( card: any, index ) => (
                        <View key={ index }>
                            <Text>{ card.title }</Text>
                            <Text>{ card.genre } • { card.releaseYear }</Text>
                            <Button title="Delete" onPress={ () => handleDelete( index ) } />
                        </View>
                    ) )
                ) : (
                    <Text>No liked cards yet.</Text>
                ) }
            </ScrollView>
        </SafeAreaView>
    );
};

export default LikedList;