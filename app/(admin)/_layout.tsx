import { Stack } from "expo-router";

const AdminLayout = () => {
    return (
        <Stack initialRouteName="adminLogin" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="adminLogin" options={{ headerShown: false }} />
            <Stack.Screen name="adminHome" options={{ headerShown: false }} />
            <Stack.Screen name="branchHome" options={{ headerShown: false }} />
            <Stack.Screen name="adminCamera" options={{ headerShown: false }} />
        </Stack>
    );
};

export default AdminLayout;
