import Colors from '@constants/colors';
import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';

export type PopUpProps = {
  show?: boolean;
  children?: any;
  actionCancel?: () => void;
};

const PopUp = ({show, children, actionCancel}: PopUpProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={actionCancel}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView]}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundColorModal,
  },
  modalView: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export {PopUp};
