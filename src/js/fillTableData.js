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

const createRows = () => {
  const rowsHtml = data
    .map((el, i) => {
      return createOneRow(i);
    })
    .join('');

  return rowsHtml;
};

const fillTableData = (rows = createRows()) => {
  const header = createHeader(headerArr);
  const tableDataHtmlString = header + rows;
  const table = document.getElementById('table');
  table.innerHTML = tableDataHtmlString;

  const thArray = Array.from(document.querySelectorAll('th'));
  thArray.forEach(th => {
    th.addEventListener('click', e => {
      const rows = createRows(th.className);
      fillTableData(rows);
      dataHandlers();
      sorting();
    });
  });
};

export default fillTableData;
