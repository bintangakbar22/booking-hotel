import api from '@api/index';
import {URL_PATH} from '@constants/url';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {ChosenHotelData} from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import {DataUser} from '../DetailScreen/useDetailScreen';

const useHomeScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HomeScreen'>>();
  const isFocused = useIsFocused();
  const [data, setData] = useState<ChosenHotelData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [choosed, setChoosed] = useState<number>(0);
  const [showChangeProfile, setShowChangeProfile] = useState<boolean>(false);

  const [name, setName] = useState<string>('Tn. Andreas Andreas');
  const [email, setEmail] = useState<string>('andreasandreas@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState<string>('082260820643');

  const [visitors, setVisitors] = useState<DataUser[]>([
    {name: 'John Doe', initial: 'MR', id: 1},
  ]);

  const dataUser = {
    name,
    email,
    phoneNumber,
  };
  const setUser = {
    setName,
    setEmail,
    setPhoneNumber,
  };

  useEffect(() => {
    setIsLoading(true);
    const _fetchData = async () => {
      const id = 'bVonXoSUHK';
      const res = await api.get(URL_PATH.detail(id));
      if (res?.data?.chosen_hotel) {
        setData(res?.data?.chosen_hotel?.data?.get_chosen_hotel);
      }
    };

    _fetchData().finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const _fetchVisitors = async () => {
      const visitorsStorage = await AsyncStorage.getItem(Keys.dataUser);
      if (visitorsStorage) {
        const visitorsParsed = JSON.parse(visitorsStorage);
        setVisitors(visitorsParsed);
      }
    };
    _fetchVisitors();
  }, [isFocused]);

  const _handlerNavigateToDetail = () => {
    navigation.navigate('DetailScreen', {});
  };

  return {
    navigation,
    data,
    choosed,
    setChoosed,
    isLoading,
    _handlerNavigateToDetail,
    showChangeProfile,
    setShowChangeProfile,
    dataUser,
    setUser,
    visitors,
  };
};

export {useHomeScreen};
