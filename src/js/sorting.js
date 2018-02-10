import dataHandlers from './dataHandlers';
import { fillData } from './fillTableData';
import { data } from '../Data';

const strFormat = str => {
  let newStr = str.trim();
  const isUsd = str => str.match(/^\$/) !== null;
  if (isUsd(newStr)) {
    return Number(newStr.replace(/[^0-9.-]+/g, ''));
  } else {
    return newStr.toUpperCase();
  }
};

const sortAscending = (data, key) => {
  return data.sort((a, b) => {
    const x = strFormat(a[key]);
    const y = strFormat(b[key]);
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
    const value = strFormat(td.textContent);
    sortCol.push(value);
  });
  const sortAsc = sortAscending(data, sortKey);

  return isAsc(sortCol) ? sortAsc.reverse() : sortAsc;
};

const headerListeners = () => {
  const thArray = Array.from(document.querySelectorAll('th'));
  thArray.forEach(th => {
    th.addEventListener('click', e => {
      const sortedData = sortData(th.className);
      fillData(sortedData);
      dataHandlers();
    });
  });
};

export default headerListeners;
