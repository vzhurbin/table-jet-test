import { data } from '../Data';
import sortColumn from './sortColumn';

const headerArr = Object.keys(data[0]);

const createHeader = (headerArr = []) => {
  const headerHtml = headerArr
    .map((el, i) => {
      return `
      <th id="header-${i}">${el}</th>
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

const createRows = (data = {}) => {
  const rowsHtml = data
    .map((el, i) => {
      return createOneRow(i);
    })
    .join('');

  return rowsHtml;
};

const table = document.getElementById('table');
const fillTableData = () => {
  const headerHtmlString = createHeader(headerArr);
  const rowsHtmlString = createRows(data);
  const tableDataHtmlString = headerHtmlString + rowsHtmlString;

  table.innerHTML = tableDataHtmlString;

  headerArr.forEach((el, i) => {
    const header = document.getElementById(`header-${i}`);
    header.addEventListener('click', e => {
      sortColumn(el);
    });
  });
};

export default fillTableData;
