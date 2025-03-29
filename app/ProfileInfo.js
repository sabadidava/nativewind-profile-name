import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomTextInput from '../components/TextInputP';
import BottomSheetModal from '../components/BottomSheet';

const ProfileInfo = () => {
  const bottomSheetModalRef = useRef(null);
  const [selectedSex, setSelectedSex] = useState();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputValuePosition, setInputValuePosition] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleChangeText = (newText) => {
    if (isMounted) {
      setInputValue(newText);
    }
  };

  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.handleOpenModalPress();
  }, []);

  return (
    <GestureHandlerRootView>
      <TouchableWithoutFeedback onPress={handleTouchablePress}>
        <View className='flex-1 px-[20]'>
          <Text className='mb-[12] text-[32px] mt-[61] font-semibold text-text_icons-primary '>
            Profile info
          </Text>

          <CustomTextInput
            placeholder='Full name'
            value={inputValue}
            onChangeText={handleChangeText}
          />
          <CustomTextInput
            placeholder='Position'
            value={inputValuePosition}
            onChangeText={setInputValuePosition}
          />
          <TouchableOpacity
            onPress={() => {
              setIsSheetOpen(true);
              handlePresentModalPress();
            }}
          >
            <View className='flex-row px-3 items-center h-[48] rounded-md justify-between bg-background_components-default'>
              <Text className='color-text_icons-primary'>{selectedSex}</Text>

              <Image
                source={require('@/assets/images/icons-frame.png')}
                className='w-6 h-6 ml-2'
                resizeMode='contain'
              />
            </View>
            {isSheetOpen && (
              <View
                pointerEvents='none'
                className='absolute h-full w-full border border-primary-base rounded-md'
              />
            )}
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        {...{ selectedSex, setSelectedSex, setIsSheetOpen }}
      />
    </GestureHandlerRootView>
  );
};

export default ProfileInfo;
