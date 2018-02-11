import { data } from '../Data';

const formatHeader = str => {
  str = str.replace('_', ' ');
  return str && str[0].toUpperCase() + str.slice(1);
};

const createHeader = () => {
  const headerArr = Object.keys(data[0]).slice(1);
  const thHtml = headerArr
    .map(header => {
      return `
        <th id="${header}" class="${header}">${formatHeader(header)}</th>
      `;
    })
    .join('');

  return `<tr class="header">${thHtml}</tr>`;
};

const createOneRow = (arrOfObj, i) => {
  const headerArr = Object.keys(data[0]).slice(1);
  const tdHtml = headerArr
    .map(header => {
      return `
        <td class="${header}">${arrOfObj[i][header]}</td>
      `;
    })
    .join('');

  return `<tr class="row">${tdHtml}</tr>`;
};

const createRows = arrOfObj => {
  return arrOfObj
    .map((el, i) => {
      return createOneRow(arrOfObj, i);
    })
    .join('');
};

const fillHeader = () => {
  const headerBody = document.querySelector('tbody.header');
  const headerHtml = createHeader(data);
  headerBody.insertAdjacentHTML('afterBegin', headerHtml);
};

const fillData = (arrOfObj = data) => {
  const dataBody = document.querySelector('tbody.data');
  const rowsHtml = createRows(arrOfObj);
  dataBody.innerHTML = rowsHtml;
};

export { fillData, fillHeader };
