import { useEffect, useState } from 'react';
import { View, TextInput as RNTextInput, TextInputProps } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const TextInput = ({ placeholder, className, onChangeText, ...props }) => {
  const placeholderAnimation = useSharedValue(1);
  const [internalValue, setInternalValue] = useState('');

  useEffect(() => {
    onChangeText?.(internalValue);
  }, [internalValue]);

  const placeholderAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: placeholderAnimation.value },
      {
        translateY: interpolate(placeholderAnimation.value, [0.8, 1], [0, 18]),
      },
    ],
    marginLeft: 14,
    position: 'absolute',
  }));

  return (
    <View className={className}>
      <RNTextInput
        {...props}
        value={internalValue}
        onChangeText={setInternalValue}
        onFocus={() => {
          placeholderAnimation.value = withTiming(0.8);
        }}
        onBlur={() => {
          if (!internalValue) placeholderAnimation.value = withTiming(1);
        }}
        className='h-[48] rounded-md p-[10]'
      />
      <Animated.Text
        style={placeholderAnimatedStyle}
        className='text-text_icons-primary'
      >
        {placeholder}
      </Animated.Text>
    </View>
  );
};

export default TextInput;
