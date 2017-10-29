import { Alert } from 'react-native';

export function alert(title, message = '') {
  Alert.alert(
    title,
    message,
    [{text: 'OK', onPress: () => true }],
    { cancelable: false }
  );
}