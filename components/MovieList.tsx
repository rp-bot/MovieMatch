/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-deck-swiper';

// import { movies } from '../assets/data'; // Ensure the path is correct
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRecsBasedOnLikesPOST } from '~/api/routes';
import { useFocusEffect } from '@react-navigation/native';

export default function MovieList ()
{
    const [ movies, setMovies ] = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ counter, setCounter ] = useState( 0 );
    const [ trigger, setTrigger ] = useState( true );
    const [ refreshKey, setRefreshKey ] = useState( 0 );
    const [ refreshing, setRefreshing ] = useState( false );

    const onRefresh = async () =>
    {
        setRefreshing( true );
        setMovies( [] );
        setRefreshing( false );
    };

    useFocusEffect(
        useCallback( () =>
        {
            // setMovies( [] );
            const fetchRecommendations = async () =>
            {
                try
                {
                    const storedRecommendations = await AsyncStorage.getItem( 'recommendations' );
                    console.log( 'getting recs: ', storedRecommendations );

                    if ( storedRecommendations )
                    {
                        setMovies( JSON.parse( storedRecommendations ) );
                        console.log( 'the movies', movies );
                        setTrigger( false );
                    }

                    if ( movies.length > 0 )
                    {
                        console.log( 'movies num ', movies.length );
                        setLoading( false );
                        setTrigger( false );
                    }
                } catch ( error )
                {
                    console.log( 'Error fetching recommendations:', error );
                    setLoading( false );
                    setTrigger( false );
                }
            };

            if ( trigger )
            {
                console.log( 'triggered' );
                fetchRecommendations();
                setTrigger( false ); // Reset to prevent retriggering the fetch
            }

            console.log( 'fetching again' );
            fetchRecommendations();

            // Optional cleanup function if needed
            return () =>
            {
                // Cleanup code here if necessary
            };
        }, [ trigger, movies.length ] )
    );

    // const [ likedCards, setLikedCards ] = useState( [] );
    const handleSwipedRight = async ( cardIndex ) =>
    {
        const swipedCard = movies[ cardIndex ];

        try
        {
            // Fetch existing liked cards from AsyncStorage
            const storedLikedCards = await AsyncStorage.getItem( 'likedCards' );
            const likedCardsArray = storedLikedCards ? JSON.parse( storedLikedCards.replace( /\r?\n|\r/g, '' ) ) : [];

            // Add the new swiped card to the array
            likedCardsArray.push( swipedCard );

            // Store the updated liked cards array back into AsyncStorage
            await AsyncStorage.setItem( 'likedCards', JSON.stringify( likedCardsArray ) );




        } catch ( error )
        {
            console.log( 'Error storing liked cards:', error );
        }
    };

    const handleSwipedLeft = async ( cardIndex ) =>
    {

        const swipedCard = movies[ cardIndex ];

        try
        {
            // Fetch existing disliked cards from AsyncStorage
            const storedDislikedCards = await AsyncStorage.getItem( 'disLikedCards' );
            const disliked = storedDislikedCards ? JSON.parse( storedDislikedCards.replace( /\r?\n|\r/g, '' ) ) : [];

            // Add the new swiped card to the array
            disliked.push( swipedCard );

            // Store the updated disliked cards array back into AsyncStorage
            await AsyncStorage.setItem( 'disLikedCards', JSON.stringify( disliked ) );

        } catch ( error )
        {
            console.log( 'Error storing disliked cards:', error );
        }
    };

    // const sendLikesAndDislikes = async () =>
    // {

    //     try
    //     {
    //         let result = [];

    //         const storeddisLikedCards = await AsyncStorage.getItem( 'disLikedCards' );
    //         console.log( storeddisLikedCards );
    //         const disliked = storeddisLikedCards ? JSON.parse( storeddisLikedCards.replace( /\r?\n|\r/g, '' ) ) : [];

    //         const storedLikedCards = await AsyncStorage.getItem( 'likedCards' );
    //         const likedCardsArray = storedLikedCards ? JSON.parse( storedLikedCards.replace( /\r?\n|\r/g, '' ) ) : [];

    //         const Segregated_movies = [ ...disliked, ...likedCardsArray ].map( item => ( {
    //             title: item.title,
    //             liked: likedCardsArray.includes( item )
    //         } ) );
    //         console.log( "sending data to get recs" );

    //         result = await getRecsBasedOnLikesPOST( Segregated_movies );

    //         console.log( "got the recs" );
    //         console.log( "number of movies in stakc ", movies.length );
    //         const storedMovieRecs = await AsyncStorage.getItem( 'recommendations_shadow' );
    //         const storedMovieRecs_array = storedMovieRecs ? JSON.parse( storedMovieRecs.replace( /\r?\n|\r/g, '' ) ) : [];
    //         const concated_array = storedMovieRecs_array.concat( result );
    //         await AsyncStorage.setItem( 'recommendations_shadow', JSON.stringify( concated_array ) );

    //         if ( movies.length === 0 )
    //         {
    //             setLoading( true );
    //             setTrigger( true );
    //             await AsyncStorage.setItem( 'recommendations', '' );
    //             await AsyncStorage.setItem( 'recommendations', JSON.stringify( concated_array ) );
    //             await AsyncStorage.setItem( 'recommendations_shadow', JSON.stringify( [] ) );

    //             setMovies( JSON.parse( concated_array.replace( /\r?\n|\r/g, '' ) ) );

    //         }

    //         console.log( 'Movies:', result );
    //     } catch ( error )
    //     {
    //         console.error( 'Error fetching likes and dislikes:', error );
    //     }
    // };

    return (
        <View className=''>
            { loading ? ( <ActivityIndicator size="large" color="#0000ff" />
            ) : movies.length === 0 ? (
                <Text>No recommendations available</Text>
            ) : (
                <Swiper
                    cards={ movies }
                    renderCard={ ( card ) => (
                        <View style={ styles.card }>
                            <Image source={ { uri: "https://image.tmdb.org/t/p/original" + card.backdrop_path } } style={ styles.image }
                                resizeMode='cover' />
                            <View className='bg-green-500 rounded-t-xl  p-2  flex-row justify-center items-center'>
                                <Text className='text-white font-semibold text-lg'>{ card.similarity_score.toFixed( 2 ) * 100 }%</Text>
                            </View>
                            <View className='absolute bottom-0 left-0 right-0  p-8 '>
                                <Text className='text-5xl text-white font-extrabold'>{ card.title }</Text>
                                <View className='flex-row justify-between w-full'>
                                    <Text className='text-3xl text-white '>{ card.release_year }

                                    </Text>
                                    <Text className='text-3xl text-white '>
                                        { card.duration }
                                    </Text>
                                </View>

                                <Text className='text-2xl text-white '>{ card.vote_average.toFixed( 1 ) }/10.0</Text>



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
                    onSwipedLeft={ ( cardIndex ) => handleSwipedLeft( cardIndex ) }
                    onSwipedRight={ ( cardIndex ) => handleSwipedRight( cardIndex ) }
                    verticalSwipe={ false }
                // onSwipedAll={ () => sendLikesAndDislikes() }
                /> ) }
        </View>
    );
};



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
        // backgroundColor: '#f08080',
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