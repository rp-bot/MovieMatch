/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";
import React from "react";


const Homelayout = () =>
{
    return (
        <Stack>
            <Stack.Screen name="index" options={ { headerTitle: "Home", headerShown: false } } />
        </Stack>
    );
};

export default Homelayout;
