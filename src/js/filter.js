export const filterSearch = () => {
  
  const input = document.getElementById('input');
  const table = document.getElementById('table');

  const trArray = [...table.querySelectorAll('tr.row')];
  
  const filter = () => {
    const search = input.value.trim().toUpperCase();
    // Loop the rows
    trArray.forEach(tr => {
      let data = '';
      // Loop over all the cells in the current row and concatenate their text
      const tdArray = [...tr.querySelectorAll('td')];      
      tdArray.forEach(td => {
        data += td.textContent;  
      });
  
      // Check the string for a match and show/hide row as needed
      if(data.toUpperCase().indexOf(search) > -1){
        tr.classList.remove('hidden');
      } else {
        tr.classList.add('hidden');
      }
    });
  };

  input.addEventListener('keyup', e => filter());
  input.addEventListener('search', e => filter());
};
