import { StyleSheet } from 'react-native';
import { GroceryGuruRed, GroceryGuruYellow, GroceryGuruGreen, GroceryGuruFadedYellow } from '../styles/Colors';

export default styles = StyleSheet.create({
  statsScreen: {
    flex: 1,
  },
  emptyStatsContainer: {
    borderColor: GroceryGuruYellow,
    borderWidth: 1,
    backgroundColor: GroceryGuruFadedYellow,
    padding: 20,
    margin: 12
  },
  emptyStatsContainerText: {
    textAlign: 'center'
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  statsBox: {
    height: '20%',
    marginLeft: 24,
    marginRight: 24,
    justifyContent: 'center'
  },
  'worst-transactions': {
    backgroundColor: GroceryGuruRed
  },
  'improvable-transactions': {
    backgroundColor: GroceryGuruYellow
  },
  'best-transactions': {
    backgroundColor: GroceryGuruGreen
  },
  statsLabelWrapper: {
    backgroundColor: '#ecf0f1',
    margin: 24,
    padding: 8
  },
  statsLabel: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
});