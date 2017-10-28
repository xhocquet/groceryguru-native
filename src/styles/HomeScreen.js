import { StyleSheet } from 'react-native';
import { GroceryGuruPrimary, GroceryGuruWhite } from './Colors';

export default styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: GroceryGuruWhite,
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  uploadButton: {
    backgroundColor: GroceryGuruPrimary,
    height: 200,
    justifyContent: 'center',
    marginLeft: 24,
    marginRight: 24,
    padding: 24,
    elevation: 3
  },
  uploadButtonText: {
    color: GroceryGuruWhite,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginContainer: {
    margin: 8,
    padding: 8,
  },
  loginHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GroceryGuruPrimary,
    textAlign: 'center'
  },
  loginInput: {
    marginTop: 24
  }
});