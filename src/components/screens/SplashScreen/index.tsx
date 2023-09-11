/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {MainView} from '@components/atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';

const SplashScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'SplashScreen'>>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const _fetchData = async () => {
        const dataUserStorage = await AsyncStorage.getItem(Keys.dataUser);
        if (!dataUserStorage) {
          const initialData = [{name: 'John Doe', initial: 'MR', id: 1}];
          await AsyncStorage.setItem(
            Keys.dataUser,
            JSON.stringify(initialData),
          );
        }
      };
      _fetchData().then(() => navigation.replace('HomeScreen', {}));
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <MainView style={styles.container}>
      <Text style={styles.title}>Booking Hotel App</Text>
      <Text style={styles.titleName}>[Muhammad Bintang Al Akbar]</Text>
    </MainView>
  );
};

export {SplashScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.base,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '800',
    fontSize: 28,
    color: Colors.white,
    textTransform: 'uppercase',
    lineHeight: 34,
    textAlign: 'center',
    paddingVertical: 16,
  },
  titleName: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    color: Colors.white,
    lineHeight: 16.2,
    textAlign: 'center',
  },
});
