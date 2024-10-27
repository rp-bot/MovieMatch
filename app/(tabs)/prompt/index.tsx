/* eslint-disable prettier/prettier */
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button, FlatList, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { getRecsOffFreePOST } from '~/api/routes';
const Prompt = () =>
{
    const [ inputText, setInputText ] = useState( '' );
    const [ storedText, setStoredText ] = useState( '' );
    const [ inputHeight, setInputHeight ] = useState( 40 );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ convos, setConvos ] = useState( [] );

    const deleteData = async () =>
    {
        console.log( "emptying data" );
        await AsyncStorage.setItem( 'recommendations', '' );
        await AsyncStorage.setItem( 'likedCards', '' );
        await AsyncStorage.setItem( 'disLikedCards', '' );
        setConvos( [] );
    };

    const handleConvoClick = ( convo ) =>
    {
        console.log( convo );
        setInputText( convo );
    };

    const handleButtonClick = async () =>
    {
        if ( isLoading ) return; // Prevent multiple submissions
        setIsLoading( true );
        try
        {
            setInputText( '' );
            setConvos( prevArray => [ ...prevArray, inputText ] );
            console.log( inputText );
            const result = await getRecsOffFreePOST( inputText );
            const { recommendations } = result;
            await AsyncStorage.setItem( 'recommendations', JSON.stringify( recommendations ) );
            console.log( 'Recommendations saved to AsyncStorage' );
            // console.log( 'API Response:', recommendations );
            router.push( '/home' );
        } catch ( error )
        {
            console.error( 'Error:', error );
        } finally
        {
            setIsLoading( false );
        }
    };

    return (
        <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>

            <SafeAreaView className='bg-[#ffeff1] h-full flex justify-center items-center ' >
                <KeyboardAvoidingView behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
                    style={ styles.container }>
                    <View className='flex-col justify-center items-center gap-10'>
                        <Text className='flex-0 self-start text-5xl font-extrabold' >
                            What do you feel like watching today?
                        </Text>
                        <View className='flex-row items-center space-x-2 justify-center gap-2'>
                            <TextInput
                                className='flex-1 border border-gray-300 rounded-lg p-2 pt-3'
                                placeholder="Talk to me"
                                value={ inputText }
                                onChangeText={ setInputText }
                                multiline
                                onContentSizeChange={ ( event ) => setInputHeight( event.nativeEvent.contentSize.height ) }
                                style={ { height: Math.max( 40, inputHeight ) } }
                            />
                            <Pressable onPress={ handleButtonClick } className="p-2 bg-zinc-950 rounded-full " disabled={ isLoading }>
                                { isLoading ? (
                                    <ActivityIndicator size="small" color="white" />
                                ) : (
                                    <Feather name="arrow-up" size={ 20 } color="white" />
                                ) }
                            </Pressable>
                            {/* { storedText ? <Text style={ styles.storedText }>Stored: { storedText }</Text> : null } */ }
                        </View>

                    </View>

                </KeyboardAvoidingView>
                <ScrollView className='border border-[#fae4e7] border- w-full '>
                    <View className='p-4 '>
                        <View className='flex-row justify-between items-center'>
                            <Text className='text-2xl font-semibold'>
                                Conversations:
                            </Text>
                            <Pressable onPress={ deleteData } className="p-2 bg-red-500 rounded-full " disabled={ isLoading }>
                                { isLoading ? (
                                    <ActivityIndicator size="small" color="white" />
                                ) : (
                                    <Feather name="trash-2" size={ 20 } color="white" />
                                ) }
                            </Pressable>
                        </View>

                        { convos.map( ( convo, index ) => (
                            <Pressable onPress={ () => handleConvoClick( convo ) } className="p-2 rounded-full " key={ index }>
                                <Text className=' h-8 overflow-ellipsis'>
                                    { convo }
                                </Text>
                            </Pressable>
                        ) ) }
                    </View>

                </ScrollView>

            </SafeAreaView>
        </TouchableWithoutFeedback>

    );
};
const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    storedText: {
        marginTop: 16,
        fontSize: 16,
    },
} );
export default Prompt;