const filter = () => {
  const input = document.querySelector('input[type=search]');
  const query = input.value.trim().toUpperCase();
  const trArray = Array.from(document.querySelectorAll('tr.row'));
  trArray.forEach(tr => {
    let data = '';
    const tdArray = Array.from(tr.querySelectorAll('td'));
    tdArray.forEach(td => {
      data += td.textContent;
    });

    if (data.toUpperCase().indexOf(query) > -1) {
      tr.classList.remove('hidden');
    } else {
      tr.classList.add('hidden');
      tr.classList.remove('odd');
    }
  });

  const visibleRows = document.querySelectorAll('tr.row:not(.hidden)');
  return visibleRows;
};

const pageButtons = (pageCount = 1, curPage) => {
  const disablePrevious = curPage === 1 ? 'disabled' : '';
  const disableNext = curPage === pageCount ? 'disabled' : '';

  let buttons = `<input type="button" class="page-btn switch prev" value="Previous" ${disablePrevious}>`;

  for (let i = 1; i <= pageCount; i += 1) {
    buttons += `<input type="button" id="page-btn-${i}" class="page-btn" value="${i}">`;
  }

  buttons += `<input type="button" class="page-btn switch next" value="Next" ${disableNext}>`;

  const buttonsDiv = document.querySelector('.page-buttons');
  buttonsDiv.innerHTML = buttons;

  for (let j = 1; j <= pageCount; j += 1) {
    const button = document.querySelector(`#page-btn-${j}`);
    button.addEventListener('click', e => {
      visibleRows(j);
    });
  }

  const buttonPrev = document.querySelector('.switch.prev');
  buttonPrev.addEventListener('click', e => visibleRows(curPage - 1));
  const buttonNext = document.querySelector('.switch.next');
  buttonNext.addEventListener('click', e => visibleRows(curPage + 1));
};

const visibleRows = (curPage = 1, rowsPerPage = 10) => {
  const filteredRows = filter();
  const allRows = Array.from(document.querySelectorAll('tr.row'));
  const dataArray = filteredRows.length >= 0 ? filteredRows : allRows;
  dataArray.forEach((tr, i) => {
    const startRow = rowsPerPage * curPage - rowsPerPage;
    const endRow = rowsPerPage * curPage - 1;
    if (i >= startRow && i <= endRow) {
      tr.classList.remove('hidden');
      if (i % 2 !== 0) {
        tr.classList.add('odd');
      }
    } else {
      tr.classList.add('hidden');
      tr.classList.remove('odd');
    }
  });

  const pageCount = Math.ceil(dataArray.length / rowsPerPage);
  pageButtons(pageCount, curPage);

  const buttons = Array.from(document.querySelectorAll('.page-btn'));
  buttons.forEach((button, i) => {
    if (i === curPage) {
      button.classList.remove('inactive');
    } else {
      button.classList.add('inactive');
    }
  });
};

const dataHandlers = () => {
  const buttonSubmit = document.querySelector('button.search');
  buttonSubmit.addEventListener('click', e => {
    e.preventDefault();
    visibleRows();
  });

  visibleRows();
};

export default dataHandlers;
