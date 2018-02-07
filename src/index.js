import sortColumn from './js/sortColumn';
import { data } from './Data';

const table = document.getElementById('table');
const headerArr = Object.keys(data[0]);

const createHeader = (headerArr = []) => {
  const headerHtml = headerArr.map((el, i) => {
    return `
      <th id="header-${i}">${el}</th>
    `;
  }).join('');

  console.log(headerHtml);
  return `<tr class="header">${headerHtml}</tr>`;
}

const createOneRow = (i) => {
  const rowHtml = headerArr.map(el => {
    return `
      <td class="${el}">${data[i][el]}</td>
    `;
  }).join('');
  
  return `<tr class="row">${rowHtml}</tr>`;
}

const createRows = (data = {}) => {
  const rowsHtml = data.map((el, i) => {
    return createOneRow(i);
  }).join('');

  return rowsHtml;
}

const fillTable = (table) => {
  const headerHtmlString = createHeader(headerArr);
  const rowsHtmlString = createRows(data);
  const tableDataHtmlString = headerHtmlString + rowsHtmlString

  table.innerHTML = tableDataHtmlString;
};

window.onload = () => fillTable();

// header.addEventListener('click', e => sortColumn('name'));
const body = document.body;
for (let i = 0, len = headerArr.length; i < len; i++) {
  let headerName = headerArr[i];
  // console.log(headerName);
  // console.log(typeof headerName);
  // console.log(typeof `.${headerName}`);
  // let header = document.querySelector(`th.${headerName}`);
  const header = body.getElementById(`header-${i}`);
  console.log(header);
  console.log(`header-${i}`);
  header.addEventListener('click', e => sortColumn(headerName));
}