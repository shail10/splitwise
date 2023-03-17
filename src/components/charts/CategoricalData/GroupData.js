import { useSelector } from 'react-redux';
import { CATEGORIES } from '../../../utils/formConstants';

const GroupData = () => {
  const allTransaction = useSelector((state) => state.transaction.transactions);

  const groupData = [];
  CATEGORIES.map((category) => {
    groupData.push({ xLabel: category, amount: 0 });
  });

  allTransaction.map((transact) => {
    let amount = transact.amount;
    let category = transact.categories;
    groupData.map((data) => {
      if (data.xLabel === category) {
        data.amount += amount;
      }
    });
  });

  return groupData;
};
export default GroupData;
