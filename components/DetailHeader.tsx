
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DetailHeader() {
    const insets = useSafeAreaInsets();
    const router = useRouter()
    return (
        <View className='absolute left-0 top-0 right-0 flex-row w-full h-20 px-5 py-5 justify-between item-center z-10'
                        style={{ top: insets.top }}
                    >
            <Pressable onPress={() => router.back()}>
                <Feather name="arrow-left" size={26} color="#FFF" />
            </Pressable>
            <View className='flex-row gap-10 justify-between item-center'>
                <Octicons name="device-camera-video" size={26} color="#FFF" />
                <FontAwesome name="share" size={26} color="#FFF" />
            </View>
        </View>
    );
}