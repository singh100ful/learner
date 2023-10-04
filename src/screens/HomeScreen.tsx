import * as React from 'react';
import {FlatList, Pressable, ScrollView, Text, View} from 'react-native';
import {AddTask} from '../components/AddTask';
import {FAB} from '../components/FAB';
import {Header} from '../components/Header';
import {counterReducer} from '../store/reducer/counterReducer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  NavigationProp,
  useFocusEffect,
  useIsFocused,
  useScrollToTop,
} from '@react-navigation/native';
import {RootStackParamsList} from '../navigation/Stack.routes';

interface HomeScreenProps {
  navigation: NavigationProp<RootStackParamsList, 'HomeScreen'>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const mount = React.useRef(false);
  const scrollTop = React.useRef(null);
  const [data, setData] = React.useState<any[]>([]);
  const [input, setInput] = React.useState('');
  const [modal, setModal] = React.useState(false);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(err => console.log(err));
  }, []);

  //Promise - pending, fulfilled, rejected

  const promiseData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Fetched data');
      }, 1000);
    });
  };

  const toggle = () => {
    setActive(!active);
  };

  const handleAdd = () => {
    setData([...data, {task: input, completed: false}]);
    setInput('');
    setModal(!modal);
  };

  const completeTask = (index: number) => {
    const newData = [...data];
    newData[index].completed = !newData[index].completed;
    setData(newData);
  };

  const handleDelete = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const [state, dispatch] = React.useReducer(counterReducer, {count: 0});

  const focused = useIsFocused();

  console.log('Hello');

  console.log('Hello world');

  React.useEffect(() => {
    promiseData()
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err))
      .finally(() => console.log('Finally'));
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     video.play();

  //     return () => {
  //       video.pause()
  //       video.stop()
  //     }
  //   }, [])
  // )

  // const handleTop = () => {
  //   useScrollToTop(scrollTop);
  // };

  return (
    <View style={{flex: 1}}>
      <Header title="ToDo" />
      <AddTask
        visible={modal}
        setModal={setModal}
        value={input}
        handleValue={setInput}
        handleAdd={handleAdd}
      />
      <View
        style={{
          flex: 1,
        }}>
        <ScrollView ref={scrollTop}>
          {data.map((item, index) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
                key={index}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Pressable onPress={() => completeTask(index)}>
                    <View
                      style={{
                        borderColor: '#000',
                        borderWidth: 1,
                        borderRadius: 4,
                        padding: item.completed ? 5 : 10,
                      }}>
                      {item.completed ? (
                        <View style={{backgroundColor: '#000', padding: 5}} />
                      ) : null}
                    </View>
                  </Pressable>
                  <Text style={{fontSize: 18}}>{item.title}</Text>
                </View>

                <Pressable onPress={() => handleDelete(index)}>
                  <Text style={{fontSize: 24, color: '#F00'}}>X</Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={{position: 'absolute', bottom: 20, right: 20, gap: 10}}>
        <FAB
          title="+"
          onPress={() =>
            navigation.navigate('SettingsScreen', {userID: 123456})
          }
        />
      </View>
      {/* <View style={{position: 'absolute', bottom: 20, left: 20, gap: 10}}>
        <FAB title="top" onPress={() => handleTop()} />
      </View> */}
    </View>
  );
};
