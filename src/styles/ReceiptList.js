import { StyleSheet } from 'react-native';
import { GroceryGuruRed, GroceryGuruGreen, GroceryGuruPrimary, GroceryGuruYellow, GroceryGuruFadedYellow } from '../styles/Colors';

export default styles = StyleSheet.create({
  receiptListContainer: {
    flex: 1
  },
  emptyReceiptsContainer: {
    borderColor: GroceryGuruYellow,
    borderWidth: 1,
    backgroundColor: GroceryGuruFadedYellow,
    padding: 20,
    margin: 12,
    elevation: 1,
  },
  emptyReceiptsContainerText: {
    textAlign: 'center'
  },
  receiptListItem: {
    height: 36,
    padding: 8,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: GroceryGuruPrimary,
    elevation: 1,
  },
  completed: {
    backgroundColor: GroceryGuruGreen
  },
  incomplete: {
    backgroundColor: GroceryGuruRed
  },
  receiptListItemName: {
    flex: 0.8
  },
  receiptListItemDate: {
    flex: 0.2
  },
  receiptListItemDateText: {
    textAlign: 'right'
  }
});