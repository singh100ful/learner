import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {TabRoutes} from './Tab.routes';
import {ActivityIndicator, View} from 'react-native';

interface AppNavigationProps {}

export const AppNavigation: React.FC<AppNavigationProps> = ({}) => {
  const linking = {
    prefixes: ['learner://', 'https://www.learner.com'],
    config: {
      screens: {
        HomeScreen: 'home',
        ProfileScreen: 'profile',
      },
    },
  };
  return (
    <NavigationContainer
      linking={linking}
      fallback={
        <View>
          <ActivityIndicator size={'large'} />
        </View>
      }>
      <TabRoutes />
    </NavigationContainer>
  );
};
