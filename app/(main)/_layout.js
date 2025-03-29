import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { useColorScheme } from 'nativewind';
import { themes } from '@/constants/tailwind-colors';
import ProfileInfo from '../ProfileInfo.js';

export default function Main() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <View style={[themes[colorScheme]]} className='flex-1 '>
      <View className='flex-1 bg-additional-white_inverted'>
        <ProfileInfo />
        <TouchableOpacity
          style={styles.darkModeButton}
          onPress={() => {
            setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
          }}
        >
          <Image
            className='h-6 w-6 '
            source={require('../../assets/images/NightModeIcon.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  darkModeButton: {
    bottom: 200,
    position: 'absolute',
    alignSelf: 'center',
  },
});
