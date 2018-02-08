const dataHandlers = () => {
  const rowsPerPage = 5;

  const form = document.querySelector('form');
  const input = document.querySelector('input[type=search]');
  const buttonSubmit = document.querySelector('button.search');
  const table = document.getElementById('table');

  const trArray = [...table.querySelectorAll('tr.row')];

  const firstRowTag = table.rows[0].firstElementChild.tagName;
  const hasHeader = firstRowTag === 'TH';

  const filter = () => {
    const query = input.value.trim().toUpperCase();
    trArray.forEach(tr => {
      let data = '';
      const tdArray = [...tr.querySelectorAll('td')];
      tdArray.forEach(td => {
        data += td.textContent;
      });

      // Check the string for a match and show/hide row as needed
      if (data.toUpperCase().indexOf(query) > -1) {
        // console.log(data.toUpperCase());
        tr.classList.remove('hidden');
      } else {
        tr.classList.add('hidden');
        // console.log(trArray.classList.);
      }
    });

    const filteredRows = [...table.querySelectorAll('tr.row:not(.hidden)')];
    return filteredRows;
  };

  const visibleRows = (pageNum = 1) => {
    const filteredRows = filter();
    const dataArray = filteredRows.length >= 0 ? filteredRows : trArray;
    dataArray.forEach((tr, i) => {
      const isHeader = tr.firstElementChild.tagName === 'TH';
      const startRow = rowsPerPage * pageNum - rowsPerPage;
      const endRow = rowsPerPage * pageNum - 1;

      if (isHeader || (i >= startRow && i <= endRow)) {
        tr.classList.remove('hidden');
      } else {
        tr.classList.add('hidden');
      }
    });

    const pageCount = Math.ceil(dataArray.length / rowsPerPage);
    pageButtons(pageCount);

    const buttons = [...document.querySelectorAll('.btn')];
    buttons.forEach((btn, i) => {
      if (i + 1 === pageNum) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  buttonSubmit.addEventListener('click', e => {
    e.preventDefault();
    visibleRows();
    // form.reset();
  });
  // input.addEventListener('keyup', e => filter());

  const pageButtons = (pageCount = 1) => {
    /* disable the 'Prev' button on 1st page
    and 'Next' button on last page 
    const	disablePrevious = (cur === 1) ? 'disabled' : '';
    const disableNext = (cur === pCount) ? 'disabled' : '';
    */
    // let buttons =
    // `<input type="button" value="&lt;&lt; Prev" id="page-0" onclick="sort(${cur - 1})" ${prevDis}>`;
    let buttons = '';
    for (let i = 1; i <= pageCount; i++) {
      buttons += `<input class="btn" type="button" id="page-btn-${i}" value="${i}">`;
    }
    // buttons += `<input type="button" value="Next &gt;&gt;" id="page-${i + 1}" onclick="sort(${(cur + 1)})" ${nextDis}>`;

    const buttonsDiv = document.getElementById('buttons');
    buttonsDiv.innerHTML = buttons;

    for (let i = 1; i <= pageCount; i++) {
      const btn = document.getElementById(`page-btn-${i}`);
      btn.addEventListener('click', e => {
        visibleRows(i);
        btn.classList.add('active');
      });
    }
  };

  visibleRows();
};

export default dataHandlers;
