import React from 'react';
import {
  SafeAreaView,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {styles} from './style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContext} from '@react-navigation/native';
import Colors from '@constants/colors';

type Props = {
  label?: string;
  labelContent?: React.ReactNode;
  subLabel?: string | boolean | any;
  styleLabel?: StyleProp<TextStyle>;
  styleSubLabel?: StyleProp<TextStyle>;
  iconLeft?: any;
  styleIconLeft?: any;
  onPressIconLeft?: () => void;
  iconRight?: any;
  styleIconRight?: any;
  styleContainer?: StyleProp<ViewStyle>;
  onPressIconRight?: () => void;
  paddingHorizontal?: number;
  colorLabel?: any;
  subLabelContent?: React.ReactNode;
  backgroundColor?: string;
  withoutBackButton?: boolean;
};

const Header = ({
  label,
  subLabel,
  styleLabel,
  styleSubLabel,
  iconLeft,
  styleIconLeft,
  onPressIconLeft,
  iconRight,
  styleIconRight,
  styleContainer,
  onPressIconRight,
  paddingHorizontal = 16,
  subLabelContent,
  labelContent,
  colorLabel = Colors.white,
  backgroundColor = Colors.primary.base,
  withoutBackButton = false,
}: Props) => {
  const navigation: any = React.useContext(NavigationContext);

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: paddingHorizontal,
        backgroundColor: backgroundColor,
      }}>
      <View style={[styles.container, styleContainer]}>
        <TouchableOpacity
          style={[styles.iconLeft, styleIconLeft]}
          onPress={
            onPressIconLeft
              ? onPressIconLeft
              : () => {
                  navigation.goBack();
                }
          }>
          {!withoutBackButton ? (
            iconLeft ? (
              iconLeft
            ) : (
              <Icon name={'arrow-left'} size={24} color={Colors.white} />
            )
          ) : null}
        </TouchableOpacity>

        <View style={styles.labelContainer}>
          {label || labelContent ? (
            <>
              {label && (
                <Text
                  allowFontScaling={false}
                  numberOfLines={2}
                  style={[
                    styleLabel,
                    styles.label,
                    {
                      color: colorLabel,
                      width: !iconRight ? '80%' : '60%',
                    },
                  ]}>
                  {label}
                </Text>
              )}
              {labelContent}
              {subLabel ? (
                <Text
                  allowFontScaling={false}
                  numberOfLines={2}
                  style={[
                    styleSubLabel,
                    styles.subLabel,
                    {
                      color: colorLabel,
                      width: !iconRight ? '80%' : '60%',
                    },
                  ]}>
                  {subLabel}
                </Text>
              ) : null}
              {subLabelContent}
            </>
          ) : null}
        </View>

        {iconRight && onPressIconRight ? (
          <TouchableOpacity
            style={[styleIconRight, styles.iconRight]}
            onPress={onPressIconRight}>
            {iconRight}
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export {Header};
