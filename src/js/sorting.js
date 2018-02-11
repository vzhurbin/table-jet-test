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
  const sortCol = tdArray.map(td => {
    return strFormat(td.textContent);
  });
  const sortAsc = sortAscending(data, sortKey);
  const header = document.querySelector(`th.${sortKey}`);
  if (isAsc(sortCol)) {
    header.classList.add('sorted-desc');
    return sortAsc.reverse();
  } else {
    header.classList.add('sorted-asc');
    return sortAsc;
  }
};

const headerListeners = () => {
  const thArray = Array.from(document.querySelectorAll('th'));
  thArray.map(th => {
    th.addEventListener('click', e => {
      thArray.map(th => {
        th.classList.remove('sorted-desc', 'sorted-asc');
      });
      const sortedData = sortData(th.id);
      fillData(sortedData);
      dataHandlers();
      const tdArray = Array.from(document.querySelectorAll(`td.${th.id}`));
      tdArray.map(td => {
        td.classList.add('sorted');
      });
    });
  });
};

export default headerListeners;
