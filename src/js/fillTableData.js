import { data } from '../Data';

const headerArr = Object.keys(data[0]).slice(1);

const formatHeader = str => {
  str = str.replace('_', ' ');
  return str && str[0].toUpperCase() + str.slice(1);
};

const createHeader = () => {
  const headerHtml = headerArr
    .map(el => {
      return `
        <th id="${el}" class="${el}">${formatHeader(el)}</th>
      `;
    })
    .join('');

  return `<tr class="header">${headerHtml}</tr>`;
};

const createOneRow = (arrOfObj, i) => {
  const rowHtml = headerArr
    .map(el => {
      return `
        <td class="${el}">${arrOfObj[i][el]}</td>
      `;
    })
    .join('');

  return `<tr class="row">${rowHtml}</tr>`;
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
