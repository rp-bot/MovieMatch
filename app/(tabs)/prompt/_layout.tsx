/* eslint-disable prettier/prettier */
import { Stack } from "expo-router";
import React from "react";


const PromptLayout = () =>
{
    return (
        <Stack>
            <Stack.Screen name="index" options={ { headerTitle: "Prompt", headerShown: false } } />
        </Stack>
    );
};

export default PromptLayout;
