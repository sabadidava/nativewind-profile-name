import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const CustomTextInput = ({ placeholder, value, onChangeText }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(value.length > 0);

  return (
    <View style={styles.inputContainer}>
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
        className='bg-background_components-default '
        placeholderTextColor='red'
      />
      {(isFocused || value.length > 0) && (
        <Text style={styles.placeholder}>{placeholder}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    // backgroundColor: 'red',
  },
  filled: {
    paddingTop: 18, // Adjusts the padding when the placeholder is "moved" to the top
  },
  placeholder: {
    position: 'absolute',
    left: 10,
    // top: -12,
    fontSize: 12,
    color: 'green',
  },
});

export default CustomTextInput;
