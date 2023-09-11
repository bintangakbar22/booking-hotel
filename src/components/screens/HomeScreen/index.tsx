import {Pressable, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {
  Button,
  Header,
  Input,
  LoadingIndicator,
  MainText,
  MainView,
  OrderCard,
  OrdererCard,
  PopUp,
  Stepper,
} from '@components/atoms';
import {useHomeScreen} from './useHomeScreen';
import {generalStyles} from '@constants/styles';
import Colors from '@constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DataUser} from '../DetailScreen/useDetailScreen';
import dayjs from 'dayjs';

const HomeScreen = () => {
  const {
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
  } = useHomeScreen();

  const _renderOrderDetailSection = () => (
    <MainView>
      <MainText fontWeight="800" fontSize={14}>
        Detail Pesanan
      </MainText>
      <OrderCard
        image={data?.chosen_hotel_detail?.images?.[0]?.url ?? ''}
        name={data?.chosen_hotel_detail?.hotel_name ?? '-'}
        description={`${data?.chosen_hotel_room?.room_name} with ${data?.chosen_hotel_room?.meal}`}
        facility={`${data?.chosen_hotel_params?.total_room} Kamar * ${data?.chosen_hotel_params?.guest_adult} Tamu`}
      />
      <MainView
        flexDirection="row"
        justifyContent="space-between"
        marginVertical={8}>
        <MainText>Check-In</MainText>
        <MainText color={Colors.dark.neutral50}>
          {dayjs(data?.chosen_hotel_params?.check_in).format('DD MMMM YYYY')}
        </MainText>
      </MainView>
      <MainView
        flexDirection="row"
        justifyContent="space-between"
        marginBottom={8}>
        <MainText>Check-Out</MainText>
        <MainText color={Colors.dark.neutral50}>
          {dayjs(data?.chosen_hotel_params?.check_out).format('DD MMMM YYYY')}
        </MainText>
      </MainView>
      {data?.chosen_hotel_prices?.is_refundable ? (
        <MainText textAlign="right" color={Colors.orange.base}>
          Dapat direfund jika dibatalkan
        </MainText>
      ) : null}
    </MainView>
  );

  const _renderOrdererDetailSection = () => (
    <MainView>
      <MainText fontWeight="800" fontSize={14}>
        Detail Pemesan
      </MainText>
      <OrdererCard
        name={dataUser?.name}
        email={dataUser?.email}
        phone_number={dataUser?.phoneNumber}
        action={() => setShowChangeProfile(true)}
      />
      <Pressable onPress={() => setChoosed(0)}>
        <MainView marginVertical={8} flexDirection="row" alignItems="center">
          <Icon
            name={choosed === 0 ? 'radiobox-marked' : 'radiobox-blank'}
            size={24}
            color={Colors.primary.base}
          />
          <MainText paddingLeft={4}>Saya memesan untuk sendiri</MainText>
        </MainView>
      </Pressable>
      <Pressable onPress={() => setChoosed(1)}>
        <MainView marginBottom={8} flexDirection="row" alignItems="center">
          <Icon
            name={choosed === 1 ? 'radiobox-marked' : 'radiobox-blank'}
            size={24}
            color={Colors.primary.base}
          />
          <MainText paddingLeft={4}>Saya memesan untuk orang lain</MainText>
        </MainView>
      </Pressable>
      <MainText fontWeight="800" fontSize={14} marginBottom={8}>
        Data Tamu
      </MainText>
      {visitors?.length !== 0 &&
        visitors?.map((obj: DataUser, index: number) => (
          <MainView style={styles.cardTamu} key={index}>
            <Icon name="account-tie-outline" size={24} />
            <MainText paddingLeft={8}>
              {obj?.initial}. {obj?.name}
            </MainText>
          </MainView>
        ))}

      <Button
        label="Ubah Data Tamu"
        style={styles.button}
        action={_handlerNavigateToDetail}
      />
    </MainView>
  );

  const _renderChildrenPopUp = () => (
    <MainView>
      <MainText
        textAlign="center"
        fontSize={18}
        fontWeight="800"
        paddingBottom={16}>
        Data Anda
      </MainText>
      <Input
        value={dataUser?.name}
        onChangeText={setUser?.setName}
        label="Nama Lengkap"
        placeholder="Masukan Nama Lengkap"
      />
      <Input
        value={dataUser?.email}
        onChangeText={setUser?.setEmail}
        label="Email"
        placeholder="Masukan Email"
      />
      <Input
        value={dataUser?.phoneNumber}
        onChangeText={setUser?.setPhoneNumber}
        label="Email"
        placeholder="Masukan Email"
      />
      <Button label="Tutup" action={() => setShowChangeProfile(false)} />
    </MainView>
  );
  return (
    <MainView flex={1}>
      <Header label="Payment Details" onPressIconLeft={() => {}} />
      <ScrollView contentContainerStyle={generalStyles.contentContainerStyle}>
        <MainView padding={16}>
          <Stepper active={1} labels={['Detail Pesanan', 'Pembayaran']} />
          <MainView style={styles.line} />
          {_renderOrderDetailSection()}
          <MainView style={styles.line} />
          {_renderOrdererDetailSection()}
        </MainView>
      </ScrollView>
      {isLoading ? <LoadingIndicator /> : null}
      <PopUp
        show={showChangeProfile}
        actionCancel={() => setShowChangeProfile(false)}
        children={_renderChildrenPopUp()}
      />
    </MainView>
  );
};

export {HomeScreen};

const styles = StyleSheet.create({
  line: {
    height: 2,
    backgroundColor: Colors.dark.neutral20,
    marginHorizontal: -16,
    marginVertical: 8,
  },
  button: {
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  cardTamu: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.dark.neutral50,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginVertical: 4,
  },
});
