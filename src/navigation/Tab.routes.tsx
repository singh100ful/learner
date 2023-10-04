import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {ProfileScreen} from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {Pressable, Text, View} from 'react-native';
import {DrawerRoutes} from './Drawer.routes';
import {ListScreen} from '../screens/ListScreen';

interface TabRoutesProps {}

const Tab = createBottomTabNavigator();

export const TabRoutes: React.FC<TabRoutesProps> = ({}) => {
  return (
    <Tab.Navigator
      tabBar={({state, descriptors, navigation}) => {
        return (
          <View
            style={{
              backgroundColor: 'gray',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: 20,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}>
            {state.routes.map((route, index) => {
              const {options} = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : route.name;

              const iconName =
                route.name === 'HomeTabScreen'
                  ? 'home'
                  : route.name === 'ProfileScreen'
                  ? 'person'
                  : '';

              const focused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!focused && !event.defaultPrevented) {
                  navigation.navigate(route.name, {merge: true});
                }
              };
              return (
                <Pressable
                  onPress={onPress}
                  key={index}
                  style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                  <Icon
                    name={iconName}
                    color={focused ? '#147920' : '#000'}
                    size={20}
                  />
                  <Text
                    style={{
                      color: focused ? '#147920' : '#000',
                    }}>
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        );
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#147920',
        tabBarInactiveTintColor: '#000',
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
        }}
        name="HomeTabScreen"
        component={ListScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
