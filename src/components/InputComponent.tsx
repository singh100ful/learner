import * as React from 'react';
import {
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface InputComponentProps extends TextInputProps {
  label: string;
  inputStyle?: TextStyle;
  suffixIcon?: boolean;
  touched?: any;
  error?: any;
}

export const InputComponent: React.FC<InputComponentProps> = ({
  inputStyle,
  label,
  suffixIcon,
  touched,
  error,
  ...rest
}) => {
  const [secure, setSecure] = React.useState(false || suffixIcon);
  return (
    <View>
      {label ? <Text>{label}</Text> : null}
      <View>
        <TextInput
          {...rest}
          secureTextEntry={secure}
          style={[
            inputStyle,
            {
              marginVertical: 10,
              paddingHorizontal: 10,
              paddingVertical: 10,
              fontSize: 18,
              borderColor: touched && error ? 'red' : 'gray',
              borderWidth: 1,
              borderRadius: 8,
            },
          ]}
        />
        {suffixIcon ? (
          <Pressable
            style={{position: 'absolute', right: 10, top: 20}}
            onPress={() => setSecure(!secure)}>
            {secure ? (
              <Icon name="eye-outline" size={20} />
            ) : (
              <Icon name="eye-off-outline" size={20} />
            )}
          </Pressable>
        ) : null}
      </View>
      {touched && error ? (
        <Text style={{fontSize: 14, color: 'red', paddingHorizontal: 10}}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};
