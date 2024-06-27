import { Stack } from "expo-router"

const AuthStack = () => {
    console.log('authLayout');
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="register/[id]" options={{ headerShown: false }} />
        </Stack>
    )
}

export default AuthStack;