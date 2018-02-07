export const pagination = (rowsPerPage) => {
  const form = document.querySelector('form');
  const input = document.querySelector('input[type=search]');
  const button = document.querySelector('button.search');
  const table = document.getElementById('table');

  const trArray = [...table.querySelectorAll('tr.row')];
  const pageCount = Math.ceil(trArray.length / rowsPerPage);
  
  const firstRowTag = table.rows[0].firstElementChild.tagName;
  const hasHeader = (firstRowTag === 'TH');

  const filter = () => {
    const query = input.value.trim().toUpperCase();
    console.log(query);
    const filteredRows = trArray.forEach(tr => {
      let data = '';
      const tdArray = [...tr.querySelectorAll('td')];      
      tdArray.forEach(td => {
        data += td.textContent;  
      });
  
      // Check the string for a match and show/hide row as needed
      if(data.toUpperCase().indexOf(query) > -1){
        tr.classList.remove('hidden');
      } else {
        tr.classList.add('hidden');
      }
    });

    return filteredRows;
  };
  
  const visibleRows = (pageNum = 1) => {
    console.log('visible rows');
    trArray.forEach((tr, i) => {
      const isHeader = tr.firstElementChild.tagName === 'TH';
      const startRow = (rowsPerPage * pageNum) - rowsPerPage;
      const endRow = (rowsPerPage * pageNum) - 1;
      
      if (isHeader || (i >= startRow && i <= endRow)) {
        tr.classList.remove('hidden');
      } else {
        tr.classList.add('hidden');
      }
    });

    pageButtons(pageCount);
  };
  
  // button.addEventListener('click', e => {
  //   e.preventDefault();
  //   filter();
  //   form.reset();
  // });
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
      buttons += `<input type="button" id="page-btn-${i}" value="${i}">`;
    }
    // buttons += `<input type="button" value="Next &gt;&gt;" id="page-${i + 1}" onclick="sort(${(cur + 1)})" ${nextDis}>`;
    
    const buttonsDiv = document.getElementById('buttons');
    buttonsDiv.innerHTML = buttons;
    
    for (let i = 1; i <= pageCount; i++) {
      const btn = document.getElementById(`page-btn-${i}`);
      btn.addEventListener('click', e => visibleRows(i));
    }
    // console.log(buttonsDiv);
  }
  
  // pageButtons(pageCount);
  visibleRows();
  };
  