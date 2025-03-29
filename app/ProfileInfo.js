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

  // const handleCloseModalPress = useCallback(() => {
  //   bottomSheetModalRef.current?.close();
  // }, []);

  return (
    <GestureHandlerRootView>
      <TouchableWithoutFeedback onPress={handleTouchablePress}>
        <View className=' px-[20]'>
          <Text className='mb-[12] text-[32px] font-semibold text-text_icons-primary'>
            Profile info
          </Text>

          <CustomTextInput
            placeholder='Full name'
            value={inputValue}
            onChangeText={handleChangeText}
          />
          <CustomTextInput
            placeholder='Position'
            value={inputValue}
            onChangeText={handleChangeText}
          />
          <TouchableOpacity
            className={`text-base text-gray-700 rounded-md h-[48]  ${
              isSheetOpen ? 'border-primary-base' : 'opacity-0'
            }`}
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
