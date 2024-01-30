import {Dimensions, StyleSheet} from 'react-native';
import Colors from '../../../../styles/Color';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.container,
    margin: 8,
    padding: 8,
    paddingBottom: 0,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 2,
    minHeight: Dimensions.get('window').height * 0.25,
  },
  top_container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
  },
  roomName: {
    flex: 1,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
  },
  date: {
    fontStyle: 'italic',
    color: Colors.drawer_text,
    alignSelf: 'center',
    textAlignVertical: 'bottom',
    fontSize: 10,
    marginBottom: 4,
  },
  footer_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickstat_container: {
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 8,
    margin: 5,
    borderRadius: 25,
  },
  userstat_container: {
    //
  },
  messagestat_container: {
    //
  },
  counter_container: {
    marginRight: 4,
    paddingHorizontal: 6,
    borderRadius: 50,
    backgroundColor: Colors.tertiary,
  },
  usercounter_container: {
    //
  },
  messagecounter_container: {
    //
  },
  counter: {
    fontSize: 12,
    color: Colors.container,
  },
  usercounter: {
    //
  },
  messagecounter: {
    //
  },
  icon: {
    color: Colors.tertiary,
  },
  usericon: {
    color: Colors.tertiary,
  },
  messageicon: {
    color: Colors.tertiary,
  },
});
