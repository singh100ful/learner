import * as React from 'react';
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import {baseUrl, jsonUrl} from '../config/constants/apiConstants';
import {InputComponent} from '../components/InputComponent';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ListScreenProps {}

const {width, height} = Dimensions.get('screen');

export const ListScreen: React.FC<ListScreenProps> = ({}) => {
  const [send, setSend] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [token, setToken] = React.useState('');

  const fetchData = async (page: number = 1) => {
    try {
      setLoading(true);
      //GET, POST, PUT, DELETE

      const response = await axios.get(baseUrl + 'character/?page=' + page);
      if (data.length) {
        let temp = data;
        temp = temp.concat(response.data.results);
        setData(temp);
      } else {
        setData(response.data.results);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    // setLoading(true);
    // return fetch(baseUrl + 'character')
    //   .then(response => response.json())
    //   .then(data => {
    //     setLoading(false);
    //     setData(data);
    //   })
    //   .catch(err => console.log(err));
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const postData = async () => {
    try {
      let data = {
        userId: 1,
        post: send,
      };
      const response = await fetch(jsonUrl + 'posts', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const res2 = await response.json();
      console.log(res2);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(token);

  return (
    <View style={{flex: 1}}>
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <InputComponent
          label={'Data to send'}
          value={send}
          onChangeText={val => setSend(val)}
          placeholder="Enter something"
        />
        <Button title="Send" onPress={postData} />
      </View> */}
      <FlatList
        data={data}
        numColumns={2}
        initialNumToRender={6}
        contentContainerStyle={{alignItems: 'center', gap: 20}}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                paddingHorizontal: 10,
                width: width / 2 - 20,
                height: width / 2 - 20,
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{uri: item.image}}
                imageStyle={{borderRadius: 20}}
                style={{width: '100%', height: '100%'}}>
                <Text>{item.name}</Text>
              </ImageBackground>
            </View>
          );
        }}
        onEndReachedThreshold={0.2}
        onEndReached={() => {
          const page = data.length / 20 + 1;
          fetchData(page);
        }}
      />
    </View>
  );
};
