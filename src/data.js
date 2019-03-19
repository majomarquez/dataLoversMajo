//FILTRAR
const filterTag = (data, condition) => {
    let filteredTag = Object.keys(data).filter(function(key){ // recorre y envia un array nuevo
		let element = data[key];
        return element.tags.includes(condition)  //revisa si la condicion es verdadera o falsa
    })
    return filteredTag;
};

// Calculo
const calculate = (Data, condition) => {
  let counter=0;
  Data.forEach(element => {
      if (element.type.includes(condition)){
          counter=counter+1;
      }
  });
  return Math.round((counter/143)*100) +"%";
}


// Ordenar
const sortChampions = (data, sortBy, sortOrder) => {
    data.sort(function(a, b){
      if(a < b) { return -1; }
      if(a > b) { return 1; }
      return 0;
    });
    if(sortOrder === 'za'){
      data.sort(function(a, b){
        if(a > b) { return -1; }
        if(a < b) { return 1; }
        return 0;
      });
    }
    return data;
}
function arrangeChampions(data, keys, atribType, limit) {
  let champsList = [];
  for (let i = 0; i < keys.length-1; i++) {
    let key = keys[i];
    if (!isNaN(limit) && data[key].info[atribType] <= limit) {
      champsList.push(data[key].id);
    } else if (isNaN(limit) && data[key].info[atribType] > 5 ) {
      champsList.push(data[key].id);
    }
	}

  return champsList;
}

const selectChampions = (data, keys, selected) => {
  let champs = [];

  switch (selected) {
    case 'attackLess':
      champs = arrangeChampions(data, keys, 'attack', 5);
      break;
    case 'attackMore':
      champs = arrangeChampions(data, keys, 'attack', 'none');
      break;
    case 'defenseLess':
      champs = arrangeChampions(data, keys, 'defense', 5);
      break;
    case 'defenseMore':
      attributes = arrangeChampions(data, keys, 'defense', 'none');
      break;
    case 'magicLess':
      champs = arrangeChampions(data, keys, 'magic', 5);
      break;
    case 'magicMore':
      champs = arrangeChampions(data, keys, 'magic', 'none');
      break;
  }
  champs.sort();
  return champs;
}

window.filterTag = filterTag;
window.calculate = calculate;
window.sortChampions = sortChampions;
window.selectChampions = selectChampions;
