import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {TabRoutes} from './Tab.routes';
import {ActivityIndicator, Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

interface AppNavigationProps {}

export const AppNavigation: React.FC<AppNavigationProps> = ({}) => {
  const [connection, setConnection] = React.useState(false);
  const linking = {
    prefixes: ['learner://', 'https://www.learner.com'],
    config: {
      screens: {
        HomeScreen: 'home',
        ProfileScreen: 'profile',
      },
    },
  };

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log(state.type);
      console.log(state.isConnected);
      setConnection(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer
      linking={linking}
      fallback={
        <View>
          <ActivityIndicator size={'large'} />
        </View>
      }>
      {!connection ? (
        <View
          style={{
            paddingTop: 45,
            position: 'absolute',
            backgroundColor: 'red',
            width: '100%',
            maxHeight: 90,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#FFF', fontSize: 16}}>
            Internet not connected
          </Text>
        </View>
      ) : null}
      <TabRoutes />
    </NavigationContainer>
  );
};
