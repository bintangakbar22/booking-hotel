import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import {generalStyles} from '@constants/styles';
import {MainText, MainView} from '../MainComponent';

interface Iprops {
  image: string;
  name: string;
  description: string;
  facility: string;
}

const OrderCard = (props: Iprops) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: props?.image}} style={styles.image} />
      <MainView
        flexDirection="column"
        marginLeft={16}
        justifyContent="space-between">
        <MainText color={Colors.primary.base}>{props?.name}</MainText>
        <MainText color={Colors.dark.neutral50}>{props?.description}</MainText>
        <MainText color={Colors.dark.neutral50}>{props?.facility}</MainText>
      </MainView>
    </View>
  );
};

export {OrderCard};
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
});
