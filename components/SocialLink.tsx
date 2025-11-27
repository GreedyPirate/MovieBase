import { useState } from 'react';
import { Pressable, View } from 'react-native';

export interface SocialLinkProps {
    children: React.ReactNode,
    loginCallback?: () => void;
}
export default function SocialLink({children, loginCallback}:SocialLinkProps) {
    const [isPressed, setIsPressed] = useState(false);
    return (
        <View className='flex-1'>
            <Pressable className="h-12"
                onPress={loginCallback}
                onPressIn={()=>{setIsPressed(true)}}
                onPressOut={()=>{setIsPressed(false)}}
                style={{
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: '#e5e7eb',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isPressed ? '#f0f0f0' : '#FFF'
                }}>
                <View className="flex-1 w-5 h-5">
                    {children}
                </View>
            </Pressable>
        </View>
    );
}