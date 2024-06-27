import { Stack } from 'expo-router';

const AdminLayout = () => {
    console.log('adminLayout')
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="adminCamera/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="adminHome/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="adminLogin/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="branchHome/[id]" options={{ headerShown: false }} />
        </Stack>
    )
}

export default AdminLayout;