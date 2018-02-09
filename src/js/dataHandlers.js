const dataHandlers = () => {
  const rowsPerPage = 10;

  const input = document.querySelector('input[type=search]');
  const buttonSubmit = document.querySelector('button.search');
  const table = document.getElementById('table');

  const trArray = [...table.querySelectorAll('tr.row')];


  const filter = () => {
    const query = input.value.trim().toUpperCase();
    trArray.forEach(tr => {
      let data = '';
      const tdArray = [...tr.querySelectorAll('td')];
      tdArray.forEach(td => {
        data += td.textContent;
      });

      if (data.toUpperCase().indexOf(query) > -1) {
        tr.classList.remove('hidden');
      } else {
        tr.classList.add('hidden');
      }
    });

    const filteredRows = [...table.querySelectorAll('tr.row:not(.hidden)')];
    return filteredRows;
  };

  const pageButtons = (pageCount = 1, curPage) => {
    const disablePrevious = curPage === 1 ? 'disabled' : '';
    const disableNext = curPage === pageCount ? 'disabled' : '';
    let buttons = `<input class="page-button switch prev" id="page-button-0" type="button" value="Previous" ${disablePrevious}>`;
    for (let i = 1; i <= pageCount; i += 1) {
      buttons += `<input class="page-button num" type="button" id="page-button-${i}" value="${i}">`;
    }
    buttons += `<input class="page-button switch next" id="page-button-${pageCount+1}" type="button" value="Next" ${disableNext}>`;

    const buttonsDiv = document.getElementById('page-buttons');
    buttonsDiv.innerHTML = buttons;

    for (let j = 1; j <= pageCount; j += 1) {
      const button = document.getElementById(`page-button-${j}`);
      button.addEventListener('click', e => {
        visibleRows(j);
      });
    }

    const buttonPrev = document.querySelector('.switch.prev');
    buttonPrev.addEventListener('click', e => visibleRows(curPage - 1));
    const buttonNext = document.querySelector('.switch.next');
    buttonNext.addEventListener('click', e => visibleRows(curPage + 1));
  };

  const visibleRows = (curPage = 1) => {
    const filteredRows = filter();
    const dataArray = filteredRows.length >= 0 ? filteredRows : trArray;
    dataArray.forEach((tr, i) => {
      const isHeader = tr.firstElementChild.tagName === 'TH';
      const startRow = rowsPerPage * curPage - rowsPerPage;
      const endRow = rowsPerPage * curPage - 1;

      if (isHeader || (i >= startRow && i <= endRow)) {
        tr.classList.remove('hidden');
      } else {
        tr.classList.add('hidden');
      }
    });

    const pageCount = Math.ceil(dataArray.length / rowsPerPage);
    pageButtons(pageCount, curPage);

    const buttons = [...document.querySelectorAll('.page-button')];
    buttons.forEach((button, i) => {
      if (i === curPage) {
        button.classList.remove('inactive');
      } else {
        button.classList.add('inactive');
      }
    });
  };

  buttonSubmit.addEventListener('click', e => {
    e.preventDefault();
    visibleRows();
  });

  visibleRows();
};

export default dataHandlers;
