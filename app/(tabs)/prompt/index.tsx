/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button, FlatList, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useChat } from "@nlxai/chat-react";
import { useRouter } from 'expo-router';
import { getRecsBasedOnLikesPOST } from '~/api/routes';
const Prompt = () =>
{
    const [ inputText, setInputText ] = useState( '' );
    // const [ storedText, setStoredText ] = useState( '' );
    const router = useRouter();

    const handleButtonClick = async () =>
    {
        // setStoredText( inputText );
        try
        {
            const result = await getRecsBasedOnLikesPOST( inputText );
            console.log( 'API Response:', result );
        } catch ( error )
        {

            console.error( 'Error:', error );
        }
    };

    return (
        <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>

            <SafeAreaView className='bg-[#ffeff1] h-full flex justify-center items-center ' >
                <KeyboardAvoidingView behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
                    style={ styles.container }>
                    <View>
                        <Text className='self-start text-5xl font-extrabold' >
                            What do you feel like watching today?
                        </Text>
                        <TextInput
                            style={ styles.input }
                            placeholder="Type something..."
                            value={ inputText }
                            onChangeText={ setInputText }
                        />
                        <Button title="Save" onPress={ handleButtonClick } />
                        {/* { storedText ? <Text style={ styles.storedText }>Stored: { storedText }</Text> : null } */}
                    </View>
                </KeyboardAvoidingView>
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