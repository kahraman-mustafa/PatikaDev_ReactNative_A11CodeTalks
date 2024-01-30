import React from 'react';
import {TextInput, View} from 'react-native';
import Modal from 'react-native-modal';
import Button from '../../Button';
import styles from './ModalNewMessage.style';

const ModalNewMessage = ({isVisible, onClose, onSend}) => {
  const [text, setText] = React.useState('');

  const handleSend = () => {
    if (!text) {
      return;
    }

    onSend(text);
    setText('');
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      swipeDirection="down"
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TextInput
            placeholder="Odaya bir isim ver..."
            onChangeText={setText}
          />
        </View>
        <Button title="Gönder" onPress={handleSend} />
      </View>
    </Modal>
  );
};

export default ModalNewMessage;
