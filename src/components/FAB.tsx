import * as React from 'react';
import {Pressable, Text, View} from 'react-native';
import {ThemeContext} from '../AppProvider';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamsList} from '../navigation/Stack.routes';

interface FABProps {
  title: string;
  onPress(): void;
}

export const FAB: React.FC<FABProps> = ({title, onPress}) => {
  const {theme, toggleTheme} = React.useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: theme === 'light' ? '#235678' : '#856409',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 30,
      }}>
      <Text style={{fontSize: 18, color: '#FFF'}}>{title}</Text>
    </Pressable>
  );
};
