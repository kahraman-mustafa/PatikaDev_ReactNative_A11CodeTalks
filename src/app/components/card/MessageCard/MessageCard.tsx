import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {formattedDate} from '../../../../api/date-fns-tz/dateFormatter';
import {MessageSchema} from '../../../pages/RoomPage/RoomPage';
import styles from './MessageCard.style';

type MessageCardProps = {
  message: MessageSchema;
  onLike: any;
  onDislike: any;
};

const MessageCard = ({message, onLike, onDislike}: MessageCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        <Text style={styles.message}>{message.text}</Text>
        <Text style={styles.date}>
          "{message.username}" - {formattedDate(message.date)}
        </Text>
      </View>
      <View style={styles.footer_container}>
        <TouchableOpacity
          style={[styles.quickstat_container, styles.likestat_container]}
          onPress={onLike}>
          <View
            style={[styles.counter_container, styles.likecounter_container]}>
            <Text style={[styles.counter, styles.likecounter]}>
              {message.like}
            </Text>
          </View>
          <Icon
            name="thumb-up"
            size={24}
            style={[styles.icon, styles.likeicon]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickstat_container, styles.dislikestat_container]}
          onPress={onDislike}>
          <View
            style={[styles.counter_container, styles.dislikecounter_container]}>
            <Text style={[styles.counter, styles.dislikecounter]}>
              {message.dislike}
            </Text>
          </View>
          <Icon
            name="thumb-down"
            size={24}
            style={[styles.icon, styles.dislikeicon]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageCard;
