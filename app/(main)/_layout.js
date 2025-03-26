import { TouchableOpacity, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { themes } from '@/constants/tailwind-colors';
import ProfileInfo from '../ProfileInfo.js';

export default function Main() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <View style={[themes[colorScheme], { flex: 1 }]}>
      <View className='flex-1 justify-center bg-additional-white_inverted'>
        <TouchableOpacity
          onPress={() => {
            setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
          }}
        >
          <Text className='text-label '>Switch Color {colorScheme}</Text>
        </TouchableOpacity>
        <ProfileInfo />
      </View>
    </View>
  );
}
