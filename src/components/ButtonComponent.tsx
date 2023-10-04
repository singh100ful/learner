import * as React from 'react';
import {Pressable, PressableProps, Text, View} from 'react-native';

interface ButtonComponentProps extends PressableProps {
  title: string;
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  title,
  ...rest
}) => {
  return (
    <Pressable
      {...rest}
      style={{
        padding: 10,
        backgroundColor: rest.disabled ? '#949494' : '#3FB758',
        borderRadius: 8,
      }}>
      <Text
        style={{
          fontSize: 18,
          color: 'white',
          textAlign: 'center',
          fontWeight: '700',
        }}>
        {title}
      </Text>
    </Pressable>
  );
};
