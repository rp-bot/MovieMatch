/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-deck-swiper';

import { movies } from '../assets/data'; // Ensure the path is correct
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MovieList ()
{
    const [ likedCards, setLikedCards ] = useState( [] );

    const handleSwipedRight = async ( cardIndex: number ) =>
    {
        const swipedCard = movies[ cardIndex ];
        const updatedLikedCards = [ ...likedCards, swipedCard ];

        setLikedCards( updatedLikedCards );

        // Store the liked cards in AsyncStorage
        try
        {
            await AsyncStorage.setItem( 'likedCards', JSON.stringify( updatedLikedCards ) );
            console.log( 'Stored liked cards in AsyncStorage:', updatedLikedCards );
        } catch ( error )
        {
            console.log( 'Error storing liked cards:', error );
        }
    };
    return (
        <View className='flex-1 '>

            <Swiper
                cards={ movies }
                renderCard={ ( card ) => (
                    <View style={ styles.card }>
                        <Image source={ { uri: card.imageUrl } } style={ styles.image }
                            resizeMode='cover' />
                        <View style={ styles.textContainer }>
                            <Text style={ styles.title }>{ card.title }</Text>
                            <Text style={ styles.details }>{ card.genre } • { card.releaseYear }</Text>
                            <Text style={ styles.rating }>Rating: { card.rating }</Text>
                            <Text style={ styles.description }>{ card.description }</Text>
                            <Text style={ styles.duration }>Duration: { card.duration }</Text>
                        </View>
                    </View>
                ) }
                stackSize={ 2 }
                cardIndex={ 0 }


                backgroundColor="transparent" // Adjust background color
                containerStyle={ styles.containerStyle } // Apply container styles
                cardHorizontalMargin={ 20 } // Adjust horizontal margin between cards
                cardVerticalMargin={ 0 } // Adjust vertical margin between cards
                cardStyle={ styles.cardStyle }
                animateOverlayLabelsOpacity
                animateCardOpacity
                overlayLabels={ {
                    left: {
                        title: 'NOPE',
                        style: {
                            label: styles.overlayLabelLeft,
                        },
                    },
                    right: {
                        title: 'LIKE',
                        style: {
                            label: styles.overlayLabelRight,
                        },
                    },
                } }
                onSwipedLeft={ () =>
                {
                    console.log( 'Swiped left' );
                } }
                onSwipedRight={ ( cardIndex ) => handleSwipedRight( cardIndex ) }
                verticalSwipe={ false }
            />
        </View>
    );
}



const styles = StyleSheet.create( {
    swiperContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
    },
    // This overlay is applied only over the card to animate its background color

    containerStyle: {
        // backgroundColor: '#f0f0f0', // Change this to the desired background color
        // borderRadius: 10, // Border radius for the swiper container
        // paddingHorizontal: 10, // Padding around the cards

    },
    cardStyle: {
        // backgroundColor: '#f0f0f0', // Change this to the desired background color
        // height: 300, // Set height of the card to make it less tall
        height: 700, // Optional to enforce max height
    },
    textContainer: {
        position: 'absolute', // Text is positioned on top of the image
        bottom: 0, // Positioning the text near the bottom of the card
        left: 0,
        right: 0, // Spacing the text away from the card's edges
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a translucent background for text readability
        margin: 5,
        // Add padding inside the text container
        borderRadius: 15, // Round the text container slightly
    },
    card: {
        flex: 1,
        borderRadius: 15, // Increase or decrease to adjust the card's roundness
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        backgroundColor: '#fff',
        // padding: 20,
        height: "100%", // Optional to enforce max height
    },



    image: {
        width: '100%',
        height: '100%',
        position: 'absolute', // Position the image absolutely within the card
        top: 0,
        left: 0,
        borderRadius: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 15,
    },
    details: {
        fontSize: 16,
        color: '#666',
        marginVertical: 5,
    },
    rating: {
        fontSize: 16,
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginVertical: 10,
    },
    duration: {
        fontSize: 14,
        color: '#333',
        marginTop: 10,
    },
    overlayLabelLeft: {
        position: 'absolute',
        top: 0,
        right: 0,               // Start from the right edge of the screen
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 0, 0, 0.5)', // Semi-transparent red for left swipe
        justifyContent: 'center', // Center text vertically
        alignItems: 'flex-end',
        textAlign: "right",   // Align text to the right
        paddingRight: 20,         // Add some padding from the right edge for better spacing
        fontSize: 45,
        color: 'white',           // White text for contrast
        fontWeight: 'bold',
        zIndex: 10,
        borderRadius: 15,         // Ensure the overlay appears on top
    },
    overlayLabelRight: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',           // Ensure it covers the full screen height
        backgroundColor: 'rgba(0, 255, 0, 0.5)', // Semi-transparent green for the right swipe background
        justifyContent: 'center',
        alignItems: 'flex-start',  // Position the "LIKE" text to the left
        paddingLeft: 20,           // Add padding for the text on the left edge
        fontSize: 45,
        color: 'white',
        fontWeight: 'bold',
        zIndex: 10,
        borderRadius: 15,              // Ensure the overlay appears on top
    },
} );