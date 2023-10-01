import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Text, View} from 'react-native';
import {HomeScreen} from '../screens/HomeScreen';
import {SettingScreen} from '../screens/SettingScreen';
import {ProfileScreen} from '../screens/ProfileScreen';

interface StackRoutesProps {}

export type RootStackParamsList = {
  HomeScreen: undefined;
  SettingsScreen: {userID?: number};
  ProfileScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

export const StackRoutes: React.FC<StackRoutesProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#147920'},
        headerTintColor: '#FFF',
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingScreen}
        options={{
          headerStyle: {},
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
