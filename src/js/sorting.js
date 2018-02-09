const sortArrOfObj = (array, key) => {
  return array.sort((a, b) => {
    const x = a[key].toUpperCase();
    const y = b[key].toUpperCase();
    return x > y ? 1 : x < y ? -1 : 0;
  });
};

// const isAscending = arr => {
//   return arr.every((x, i) => {
//     return i === 0 || x >= arr[i - 1];
//   });
// };

const isAscending = arr => {
  return arr.every((val, i, arr) => {
    !i || val >= arr[i - 1];
  });
};

const sorting = (data, sortKey) => {
  const tdArray = Array.from(document.querySelectorAll(`td.${sortKey}`));
  let sortCol = [];
  tdArray.forEach(td => {
    sortCol.push(td.textContent);
  });
  console.log(isAscending(sortCol));
  const sortAscendig = sortArrOfObj(data, sortKey);

  return !isAscending(sortCol) ? sortAscendig : sortAscendig.reverse();
};

export default sorting;
