import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Tabs } from 'expo-router';
import { Image, ImageBackground, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TabBarIconProps {
    focused: boolean;
    icon: any;
    title: string;
}
function TabBarIcon({ focused, icon, title }: TabBarIconProps) {
    if (focused) {
        return (
            <ImageBackground source={images.highlight}
                className='w-full min-w-[127px] min-h-16 mt-4 flex flex-row items-center justify-center rounded-full overflow-hidden'>
                <Image source={icon} tintColor="#151312" className='size-5' />
                <Text className='ml-2'>{title}</Text>
            </ImageBackground>

        )
    }
    return (
            <View className="size-full justify-center items-center mt-4 rounded-full">
                <Image source={icon} tintColor="#A8B5DB" className="size-5" />
            </View>
    )
}
export default function RootLayout() {
    const insets = useSafeAreaInsets();
    return <Tabs screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
            // width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            // paddingBottom: 0,
            // height: 49 + insets.bottom, // 默认 49 + 底部安全区
        },
        tabBarStyle: {
            backgroundColor: "#0F0D23",
            borderRadius: 50,
            marginHorizontal: 15,
            marginBottom: 36,
            height: 52,
            position: "absolute",
            overflow: "hidden",
            borderWidth: 5,
            borderColor: "#0F0D23",
        },
    }}>
        <Tabs.Screen name="index" options={{
            // tabBarStyle: {
            //     // 关键：让 TabBar 延伸到安全区域外
            //     paddingBottom: 0,
            //     height: 49 + insets.bottom, // 默认 49 + 底部安全区
            // },
            // title: "首页",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} icon={icons.home} title="首页" />
            ),
        }} />
        {/* <Tabs.Screen name="search" options={{
            // tabBarStyle: {
            //     // 关键：让 TabBar 延伸到安全区域外
            //     paddingBottom: 0,
            //     height: 49 + insets.bottom, // 默认 49 + 底部安全区
            // },
            // title: "搜索",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} icon={icons.search} title="搜索" />
            ),
        }} /> */}
        <Tabs.Screen name="saved" options={{
            // tabBarStyle: {
            //     // 关键：让 TabBar 延伸到安全区域外
            //     paddingBottom: 0,
            //     height: 49 + insets.bottom, // 默认 49 + 底部安全区
            // },
            // title: "收藏",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} icon={icons.save} title="收藏" />
            ),
        }} />
        <Tabs.Screen name="profile" options={{
            // tabBarStyle: {
            //     // 关键：让 TabBar 延伸到安全区域外
            //     paddingBottom: 0,
            //     height: 49 + insets.bottom, // 默认 49 + 底部安全区
            // },
            // title: "我的",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} icon={icons.person} title="我的" />
            ),
        }} />
    </Tabs>
}