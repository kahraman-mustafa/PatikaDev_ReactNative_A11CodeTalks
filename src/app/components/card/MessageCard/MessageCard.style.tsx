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
    borderWidth: 1,
    minHeight: Dimensions.get('window').height * 0.2,
  },
  top_container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
  },
  message: {
    flex: 1,
    color: Colors.drawer_text,
    textAlign: 'left',
    textAlignVertical: 'center',
    fontSize: 16,
    marginHorizontal: 8,
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
    backgroundColor: Colors.container,
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
  likestat_container: {
    //
  },
  dislikestat_container: {
    //
  },
  counter_container: {
    marginRight: 4,
    paddingHorizontal: 6,
    borderRadius: 50,
    backgroundColor: Colors.tertiary,
  },
  likecounter_container: {
    backgroundColor: 'blue',
  },
  dislikecounter_container: {
    backgroundColor: 'red',
  },
  counter: {
    fontSize: 12,
    color: Colors.container,
  },
  likecounter: {
    //
  },
  dislikecounter: {
    //
  },
  icon: {
    color: Colors.tertiary,
  },
  likeicon: {
    color: 'blue',
  },
  dislikeicon: {
    color: 'red',
  },
});
