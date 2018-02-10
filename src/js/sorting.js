import dataHandlers from './dataHandlers';
import { fillData } from './fillTableData';
import { data } from '../Data';

const sortAscending = (data, key) => {
  return data.sort((a, b) => {
    const x = a[key].toUpperCase();
    const y = b[key].toUpperCase();
    return x > y ? 1 : x < y ? -1 : 0;
  });
};

const isAsc = arr => {
  return arr.every((x, i) => {
    return i === 0 || x >= arr[i - 1];
  });
};

const sortData = sortKey => {
  const tdArray = Array.from(document.querySelectorAll(`td.${sortKey}`));
  let sortCol = [];
  tdArray.forEach(td => {
    sortCol.push(td.textContent);
  });
  console.log(isAsc(sortCol));
  const sortAsc = sortAscending(data, sortKey);

  return isAsc(sortCol) ? sortAsc.reverse() : sortAsc;
};

const headerListeners = () => {
  const thArray = Array.from(document.querySelectorAll('th'));
  thArray.forEach(th => {
    th.addEventListener('click', e => {
      const sortedData = sortData(th.className);
      console.log(th.className);
      fillData(sortedData);
      dataHandlers();
    });
  });
};

export { headerListeners, sortData };
