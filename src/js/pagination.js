export const pagination = (rowsPerPage = 7) => {
  const table = document.querySelector('table');
  const rowCount = table.rows.length; // number of rows in the table
  const firstRowTag = table.rows[0].firstElementChild.tagName;
  // boolean var to check if table has a head row
  const hasHead = (firstRowTag === 'TH');
  // start from 2nd row if the first row is header
  const firstDataRow = (hasHead) ? 1 : 0;
  // holds the first row if it has a (<TH>) & nothing if (<TD>)
  const header = (hasHead) ? table.rows[(0)].outerHTML : '';
  // count the number of pages
  const pageCount = Math.ceil(rowCount / rowsPerPage);
  // an array to hold each row
  let tr = [];

  // if we had one page only; then we have nothing to do ..
  if (pageCount > 1) {
    // assign each row outHTML (tag name & innerHTML) to the array
    for (let i = firstDataRow, j = 0; i < rowCount; i++ , j++) {
      tr[j] = table.rows[i].outerHTML;
    }
    // console.log(tr);
    // create a div block to hold the buttons
    table.insertAdjacentHTML('afterend', '<div id="buttons"></div');
    // the first sort; default page is the first one
    sort(1);
  }

  // (pageNum) is the selected page number. it will be generated when a user clicks a button
  function sort(pageNum) {
    let rows = header;
    const startRow = ((rowsPerPage * pageNum) - rowsPerPage);
    for (let i = startRow; i < (startRow + rowsPerPage) && i < tr.length; i++) {
      rows += tr[i];
    }

    // now the table has a processed group of rows
    table.innerHTML = rows;

    // create pagination buttons
    const buttonsDiv = document.getElementById('buttons');
    const buttonsHtml = pageButtons(pageCount);
    buttonsDiv.innerHTML = buttonsHtml;

    for (let i = 1; i < pageCount; i++) {
      const btn = document.getElementById(`page-${i}`);
      btn.addEventListener('click', e => sort(i));
    }
  }

  function pageButtons(pageCount) {
   /* disable the 'Prev' button on 1st page
      and 'Next' button on last page 
      const	disablePrevious = (cur === 1) ? 'disabled' : '';
      const disableNext = (cur === pCount) ? 'disabled' : '';
    */
    // let buttons = 
    // `<input type="button" value="&lt;&lt; Prev" id="page-0" onclick="sort(${cur - 1})" ${prevDis}>`;
    let buttons = '';
    for (let i = 1; i < pageCount; i++) {
      buttons += `<input type="button" id="page-${i}" value="${i}">`;
    }
    // buttons += `<input type="button" value="Next &gt;&gt;" id="page-${i + 1}" onclick="sort(${(cur + 1)})" ${nextDis}>`;

    return buttons;
  }
}
