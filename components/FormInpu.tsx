import { Text, TextInput, View } from 'react-native';

interface FormInputProps {
    label: string,
    value: string,
    placeholder: string,
    emitChange: (text: string) => void,
    isPwd?: boolean
}
export default function FormInput({label, value, placeholder, emitChange, isPwd=false} : FormInputProps) {
    return (
        <View className='gap-y-2'>
            <Text>{label}</Text>
            <TextInput value={value} onChangeText={(text)=>{emitChange(text)}}
                secureTextEntry={isPwd}
                style={{
                    backgroundColor: '#e2e2e3', borderRadius: 8, padding: 8, color: '#111111',
                    height: 48,
                }}
                placeholderTextColor="#a1a1aa"
                placeholder={placeholder} />
        </View>
    );
}