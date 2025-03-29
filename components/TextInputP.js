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
        className='bg-background_components-default h-[56] rounded-md px-4 text-sm font-normal text-text_icons-primary '
        placeholderTextColor={colorScheme === 'dark' ? '#FFFFFF' : '#030712'}
      />
      {(isFocused || value.length > 0) && (
        <Text
          className='absolute left-4  text-text_icons-secondary text-xs top-2.5'
          style={styles.placeholder}
        >
          {placeholder}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    // marginBottom: 20,
  },
  input: {
    // height: 50,
    // borderColor: '#ccc',
    // borderWidth: 1,
    // borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    // backgroundColor: 'red',
    // color: 'red',
  },
  filled: {
    paddingTop: 30, // Adjusts the padding when the placeholder is "moved" to the top
  },
  placeholder: {
    // position: 'absolute',
    // left: 10,
    // top: 12,
    fontSize: 12,
    // color: 'green',
  },
});

export default CustomTextInput;
