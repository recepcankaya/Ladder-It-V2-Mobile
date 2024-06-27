import { Stack } from "expo-router";

const RootLayout = () => {
    console.log('heree');
    return (
        <Stack initialRouteName="(auth)" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(admin)" options={{ headerShown: false }} />
        </Stack>
    );
};

export default RootLayout;