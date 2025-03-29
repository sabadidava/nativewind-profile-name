import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import CustomTextInput from '../components/TextInputP';

const ProfileInfo = () => {
  const bottomSheetModalRef = useRef(null);
  const [selectedSex, setSelectedSex] = useState();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isMounted, setIsMounted] = useState(false); // флаг для отслеживания монтирования компонента

  // Функция для отслеживания монтирования компонента
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false); // при размонтировании компонента сбрасываем флаг
  }, []);

  // Функция для обновления состояния
  const handleChangeText = (newText) => {
    if (isMounted) {
      setInputValue(newText); // обновляем состояние только если компонент смонтирован
    }
  };

  const handleTouchablePress = () => {
    Keyboard.dismiss(); // Закрываем клавиатуру
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.expand();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    setIsSheetOpen(index !== -1);
  }, []);

  return (
    <GestureHandlerRootView className='flex-1'>
      <TouchableWithoutFeedback onPress={handleTouchablePress}>
        <View className='flex-1 px-[20]'>
          <Text className='mb-[12] mt-[114] text-[32px] font-semibold text-text_icons-primary'>
            Profile info
          </Text>

          <CustomTextInput
            placeholder='Full name'
            value={inputValue} // передаем текущее значение состояния
            onChangeText={handleChangeText} // передаем функцию для обновления состояния
            // className='bg-black'
          />

          {/* Остальные инпуты с NativeWind стилями */}
          <TextInput
            className='h-[56] rounded-md pl-3 bg-background_components-default'
            placeholder='Full'
          />

          <TextInput
            className='mt-[12] h-[56] rounded-md pl-3 bg-background_components-default '
            placeholder='Name'
          />

          <View
            className={`flex-row items-center mt-[12] h-[48] rounded-md p-[10] bg-background_components-default ${
              isSheetOpen ? 'border-primary-base border-[1px]' : ''
            } `}
          >
            <TouchableOpacity
              className='flex-1 text-base text-gray-700'
              onPress={() => {
                setIsSheetOpen(true); // Добавляем изменение состояния
                handlePresentModalPress(); // Открываем BottomSheet
              }}
            >
              <Text>{selectedSex}</Text>
            </TouchableOpacity>
            <Image
              source={require('@/assets/images/icons-frame.png')}
              className='w-6 h-6 ml-2'
              resizeMode='contain'
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <BottomSheet
        ref={bottomSheetModalRef}
        snapPoints={[120]}
        enablePanDownToClose
        index={-1}
        handleComponent={null}
        backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
        onChange={handleSheetChanges}
      >
        <BottomSheetView>
          <View className='py-[22px] px-5 flex-row justify-between items-center'>
            <Text className='font-bold text-xl'>Select Sex</Text>
            <TouchableOpacity
              onPress={() => {
                setIsSheetOpen(false);
                bottomSheetModalRef.current?.close();
              }}
              className='w-10 h-10 rounded-full bg-background_components-default items-center justify-center'
            >
              <Image
                className='w-5 h-5'
                source={require('@/assets/images/close.png')}
              />
            </TouchableOpacity>
          </View>
          <View className='w-full h-[1px] bg-background_components-default' />
          <View className='px-5'>
            <TouchableOpacity
              onPress={() => {
                setSelectedSex('Male');
                handleCloseModalPress();
              }}
              className='items-center space-x-2 '
            >
              <View className='flex-row items-center justify-between w-full py-5'>
                <Text className='font-semibold text-base'>Male</Text>

                <View
                  className={`w-5 h-5 rounded-full border-2 ${
                    selectedSex === 'Male' ? 'bg-blue-500' : 'border-gray-400'
                  }`}
                >
                  {selectedSex === 'Male' && (
                    <View className='w-4 h-4 rounded-full bg-black self-center' />
                  )}
                </View>
              </View>
            </TouchableOpacity>
            <View className='w-full h-[1px] bg-background_components-default' />
            <TouchableOpacity
              onPress={() => {
                setSelectedSex('Female');
                handleCloseModalPress();
              }}
              className='items-center space-x-2 '
            >
              <View className='flex-row items-center justify-between w-full py-5'>
                <Text className='font-semibold text-base'>Female</Text>

                <View
                  className={`w-5 h-5 rounded-full border-2 ${
                    selectedSex === 'Female' ? 'bg-blue-500' : 'border-gray-400'
                  }`}
                >
                  {selectedSex === 'Female' && (
                    <View className='w-4 h-4 rounded-full bg-black self-center' />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default ProfileInfo;
