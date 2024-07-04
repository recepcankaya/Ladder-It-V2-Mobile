import { Tabs } from "expo-router";

const TabsLayout = () => {
    console.log('tabsLayout');
    return (
        <Tabs initialRouteName="home" screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="home" options={{ headerShown: false }} />
            <Tabs.Screen name="brands" options={{ headerShown: false }} />
            <Tabs.Screen name="profile" options={{ headerShown: false }} />
            <Tabs.Screen name="qrCode" options={{ headerShown: false }} />
        </Tabs>
    );
};

export default TabsLayout;
