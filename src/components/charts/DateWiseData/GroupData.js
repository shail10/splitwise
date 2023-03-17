import { indexToMonth } from '../../../utils/IndexToMonth';

const GroupData = (filteredArray) => {
  let main_array = [];
  let a = 0;
  let d = new Date(filteredArray[0].date);
  let month = d.getMonth();
  let year = d.getFullYear();
  for (let i = 0; i < filteredArray.length; i++) {
    while (
      i < filteredArray.length &&
      new Date(filteredArray[i].date).getMonth() === month &&
      new Date(filteredArray[i].date).getFullYear() === year
    ) {
      a = a + filteredArray[i].amount;
      i++;
      // console.log(a)
    }
    if (i < filteredArray.length) {
      main_array.push({
        xLabel: `${indexToMonth[month]} ${year}`,
        amount: a,
      });
      a = filteredArray[i].amount;
      month = new Date(filteredArray[i].date).getMonth();
      year = new Date(filteredArray[i].date).getFullYear();
    }
  }
  main_array.push({
    xLabel: `${indexToMonth[month]} ${year}`,
    amount: a,
  });
  return main_array;
};

export default GroupData;
