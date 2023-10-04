import Slider from '@react-native-community/slider';
import * as React from 'react';
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import {InputComponent} from '../components/InputComponent';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {ButtonComponent} from '../components/ButtonComponent';
import {loginUrl} from '../config/constants/apiConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileScreenProps {}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({}) => {
  const mount = React.useRef(false);
  const [input, setInput] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [count, setCount] = React.useState(0);
  const [validation, setValidation] = React.useState(true);
  const [token, setToken] = React.useState(null);

  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  const validateEmail = (text: string) => {
    // const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]$/;

    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    setValidation(emailPattern.test(text));
    setInput(text);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      comment: '',
      counter: 0,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Entered email is invalid')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async values => {
      let data = {
        email: values.email,
        password: values.password,
      };
      Keyboard.dismiss();

      try {
        const response = await fetch(loginUrl + 'login', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const login = await response.json();
        console.log(login);
        await AsyncStorage.setItem('access_token', login.token);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const fetchToken = async () => {
    try {
      const value = await AsyncStorage.getItem('access_token');
      console.log(value);
      setToken(value);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (mount.current) {
      fetchToken();
    } else {
      mount.current = true;
    }
  }, [token]);

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    values,
    setFieldTouched,
    touched,
    errors,
    isValid,
    dirty,
  } = formik;

  return (
    <View style={{flex: 1, padding: 20}}>
      <KeyboardAvoidingView behavior="position">
        <InputComponent
          label="Email"
          value={values.email}
          onChangeText={handleChange('email')}
          onBlur={() => setFieldTouched('email')}
          touched={touched.email}
          error={errors.email}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          returnKeyType="next"
        />
        <InputComponent
          suffixIcon={true}
          label="Password"
          ref={passwordRef}
          value={values.password}
          onChangeText={handleChange('password')}
          onBlur={() => setFieldTouched('password')}
          touched={touched.password}
          error={errors.password}
          placeholder="Enter password"
          autoCapitalize="none"
          secureTextEntry
          onSubmitEditing={handleSubmit}
        />
        {/* <InputComponent
          label="Comment"
          multiline
          numberOfLines={4}
          value={values.comment}
          onChangeText={handleChange('comment')}
          placeholder="Enter Comment"
          autoCapitalize="none"
          inputStyle={{maxHeight: 100}}
        />
        <Slider
          value={values.counter}
          minimumValue={0}
          maximumValue={10}
          step={2}
          onValueChange={val => setFieldValue('counter', val)}
        /> */}
        <ButtonComponent
          disabled={!isValid || !dirty}
          title="Submit"
          onPress={() => handleSubmit()}
        />
        <ButtonComponent title="fetch" onPress={fetchToken} />
      </KeyboardAvoidingView>
      {/* <Switch /> */}
    </View>
  );
};
