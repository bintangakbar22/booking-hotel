import {StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import {generalStyles} from '@constants/styles';
import {MainText, MainView} from '../MainComponent';
import {Button} from '../Button';

interface Iprops {
  name: string;
  email: string;
  phone_number: string;
  action?: () => void;
}

const OrdererCard = (props: Iprops) => {
  return (
    <View style={styles.card}>
      <MainView>
        <MainText color={Colors.dark.neutral100} fontWeight="800">
          {props?.name}
        </MainText>
        <MainText color={Colors.dark.neutral60}>{props?.email}</MainText>
        <MainText color={Colors.dark.neutral60}>{props?.phone_number}</MainText>
      </MainView>
      <Button label="Ubah" action={props?.action} style={styles.button} />
    </View>
  );
};

export {OrdererCard};
const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: Colors.white,
    ...generalStyles.shadowProp,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  button: {
    width: '25%',
  },
});
