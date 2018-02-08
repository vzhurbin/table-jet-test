const sortColumn = columnClassName => {
  const table = document.getElementById('table');
  const trArray = [...table.querySelectorAll('tr.row')];
  const headerArray = [...table.querySelectorAll('th')];

  // trArray.forEach(tr => {

  // let data = '';
  const tdArray = [...table.querySelectorAll(`td.${columnClassName}`)];

  const newArray = tdArray.map(td => {
    return td.textContent;
  });

  console.log(newArray.sort());

  // tdArray.sort();
  // tdArray.forEach(td => {
  //   data += td.textContent;
  // })

  // const columnArray = [...table.querySelectorAll(`td.${columnClassName}`)];
  // columnArray.sort();
  // })

  headerArray.forEach((el, i) => {
    const header = document.getElementById(`header-${i}`);
    header.addEventListener('click', e => sortColumn(el));
  });
};

export default sortColumn;
