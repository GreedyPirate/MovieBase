import { images } from '@/constants/images';
import { uploadImage } from '@/hooks/useImageBed';
import { userStore } from '@/stores/userInfoStore';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
    Bell,
    Camera,
    ChevronRight,
    CircleX,
    CreditCard,
    Edit2,
    HelpCircle,
    ImageIcon,
    LogOut,
    Package,
    Shield
} from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface InfoCardProps {
    value: string,
    title: string
    isLast?: boolean
}
function InfoCard({ value, title, isLast }: InfoCardProps) {
    return (
        <>
            <View className='items-center'>
                <Text className="text-white text-base">{value}</Text>
                <Text className="text-gray-400 text-lg">{title}</Text>
            </View>
            {
                !isLast && (
                    <View style={isLast ? {} : {
                        borderRightWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#rgba(255, 255, 255, 0.1)',
                    }}>
                    </View>
                )
            }
        </>
    )
}

interface ItemButtonProps {
    title: string,
    icon: () => React.ReactNode,
    isLast?: boolean, 
    routerPath?: string,
    onPress?: () => void 
}

function ItemButton({ title, icon, isLast, routerPath, onPress}: ItemButtonProps) {
    const [isPressed, setIsPressed] = useState(false);
    const router = useRouter();
    const pressedStyle = () => {
        let style: ViewStyle = {
            backgroundColor: '#rgba(26,24,40,0.1)',
        }
        if (!isLast) {
            style = {
                ...style,
                borderStyle: 'solid',
                borderBottomWidth: 1,
                borderColor: '#2D2A42rgba(45,42,66,0.5)',
            }
        }
        if (isPressed) {
            style.backgroundColor = '#2D2A42';
            style.overflow = 'hidden';
        }
        return style;
    };
    return (
        <>
            <Pressable
                onPress={() => { 
                    onPress && onPress();
                    routerPath && router.push(routerPath as any) 
                }}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                className='flex-row items-center justify-between p-4'
                style={pressedStyle()}
            >
                <View className='flex-row items-center gap-x-4'>
                    {icon()}
                    <Text className='text-lg text-gray-300'>{title}</Text>
                </View>
                <ChevronRight size={20} color="#d1d5dc" />
            </Pressable>
        </>
    )
}
export default function Profile() {
    const [isPressed, setIsPressed] = useState(false)
    const insets = useSafeAreaInsets()

    let iconSize = 20
    const iconColor = '#d1d5dc'
    const logout = function () {
        userStore.clear()
    }
    const funcItemList = [
        {
            title: 'Notifications',
            icon: () => <Bell color={iconColor} size={iconSize} />
        },
        {
            title: 'Privacy Settings',
            icon: () => <Shield color={iconColor} size={iconSize} />
        },
        {
            title: 'Payment Methods',
            icon: () => <CreditCard color={iconColor} size={iconSize} />
        },
        {
            title: 'Order History',
            icon: () => <Package color={iconColor} size={iconSize} />
        },
        {
            title: 'Help & Support',
            icon: () => <HelpCircle color={iconColor} size={iconSize} />
        },
        {
            title: 'Logout',
            icon: () => <LogOut color='red' size={iconSize} />,
            onPress: () => { 
                logout();
            },
            routerPath: '/login'
        }
    ]

    const { showActionSheetWithOptions } = useActionSheet();
    iconSize = 25
    const icons = {
        photo: <ImageIcon color={iconColor} size={iconSize} />,
        camera: <Camera color={iconColor} size={iconSize} />,
        cancel: <CircleX color={iconColor} size={iconSize} />
    }



    const [pickedimage, setPickedImage] = useState<string | null>(null);
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission required', 'Permission to access the media library is required.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'], // 'videos'
            // shape: 'oval',
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
            exif: false
        });

        console.log(result);

        if (!result.canceled) {
            const uploadResp = await uploadImage(result);
            console.log('uploadResp', uploadResp);
            setPickedImage(uploadResp.links.url);
        }
    };

    const tackPhoto = async () => {

    };

    const handleEditAvatar = () => {
        showActionSheetWithOptions(
            {
                options: ['Photo', 'Camera', 'Cancel'],
                cancelButtonIndex: 2,
                cancelButtonTintColor: 'rgba(211, 49, 49, 0.8)',
                icons: [icons.camera, icons.photo, icons.cancel],
            },
            (buttonIndex?: number) => {
                if (buttonIndex === 0) {
                    pickImage()
                } else if (buttonIndex === 1) {
                    tackPhoto()
                }
            },
        );
    };

    const handleEditProfile = () => {
    }


    return (
        <View className="flex-1 px-8 bg-dark-200" style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 60 }}>
            <Text className="text-white text-3xl">我的</Text>
            <ScrollView showsVerticalScrollIndicator={false} >

                <View className='bg-dark-120 mt-8 p-6 rounded-2xl items-center justify-center'>
                    <View className='relative'>
                        <Image source={images.defaultAvatar} className='size-20 rounded-full' />
                        <Pressable
                            onPress={handleEditAvatar}
                        >
                            <Camera size={25} color="#d1d5dc" style={{
                                position: 'absolute', right: -5, bottom: -5,
                            }} />
                        </Pressable>
                    </View>
                    <View className='mt-5 items-center'>
                        <Text className="text-white text-xl">Jaynnay</Text>
                        <Text className="text-gray-400 text-base">jay@outlook.com</Text>
                    </View>
                    <View className='flex-row item-center gap-x-6 mt-6'>
                        <InfoCard title="Orders" value="28" />
                        <InfoCard title="Spent" value="$2.4k" />
                        <InfoCard title="Tier" value="Gold" isLast />
                    </View>
                    <Pressable className='mt-5 w-full' onPress={handleEditProfile} onPressIn={() => setIsPressed(true)}
                        onPressOut={() => setIsPressed(false)}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={isPressed ? ['#8200db', '#c6005c'] : ['#a855f7', '#ec4899']}
                            style={{
                                width: '100%', height: 40, borderRadius: 6,
                                flexDirection: 'row',
                                justifyContent: 'center', alignItems: 'center',
                                marginBottom: 16, gap: 10,
                                borderStyle: 'solid',
                                borderWidth: 1,
                                borderColor: 'rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <Edit2 color="white" size={18} />
                            <Text className='text-white text-base'>Edit Profile</Text>
                        </LinearGradient>
                    </Pressable>
                </View>
                <View className="bg-dark-120 mt-8 rounded-2xl overflow-hidden">
                    {
                        funcItemList.map((item, index) => (
                            <ItemButton key={index.toString()} title={item.title} 
                            routerPath={item.routerPath}
                            icon={item.icon} isLast={index === funcItemList.length - 1}/>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    );
}