import { Tabs } from "expo-router";

const TabsLayout = () => {
    console.log('tabs');
    return (
        <Tabs initialRouteName="home/[id]" screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="home/[id]" options={{ headerShown: false }} />
            <Tabs.Screen name="profile/[id]" options={{ headerShown: false }} />
            <Tabs.Screen name="brands/[id]" options={{ headerShown: false }} />
            <Tabs.Screen name="qrCode/[id]" options={{ headerShown: false }} />
        </Tabs>
    )
};

export default TabsLayout;