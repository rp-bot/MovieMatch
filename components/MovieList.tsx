/* eslint-disable prettier/prettier */
// MovieList.tsx
import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

import { movies } from '../assets/data'; // Adjust the path based on where moviesData.ts is located
const dummyData = [
    { id: '1', title: 'Test Movie 1' },
    { id: '2', title: 'Test Movie 2' },
    { id: '3', title: 'Test Movie 3' },
];
export default function MovieList ()
{

    return (
        <View className='p-4 '>
            <FlatList
                className='rounded-md bg-slate-300 '
                data={ movies }
                keyExtractor={ ( item ) => item.id.toString() }
                renderItem={ ( { item } ) => (
                    <View className=''>
                        <Image className="w-full h-full rounded-md mb-2"
                            resizeMode="cover" source={ { uri: item.imageUrl } } />
                        <Text >{ item.title }</Text>
                        <Text >{ item.genre } • { item.releaseYear }</Text>
                        <Text >Rating: { item.rating }</Text>
                        <Text >{ item.description }</Text>
                        <Text >Duration: { item.duration }</Text>
                    </View>
                ) }
            />
        </View>
    );
}



const styles = StyleSheet.create( {
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
} );