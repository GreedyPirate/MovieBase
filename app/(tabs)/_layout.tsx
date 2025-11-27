import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import React from 'react'; // 确保 React 显式导入
import { StyleSheet, Text, View } from 'react-native';

const iconSize = 20;
const INACTIVE_COLOR = '#8A87A6'; 
const ACTIVE_COLOR = '#FFFFFF';   
const DARK_BACKGROUND = '#0F0D23'; 

type IconFunc = (color: string) => React.ReactNode;

interface TabListItem {
    name: string;
    icon: (color: string) => React.ReactNode;
    title: string;
}

interface TabBarIconProps {
    focused: boolean;
    icon: (color: string) => React.ReactNode; 
    title: string;
}
// --- TabBarIcon 组件实现 ---
function TabBarIcon({ focused, icon, title }: TabBarIconProps) {
    if (focused) {
        return (
            <LinearGradient
                colors={['#D3C4F3', '#A685E6']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.activeContainer}
            >
                {icon(ACTIVE_COLOR)}
                <Text style={styles.activeTitle}>{title}</Text>
            </LinearGradient>
        );
    }
    return (
        <View style={styles.inactiveContainer}>
            {icon(INACTIVE_COLOR)}
        </View>
    );
}

// --- Tab 列表配置 ---
const tabList = [
    { name: "index", icon: (color: string) => <Feather name="home" size={iconSize} color={color} />, title: "首页" },
    { name: "saved", icon: (color: string) => <Feather name="bookmark" size={iconSize} color={color} />, title: "收藏" },
    { name: "profile", icon: (color: string) => <Feather name="user" size={iconSize} color={color} />, title: "我的" },
];

// --- Tabs 布局组件 ---
export default function TabLayout() {
    const totalTabs = tabList.length;

    return (
        <Tabs
            screenListeners={{
                 tabPress: () => {
                    Haptics.impactAsync(
                        Haptics.ImpactFeedbackStyle.Light
                    )
                },
            }}
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: DARK_BACKGROUND,
                    borderRadius: 50,
                    marginHorizontal: 15,
                    marginBottom: 25,
                    height: 52,
                    position: "absolute",
                    // 启用裁剪，让内部的圆角渐变容器在外部圆角处被裁剪
                    // overflow: "hidden",
                    paddingTop: 7,
                    alignItems: "center",
                    // expo-router 的 Tabs 组件默认带有边框样式 即使未显式设置 border，系统仍会渲染默认边框
                    borderColor: 'transparent',
                },

            }}
        >
            {tabList.map((item, index) => (
                <Tabs.Screen
                    name={item.name}
                    key={item.name}
                    listeners={{

                    }}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabBarIcon focused={focused} icon={item.icon as IconFunc} title={item.title} />
                        ),
                        tabBarBackground() {
                            return (
                                <View style={{ flex: 1 }} />
                            );
                        },
                    }}
                />
            ))}
        </Tabs>
    );
}

// --- 样式定义 ---
const styles = StyleSheet.create({
    // 激活时的容器样式，使用 flex: 1 填充整个 TabBarItem
    activeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        // 高度设置为 100% 以确保填满 TabBarItem 容器
        width: 120,
        height: 52,
        // 核心：设置大圆角，以便在 TabBarItem 容器内呈现药丸形状
        borderRadius: 50, 
    },
    activeTitle: {
        color: ACTIVE_COLOR,
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 6, // 图标和文字之间的间距
    },
    // 未激活时的容器样式，只用于居中图标
    inactiveContainer: {
        width: 120,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },
});