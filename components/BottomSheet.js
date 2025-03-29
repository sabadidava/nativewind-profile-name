import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetModal = forwardRef((props, ref) => {
  const { selectedSex, setSelectedSex, setIsSheetOpen } = props;
  const bottomSheetModalRef = useRef();

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleOpenModalPress = useCallback(() => {
    bottomSheetModalRef.current?.expand();
  }, []);

  useImperativeHandle(ref, () => ({
    handleCloseModalPress,
    handleOpenModalPress,
  }));

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    setIsSheetOpen(index !== -1);
  }, []);

  return (
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
            className='items-center space-x-2'
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
            className='items-center space-x-2'
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
  );
});

export default BottomSheetModal;
