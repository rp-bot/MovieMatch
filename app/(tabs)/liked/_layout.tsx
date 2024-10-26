/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";
import React from "react";


const Likedlayout = () =>
{
    return (
        <Stack>
            <Stack.Screen name="index" options={ { headerTitle: "Liked", headerShown: false } } />
        </Stack>
    );
};

export default Likedlayout;
