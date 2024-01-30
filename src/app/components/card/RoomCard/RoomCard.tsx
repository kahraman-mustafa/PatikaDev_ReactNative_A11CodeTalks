import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {formattedDate} from '../../../../api/date-fns-tz/dateFormatter';
import {RoomSchema} from '../../../pages/Rooms/Rooms';
import styles from './RoomCard.style';

type RoomCardProps = {
  room: RoomSchema;
  onEnterRoom: any;
};

const RoomCard = ({room, onEnterRoom}: RoomCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onEnterRoom}>
      <View style={styles.top_container}>
        <Text style={styles.roomName}>{room.name}</Text>
        <Text style={styles.date}>
          {formattedDate(room.createdAt)} by "{room.founder}"
        </Text>
      </View>
      <View style={styles.footer_container}>
        <View style={[styles.quickstat_container, styles.userstat_container]}>
          <View
            style={[styles.counter_container, styles.usercounter_container]}>
            <Text style={[styles.counter, styles.usercounter]}>
              {room.users.length}
            </Text>
          </View>
          <Icon
            name="account-box-multiple"
            size={24}
            style={[styles.icon, styles.usericon]}
          />
        </View>
        <View
          style={[styles.quickstat_container, styles.messagestat_container]}>
          <View
            style={[styles.counter_container, styles.messagecounter_container]}>
            <Text style={[styles.counter, styles.messagecounter]}>
              {Object.keys(room.messages).length}
            </Text>
          </View>
          <Icon
            name="message-bulleted"
            size={24}
            style={[styles.icon, styles.messageicon]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RoomCard;
