import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import Colors from '../../../styles/Color';
import {
  parseMessageList,
  parseUserList,
} from '../../../utils/parsers/parseFBDBResponse';
import EmptyView from '../../components/EmptyView';
import FloatingButton from '../../components/FloatingButton';
import LoadingView from '../../components/LoadingView';
import MessageCard from '../../components/card/MessageCard';
import {HeaderBack} from '../../components/header/HeaderBack/HeaderBack';
import ModalNewMessage from '../../components/modal/ModalNewMessage';
import {ROOMS_PAGE} from '../../router/routes';
import styles from './RoomPage.style';

export interface UserSchema {
  username: string;
}

export interface MessageSchema {
  id: string;
  date: string;
  text: string;
  username: string;
  like: number;
  dislike: number;
}

const RoomPage = ({route, navigation}) => {
  const [inputModalVisible, setInputModalVisible] =
    React.useState<boolean>(false);
  const [messageList, setMessageList] = React.useState<MessageSchema[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isFloatingButtonVisible, showFloatingButton] =
    React.useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const {room} = route.params;

  React.useEffect(() => {
    const onPressBack = () => navigation.goBack();
    navigation.setOptions({
      title: room.name,
      headerBackTitleVisible: true,
      headerBackTitle: ROOMS_PAGE,
      headerBackTitleStyle: {
        color: Colors.text_bright,
      },
      headerLeft: () => HeaderBack({backTitle: ROOMS_PAGE, onPressBack}),
    });
    setLoading(true);
    const listenDB = () => {
      const reference = database().ref(`/rooms/${room.id}/messages`);
      reference.on(
        'value',
        snapshot => {
          const responseData = snapshot.val();
          const parsedData = parseMessageList(responseData);
          setMessageList(parsedData);
          setLoading(false);
        },
        error => console.log('Unable to get rooms info. Error: ' + error),
      );
    };

    listenDB();
    console.log(new Date().toISOString());
  }, [navigation, room]);

  const checkDB = () => {
    setRefreshing(true);
    const reference = database().ref(`/rooms/${room.id}/messages`);
    reference
      .once('value')
      .then(snapshot => {
        const responseData = snapshot.val();
        const parsedData = parseMessageList(responseData);
        setMessageList(parsedData);
        setRefreshing(false);
      })
      .catch(error => console.log('Unable to get rooms info. Error: ' + error));
  };

  const handleLike = (item: MessageSchema) => {
    // Update given key-values in the provided ref node
    const reference = database().ref(`/rooms/${room.id}/messages/${item.id}`);
    reference
      .update({
        like: item.like + 1,
      })
      .then(() => console.log('Like number updated'));
  };
  const handleDislike = (item: MessageSchema) => {
    // Update given key-values in the provided ref node
    const reference = database().ref(`/rooms/${room.id}/messages/${item.id}`);
    reference
      .update({
        dislike: item.dislike + 1,
      })
      .then(() => console.log('Dislike number updated'));
  };

  const renderMessageItem = ({item}: {item: MessageSchema}) => (
    <MessageCard
      message={item}
      onLike={() => handleLike(item)}
      onDislike={() => handleDislike(item)}
    />
  );

  const handleSendMessage = (message: string) => {
    setInputModalVisible(false);
    sendMessage(message);
  };

  const sendMessage = (message: string) => {
    const userMail = auth().currentUser?.email;
    const username = userMail ? userMail.split('@')[0] : 'unknown';
    const messageObject = {
      date: new Date().toISOString(),
      dislike: 0,
      like: 0,
      text: message,
      username,
    };
    try {
      database().ref(`/rooms/${room.id}/messages`).push(messageObject);
      console.log(messageObject);
    } catch (error) {
      console.log('Unable to create room. Error: ' + error);
    }

    // If the writing user is not in the users list of the room add him/her
    //  if not do nothing
    let userList: string[] = [];
    const userReference = database().ref(`/rooms/${room.id}/users`);
    userReference.once('value').then(snapshot => {
      const responseData = snapshot.val();
      userList = parseUserList(responseData);
      console.log('Current users: ' + userList);
      if (userList.filter(user => user === username).length >= 1) {
        // Do nothing
      } else {
        try {
          userList.push(username);
          userReference.set(userList).then(() => console.log('Data set'));
          console.log('New users: ' + userList);
        } catch (error) {
          console.log('Unable to add user. Error: ' + error);
        }
      }
    });
  };

  const handleScrollToEnd = () => {
    if (messageList.length <= 3) {
      showFloatingButton(true);
    } else {
      showFloatingButton(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading || refreshing ? (
        <LoadingView message="Sohbet demleniyor..." />
      ) : (
        <>
          {messageList.length === 0 ? (
            <EmptyView message="Gelin tanış olalım!" />
          ) : (
            <FlatList
              data={messageList}
              renderItem={renderMessageItem}
              keyExtractor={item => item.id.toString()}
              onScroll={() => showFloatingButton(true)}
              onEndReached={() => handleScrollToEnd()}
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
          <ModalNewMessage
            isVisible={inputModalVisible}
            onClose={() => setInputModalVisible(false)}
            onSend={handleSendMessage}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default RoomPage;
