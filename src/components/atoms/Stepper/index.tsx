/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Colors from '@constants/colors';

type Props = {
  labels: string[];
  active: number;
};

const Stepper: FC<Props> = ({labels, active}) => {
  return (
    <View style={styles.stepper_wraper}>
      {labels.map((val, key) => (
        <View key={key} style={styles.stepper}>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
            }}>
            <View
              style={[
                styles.stepperCircleNotDone,
                active < key + 1 && {backgroundColor: Colors.dark.neutral50},
              ]}>
              <Text style={{color: Colors.white}}>{key + 1}</Text>
            </View>
            <Text
              style={[
                styles.stepper_text,
                active >= key + 1 && {color: Colors.primary.base},
              ]}>
              {val}
            </Text>
          </View>

          {key + 1 !== labels.length ? (
            <View
              style={[
                styles.stepper_line,
                {
                  width: labels.length <= 3 ? 60 : 35,
                  marginRight: labels.length <= 3 ? 0 : -35,
                  marginLeft: labels.length <= 3 ? -25 : -20,
                },
                active <= key && {backgroundColor: Colors.dark.neutral50},
              ]}
            />
          ) : null}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  stepper_wraper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepper: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
  },
  stepper_text: {
    color: Colors.dark.neutral50,
  },
  stepper_line: {
    height: 2,
    alignSelf: 'center',
    backgroundColor: Colors.primary.base,
  },
  stepperCircleDone: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: Colors.primary.base,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 0,
  },
  stepperCircleNotDone: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: Colors.primary.base,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {Stepper};
