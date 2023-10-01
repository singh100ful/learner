import {createDrawerNavigator} from '@react-navigation/drawer';
import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {SettingScreen} from '../screens/SettingScreen';
import {StackRoutes} from './Stack.routes';

interface DrawerRoutesProps {}

const Drawer = createDrawerNavigator();

export const DrawerRoutes: React.FC<DrawerRoutesProps> = ({}) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'front',
        drawerStyle: {
          width: 250,
        },
        drawerActiveTintColor: '#147920',
        drawerLabelStyle: {fontSize: 16},
      }}>
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: props => (
            <Icon name="home" color={props.color} size={props.size} />
          ),
        }}
        name="HomeDrawer"
        component={StackRoutes}
      />
      <Drawer.Screen
        options={{
          drawerIcon: props => (
            <Icon name="settings" color={props.color} size={props.size} />
          ),
        }}
        name="Settings"
        component={SettingScreen}
      />
    </Drawer.Navigator>
  );
};
