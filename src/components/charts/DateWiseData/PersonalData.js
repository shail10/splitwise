import { indexToMonth } from '../../../utils/IndexToMonth';

const PersonalData = (filteredArray, currentUser) => {
  filteredArray = filteredArray.filter((transact) =>
    transact.students.find((transactPaidFor) => transactPaidFor.paidFor === currentUser.username && transactPaidFor.percentage > 0),
  );
  // console.log(filteredArray)
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
      filteredArray[i].students.map((transactPaidFor) => {
        if (transactPaidFor.paidFor === currentUser.username) {
          a += Math.round(filteredArray[i].amount * (transactPaidFor.percentage / 100));
        }
      });
      i++;
    }
    if (i < filteredArray.length) {
      main_array.push({
        xLabel: `${indexToMonth[month]} ${year}`,
        amount: a,
      });
      filteredArray[i].students.map((transactPaidFor) => {
        if (transactPaidFor.paidFor === currentUser.username) {
          a = Math.round(filteredArray[i].amount * (transactPaidFor.percentage / 100));
        }
      });
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

export default PersonalData;
