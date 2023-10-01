import * as React from 'react';
import {Pressable, Text, View} from 'react-native';
import {ThemeContext} from '../AppProvider';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({title}) => {
  const {theme} = React.useContext(ThemeContext);
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: theme === 'light' ? '#147920' : '#252A48',
        height: 60,
        padding: 10,
      }}>
      <Pressable onPress={() => navigation.openDrawer()}>
        <Icon name="apps-outline" color="#FFF" size={24} />
      </Pressable>
      <Text style={{fontSize: 24, color: '#FFF', paddingHorizontal: 20}}>
        {title}
      </Text>
      {route.params?.userID ? (
        <Text style={{fontSize: 24, color: '#FFF', paddingHorizontal: 20}}>
          {route.params?.userID}
        </Text>
      ) : null}
    </View>
  );
};
