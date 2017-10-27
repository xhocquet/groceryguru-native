import { StyleSheet } from 'react-native';
import { GroceryGuruPrimary } from '../styles/Colors';

export default styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  uploadButton: {
    backgroundColor: GroceryGuruPrimary,
    height: 200,
    justifyContent: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 96,
    padding: 24,
  },
  uploadButtonText: {
    color: '#ecf0f1',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  settingsButton: {
    backgroundColor: GroceryGuruPrimary,
    flexDirection: 'row',
    height: 72,
    alignItems: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 48,
  },
  settingsButtonText: {
    color: '#ecf0f1',
    fontSize: 24,
    flex: 1,
    textAlign: 'center',
  },
  settingsIcon: {
    flex: 0.1,
    color: '#ecf0f1',
    fontSize: 24,
  },
  loginContainer: {
    margin: 8,
    padding: 8
  },
  loginHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GroceryGuruPrimary,
    textAlign: 'center'
  },
  loginInput: {
    marginTop: 24
  },
  logoutButton: {
    backgroundColor: GroceryGuruPrimary,
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 12,
  },
  logoutButtonText: {
    color: '#ecf0f1',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  }
});