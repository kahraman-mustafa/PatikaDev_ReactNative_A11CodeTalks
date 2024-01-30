import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {parseRoomList} from '../../../utils/parsers/parseFBDBResponse';
import EmptyView from '../../components/EmptyView';
import FloatingButton from '../../components/FloatingButton';
import LoadingView from '../../components/LoadingView';
import RoomCard from '../../components/card/RoomCard/RoomCard';
import ModalNewRoom from '../../components/modal/ModalNewRoom';
import {ROOM_PAGE} from '../../router/routes';
import {MessageSchema} from '../RoomPage/RoomPage';
import styles from './Rooms.style';

export interface UserSchema {
  username: string;
}

export interface RoomSchema {
  id: string;
  createdAt: string;
  lastActiveAt: string;
  name: string;
  founder: string;
  users: UserSchema[];
  messages: MessageSchema[];
}

const Rooms = ({route, navigation}) => {
  const [inputModalVisible, setInputModalVisible] =
    React.useState<boolean>(false);
  const [roomList, setRoomList] = React.useState<RoomSchema[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isFloatingButtonVisible, showFloatingButton] =
    React.useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  React.useEffect(() => {
    setLoading(true);
    const listenDB = () => {
      const reference = database().ref('/rooms');
      reference.on(
        'value',
        snapshot => {
          const responseData = snapshot.val();
          const parsedData = parseRoomList(responseData);
          setRoomList(parsedData);
          setLoading(false);
        },
        error => console.log('Unable to get rooms info. Error: ' + error),
      );
    };

    listenDB();
  }, []);

  const checkDB = () => {
    setRefreshing(true);
    const reference = database().ref('/rooms');
    reference
      .once('value')
      .then(snapshot => {
        const responseData = snapshot.val();
        const parsedData = parseRoomList(responseData);
        setRoomList(parsedData);
        setRefreshing(false);
      })
      .catch(error => console.log('Unable to get rooms info. Error: ' + error));
  };

  const handleEnterRoom = (item: RoomSchema) => {
    console.log('Tapped room: ' + JSON.stringify(item));
    navigation.navigate(ROOM_PAGE, {
      room: item,
    });
  };

  const renderRoomItem = ({item}: {item: RoomSchema}) => {
    return <RoomCard room={item} onEnterRoom={() => handleEnterRoom(item)} />;
  };

  const handleCreateRoom = (roomName: string) => {
    setInputModalVisible(false);
    createRoom(roomName);
  };

  const createRoom = (roomName: string) => {
    if (roomList.filter(room => room.name === roomName).length > 0) {
      console.log('A room with the same name already exists...');
      return null;
    }

    const userMail = auth().currentUser?.email;
    const founder = userMail?.split('@')[0];
    const roomObject = {
      founder,
      name: roomName,
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
      messages: '',
      users: [founder],
    };
    try {
      database().ref('/rooms').push(roomObject);
      console.log(roomObject);
    } catch (error) {
      console.log('Unable to create room. Error: ' + error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading || refreshing ? (
        <LoadingView message="Sohbet demleniyor..." />
      ) : (
        <>
          {roomList.length === 0 ? (
            <EmptyView message="Gelin tanış olalım!" />
          ) : (
            <FlatList
              data={roomList}
              renderItem={renderRoomItem}
              numColumns={2}
              keyExtractor={item => item.id.toString()}
              onScroll={() => showFloatingButton(true)}
              onEndReached={() => showFloatingButton(false)}
              // onStartReached={() => showFloatingButton(true)}
              onRefresh={() => checkDB()}
              refreshing={refreshing}
            />
          )}
          {isFloatingButtonVisible && (
            <FloatingButton
              iconName="plus"
              onPress={() => setInputModalVisible(true)}
            />
          )}
          <ModalNewRoom
            isVisible={inputModalVisible}
            onClose={() => setInputModalVisible(false)}
            onSend={handleCreateRoom}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Rooms;
