import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from '../../app/pages/auth/Login';
import Sign from '../../app/pages/auth/Sign';
import Colors from '../../styles/Color';
import {toPascalCase} from '../../utils/textUtils';
import Rooms from '../pages/Rooms';
import {stackNavOpts} from './options';
import {AUTH_STACK, LOGIN_PAGE, ROOMS_PAGE, SIGN_PAGE} from './routes';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={stackNavOpts}>
      <Stack.Screen name={LOGIN_PAGE} component={Login} />
      <Stack.Screen name={SIGN_PAGE} component={Sign} />
    </Stack.Navigator>
  );
};

const Router = () => {
  const [userSession, setUserSession] = React.useState<boolean>();

  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      /*
        About!! mark:
        https://7.dev/what-does-the-double-exclamation-mark-mean-in-javascript/
        When the !! operator is applied to a value, it first negates
        the boolean value of that value and then negates it again.
        This double negation effectively casts the value
        to its boolean equivalent.
      */
      setUserSession(!!user);
    });
  }, []);

  const renderHeaderIcon = ({iconName}: {iconName: string}) => {
    let displayName = auth().currentUser?.email?.split('@')[0];
    return (
      <View style={styles.userInfoContainer}>
        <Text style={styles.userInfoText}>{toPascalCase(displayName)}</Text>
        <Icon
          name={iconName}
          size={32}
          color={Colors.secondary}
          onPress={() => auth().signOut()}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userInfoText: {
      color: Colors.secondary,
      marginRight: 2,
      fontSize: 12,
    },
  });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={stackNavOpts}>
        {!userSession ? (
          <Stack.Screen name={AUTH_STACK} component={AuthStack} />
        ) : (
          <Stack.Group
            screenOptions={{
              ...stackNavOpts,
              headerShown: true,
              headerLeft: () => null,
              headerRight: () => renderHeaderIcon({iconName: 'exit-to-app'}),
            }}>
            <Stack.Screen name={ROOMS_PAGE} component={Rooms} />
          </Stack.Group>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default Router;
