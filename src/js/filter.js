export const filterSearch = () => {
  
  const form = document.querySelector('form');
  const input = document.querySelector('input[type=search]');
  const button = document.querySelector('button.search');
  const table = document.getElementById('table');

  const trArray = [...table.querySelectorAll('tr.row')];
  
  const filter = () => {
    const query = input.value.trim().toUpperCase();
    console.log(query);
    // Loop the rows
    const filteredRows = trArray.forEach(tr => {
      let data = '';
      // Loop over all the cells in the current row and concatenate their text
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
    console.log(filteredRows);
    return filteredRows;
  };

  button.addEventListener('click', e => {
    e.preventDefault();
    filter();
    form.reset();
  });
  // input.addEventListener('keyup', e => filter());
};
