import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  Button,
  Header,
  Input,
  LoadingIndicator,
  MainText,
  MainView,
  PopUp,
} from '@components/atoms';
import {generalStyles} from '@constants/styles';
import Colors from '@constants/colors';
import {DataUser, useDetailScreen} from './useDetailScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DetailScreen = () => {
  const {
    data,
    isLoading,
    setData,
    _handlerAddVisitor,
    _handlerRemoveItemVisitor,
    _handlerSaveListVisitor,
    validateData,
    showPopUp,
    setShowPopUp,
    _handlerInitialName,
    popUpData,
    setPopUpData,
  } = useDetailScreen();

  const _renderChildrenPopUp = () => {
    return (
      <MainView>
        <Pressable onPress={() => _handlerInitialName('MR')}>
          <MainView marginVertical={8} flexDirection="row" alignItems="center">
            <Icon
              name={
                popUpData?.initial === 'MR'
                  ? 'radiobox-marked'
                  : 'radiobox-blank'
              }
              size={24}
              color={Colors.primary.base}
            />
            <MainText paddingLeft={4}>MR</MainText>
          </MainView>
        </Pressable>
        <Pressable onPress={() => _handlerInitialName('NY')}>
          <MainView marginBottom={8} flexDirection="row" alignItems="center">
            <Icon
              name={
                popUpData?.initial === 'NY'
                  ? 'radiobox-marked'
                  : 'radiobox-blank'
              }
              size={24}
              color={Colors.primary.base}
            />
            <MainText paddingLeft={4}>NY</MainText>
          </MainView>
        </Pressable>
      </MainView>
    );
  };

  return (
    <MainView flex={1}>
      <Header label="Tambah Data Tamu" />
      <ScrollView contentContainerStyle={generalStyles.contentContainerStyle}>
        <MainView padding={16}>
          <MainText color={Colors.primary.base}>Data Tamu</MainText>
          <MainView>
            {data?.map((obj: DataUser, index: number) => (
              <MainView
                key={index}
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between">
                <TouchableOpacity
                  style={styles.dropDownItem}
                  onPress={() => {
                    setPopUpData(obj);
                    setShowPopUp(true);
                  }}>
                  <MainText color={Colors.primary.base} fontWeight="800">
                    {obj?.initial}
                  </MainText>
                  <Icon
                    name={'arrow-down'}
                    size={16}
                    color={Colors.primary.base}
                  />
                </TouchableOpacity>
                <Input
                  width={'85%'}
                  value={obj?.name}
                  onChangeText={(text: string) =>
                    setData((prev: DataUser[]) => {
                      return prev.map(
                        (item: DataUser, currentIndex: number) => {
                          if (index === currentIndex) {
                            return {...item, name: text};
                          }
                          return item;
                        },
                      );
                    })
                  }
                  placeholder=""
                />
                <TouchableOpacity
                  onPress={() => _handlerRemoveItemVisitor(obj)}>
                  <Icon
                    name={'trash-can-outline'}
                    size={32}
                    color={Colors.danger.base}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </MainView>
            ))}
            <Button
              label="+ Tambah Data Tamu"
              style={styles.buttonAdd}
              action={_handlerAddVisitor}
            />
          </MainView>
        </MainView>
      </ScrollView>
      <Button
        label="Simpan"
        isDisabled={!validateData}
        style={styles.buttonSave}
        background={Colors.orange.base}
        action={_handlerSaveListVisitor}
      />
      <PopUp
        show={showPopUp}
        actionCancel={() => setShowPopUp(false)}
        children={_renderChildrenPopUp()}
      />
      {isLoading ? <LoadingIndicator /> : null}
    </MainView>
  );
};

export {DetailScreen};

const styles = StyleSheet.create({
  icon: {
    marginBottom: 16,
    marginLeft: -8,
  },
  buttonAdd: {width: '50%', alignSelf: 'flex-start'},
  buttonSave: {
    position: 'absolute',
    bottom: 16,
    width: '95%',
    alignSelf: 'center',
  },
  dropDownItem: {
    backgroundColor: Colors.white,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'grey',
    paddingHorizontal: 16,
    alignSelf: 'center',
    marginBottom: 18,
    marginRight: 8,
  },
});
