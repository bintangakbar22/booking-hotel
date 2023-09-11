import {showErrorToast, showSuccessToast} from '@constants/functional';
import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';

export interface DataUser {
  id: number;
  name: string;
  initial: 'MR' | 'NY';
}

const useDetailScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HomeScreen'>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataUser[]>([
    {name: 'John Doe', initial: 'MR', id: 1},
  ]);
  const [popUpData, setPopUpData] = useState<DataUser | any>(null);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const _fetchData = async () => {
      const dataUserStorage = await AsyncStorage.getItem(Keys.dataUser);
      if (dataUserStorage) {
        const dataUser = JSON.parse(dataUserStorage);
        setData(dataUser);
      }
    };
    _fetchData().finally(() => setIsLoading(false));
  }, []);

  const _handlerAddVisitor = () => {
    const defaultData: DataUser = {
      id: data?.length + 1,
      name: '',
      initial: 'MR',
    };
    setData((prev: DataUser[]) => [...prev, defaultData]);
  };

  const _handlerRemoveItemVisitor = (user: DataUser) => {
    if (data?.length === 1) {
      showErrorToast('Tidak bisa menghapus data satu satunya');
      return;
    }
    setData((prev: DataUser[]) =>
      prev?.filter((obj: DataUser) => obj?.id !== user?.id),
    );
  };

  const validateData = data?.every((obj: DataUser) => obj?.name !== '');

  const _handlerSaveListVisitor = async () => {
    if (!validateData) {
      return;
    }
    setIsLoading(true);
    await AsyncStorage.setItem(Keys.dataUser, JSON.stringify(data));
    setIsLoading(false);
    navigation.navigate('HomeScreen', {});
    showSuccessToast('Data Berhasil Diubah');
  };

  const _handlerInitialName = (value: 'MR' | 'NY') => {
    setData((prev: DataUser[]) => {
      return prev.map((item: DataUser, currentIndex: number) => {
        if (popUpData?.id === currentIndex + 1) {
          return {...item, initial: value};
        }
        return item;
      });
    });
    setShowPopUp(false);
  };

  return {
    navigation,
    _handlerAddVisitor,
    isLoading,
    data,
    _handlerRemoveItemVisitor,
    _handlerSaveListVisitor,
    setData,
    validateData,
    showPopUp,
    setShowPopUp,
    _handlerInitialName,
    popUpData,
    setPopUpData,
  };
};

export {useDetailScreen};
