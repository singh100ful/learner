import {NavigationProp, RouteProp} from '@react-navigation/native';
import * as React from 'react';
import {Text, View} from 'react-native';
import {RootStackParamsList} from '../navigation/Stack.routes';
import {Header} from '../components/Header';

interface SettingScreenProps {
  navigation: NavigationProp<RootStackParamsList, 'SettingsScreen'>;
  route: RouteProp<RootStackParamsList, 'SettingsScreen'>;
}

export const SettingScreen: React.FC<SettingScreenProps> = ({route}) => {
  const userID = route.params?.userID;
  return (
    <View style={{flex: 1}}>
      <Header title="Settings" />
      <Text>{userID}</Text>
    </View>
  );
};
