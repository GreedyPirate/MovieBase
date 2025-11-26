import FormInput from '@/components/FormInpu';
import SignHeader from '@/components/SignHeader';
import SocialLink from '@/components/SocialLink';
import { userStore } from '@/stores/userInfoStore';
import { superbase } from '@/utils/superbaseClient';
import { Checkbox } from 'expo-checkbox';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
export default function Index() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [repassword, setRePassword] = useState('');
    const [isPressed, setIsPressed] = useState(false);
    const [isAgree, setIsAgree] = useState(false);
    const router = useRouter();
    const handleSignUp = async () => { 
        const resp = await superbase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username,
                },
                emailRedirectTo: 'moviebase://auth/repassword',
            }
        })
        if(resp.error) throw resp.error;
        const user = resp.data.user;
        if (user) {
            userStore.setUserInfo(user);
            router.push("/");
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView>
                <View className='flex-1 bg-white'>
                    <SignHeader title='Create Your Account' subtitle='Get started in seconds'/>
                    
                    <View className='flex-1 px-8 py-8 gap-y-4'>
                        <FormInput label="Full Name" value={username} placeholder="Enter your full name" emitChange={(text)=>{setUsername(text)}}/>
                        <FormInput label="Email" value={email} placeholder="Enter your email" emitChange={(text)=>{setEmail(text)}}/>
                        <FormInput label="Password" isPwd value={password} placeholder="Enter your password" emitChange={(text)=>{setPassword(text)}}/>
                        <FormInput label="Confirm Password" isPwd value={repassword} placeholder="re-enter your password" emitChange={(text)=>{setRePassword(text)}}/>

                        <View className='flex-row gap-x-2 items-center'>
                            <Checkbox color={isAgree ? '#000' : undefined} value={isAgree} onValueChange={(check) => setIsAgree(check)} />
                            <Text>I agree to the Terms of Service and Privacy Policy</Text>
                        </View>
                        
                        <Pressable className='mt-3' onPress={handleSignUp} onPressIn={() => setIsPressed(true)}    
                                onPressOut={() => setIsPressed(false)}>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                colors={isPressed ? ['#8200db', '#c6005c'] : ['#a855f7', '#ec4899']}
                                style={{ 
                                    width: '100%', height: 48,  borderRadius: 6, 
                                    justifyContent: 'center', alignItems: 'center',
                                    marginBottom: 16,
                                }}
                                >
                                <Text className='text-white text-lg'>Sign Up</Text>
                            </LinearGradient>
                        </Pressable>
                        
                        <View className='flex-row items-center justify-center gap-x-5'>
                            <View className='flex-1 h-1' style={{
                                borderBottomWidth: 1,
                                borderStyle: 'solid',
                                borderColor: '#e5e7eb',
                            }}></View>
                            <Text className='text-gray-500'>Or sign up with</Text>
                            <View className='flex-1 h-1' style={{
                                borderBottomWidth: 1,
                                borderStyle: 'solid',
                                borderColor: '#e5e7eb',
                            }}></View>
                        </View>

                        <View className='flex-1 flex-row justify-center gap-x-4'>
                            <SocialLink> 
                                <Svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <Path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <Path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <Path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <Path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </Svg>
                            </SocialLink>
                            <SocialLink>
                                <Svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                                    <Path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </Svg>
                            </SocialLink>
                            <SocialLink>
                                <Svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <Path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                                </Svg>
                            </SocialLink>
                        </View>

                        <View className="flex-1 flex-row justify-center items-center gap-x-2 mt-5">
                            <Text >Already have an account? </Text>
                            <Pressable onPress={() => {
                                router.replace('/login');
                            }}> 
                                <Text className="text-purple-600">Sign in</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}