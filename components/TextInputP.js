import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

import { useColorScheme } from 'nativewind';

const CustomTextInput = ({ placeholder, value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);
  const { colorScheme, setColorScheme } = useColorScheme();
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(value.length > 0);

  return (
    <View className='mb-3.5 ' style={styles.inputContainer}>
      <TextInput
        style={[
          styles.input,
          isFocused || value.length > 0 ? styles.filled : null,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={isFocused || value.length > 0 ? '' : placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className='bg-background_components-default h-[56] rounded-md px-4 text-base font-normal text-text_icons-primary '
        placeholderTextColor={colorScheme === 'dark' ? '#FFFFFF' : '#030712'}
      />
      {(isFocused || value.length > 0) && (
        <Text
          className='absolute left-4  text-text_icons-secondary text-xs top-2.5 '
          style={styles.placeholder}
        >
          {placeholder}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  filled: {
    paddingTop: 30,
  },
});

export default CustomTextInput;
