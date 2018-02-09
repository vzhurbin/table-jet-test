import { data } from '../Data';
import dataHandlers from './dataHandlers';

const headerArr = Object.keys(data[0]).slice(1);

const createHeader = () => {
  const headerHtml = headerArr
    .map((el, i) => {
      const formatHeader = str => {
        str = str.replace('_', ' ');
        return str && str[0].toUpperCase() + str.slice(1);
      };
      return `
        <th class="${el}" id="header-${i}">${formatHeader(el)}</th>
      `;
    })
    .join('');

  return `<tr class="header">${headerHtml}</tr>`;
};

const createOneRow = i => {
  const rowHtml = headerArr
    .map(el => {
      return `
      <td id="${data[i]['id']}" class="${el}">${data[i][el]}</td>
    `;
    })
    .join('');

  return `<tr class="row">${rowHtml}</tr>`;
};

const sortByColumn = (array, key) => {
  return array.sort((a, b) => {
    const x = a[key].toUpperCase();
    const y = b[key].toUpperCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }

    return 0;
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

const table = document.getElementById('table');
const tdArray = [...table.querySelectorAll('td')];
console.log(tdArray.length);

const createRows = (isAssending = true, sortKey = headerArr[0]) => {
  const sortColArr = tdArray.forEach(td => {
    return [...td.textContent];
  })
  console.log(sortColArr);
  const newData = sortByColumn(data, sortKey);
  // const sortedData = isAscending(sortColArr) ? newData.reverse() : newData;
  const rowsHtml = newData
    .map((el, i) => {
      return createOneRow(i);
    })
    .join('');

  return rowsHtml;
};

const fillTableData = (rows = createRows()) => {
  const header = createHeader(headerArr);
  const tableDataHtmlString = header + rows;
  table.innerHTML = tableDataHtmlString;

  const thArray = [...table.querySelectorAll('th')];
  thArray.forEach(th => {
    th.addEventListener('click', e => {
      const rows = createRows(th.className);
      fillTableData(rows);
      dataHandlers();
    });
  });
};

export default fillTableData;
