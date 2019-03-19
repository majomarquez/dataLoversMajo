/* Manejo del DOM */
const data = window.LOL.data;

	// function for see all champions just small pictures :)
	let images =
	["Aatrox","Ahri","Akali","Alistar","Amumu","Anivia","Annie","Ashe","AurelionSol","Azir","Bard","Blitzcrank",
	"Brand","Braum","Caitlyn","Camille","Cassiopeia","Chogath","Corki","Darius","Diana","Draven","DrMundo","Ekko",
	"Elise","Evelynn","Ezreal","Fiddlesticks","Fiora","Fizz","Galio","Gangplank","Garen","Gnar","Gragas","Graves","Hecarim",
	"Heimerdinger","Illaoi","Irelia","Ivern","Janna","JarvanIV","Jax","Jayce","Jhin","Jinx","Kalista","Karma","Karthus",
	"Kassadin","Katarina","Kayle","Kennen","Khazix","Kindred","Kled","KogMaw","Leblanc","LeeSin","Leona","Lissandra",
	"Lucian","Lulu","Lux","Malphite","Malzahar","Maokai","MasterYi","MissFortune","MonkeyKing","Mordekaiser","Morgana","Nami",
	"Nasus","Nautilus","Nidalee","Nocturne","Nunu","Olaf","Orianna","Pantheon","Poppy","Quinn","Rammus","RekSai","Renekton",
	"Rengar","Riven","Rumble","Ryze","Sejuani","Shaco","Shen","Shyvana","Singed","Sion","Sivir","Skarner","Sona","Soraka",
	"Swain","Syndra","TahmKench","Taliyah","Talon","Taric","Teemo","Thresh","Tristana","Trundle","Tryndamere","TwistedFate",
	"Twitch","Udyr","Urgot","Varus","Vayne","Veigar","Velkoz","Vi","Viktor","Vladimir","Volibear","Warwick","Xerath",
	"XinZhao","Yasuo","Yorick","Zac","Zed","Ziggs","Zilean"];

			let row = document.getElementsByClassName("champions");
		if (row[0]) {
			let html_to_insert = '';

			for (let i = 0; i < images.length-1; i++) {
				html_to_insert += createChampSmallHTML(images[i], 'champions');
			}

			row[0].insertAdjacentHTML('beforeend', html_to_insert);
	//Son las imagenes pequeñas. iconos. que se muestran para que el usuario seleccione un campeon.
		}


	//al pinchar sea un boton.
	function createChampSmallHTML(champName, section) {
		let selectBtn = document.getElementById('select-button');
		let champHtml = ''
		if (selectBtn) {
			champHtml = `
			<div class="champion-wrapper"><a href="javascript:void(0)">
				<img src="https://www.masterypoints.com/assets/img/lol/champion_icons/${champName}.png" width="40" height="40"></a>
				<h4 class="champ-name">${champName}</h4>
				</div>`;
		} else {
			champHtml = `
			<div class="champion-wrapper"><a href="javascript:void(0)" onclick="champDetails('${champName}', '${section}')">
				<img src="https://www.masterypoints.com/assets/img/lol/champion_icons/${champName}.png" width="40" height="40"></a>
				<h4 class="champ-name">${champName}</h4>
				</div>`;
		}

		return champHtml;
	}


	//la info que va a mostrar.
	function champDetails(champName, section) {
		if (champName != '') {
			let details = document.getElementsByClassName('champ-details');
			let champDesc = `<h2 class="champ-name">${champName}</h2>
				<img src="${LOL.data[champName].splash}"alt="Big Picture" class="imagen img-responsive"/>
				<p class="descriptionTitle">'${LOL.data[champName].title}</p>
				<p class="description">'${LOL.data[champName].blurb}</p>
				<a href="javascript:void(0)"onclick="backToChampions('${section}')" class="buttonBack">Volver</a>`;
			details[0].innerHTML = champDesc;
			let champsWrapper = document.getElementsByClassName(section);
			champsWrapper[0].style.display = 'none';
		}
	}

	// Boton de volver.
	function backToChampions(section){
		let details = document.getElementsByClassName('champ-details');
		details[0].innerHTML = '';
		let champs = document.getElementsByClassName(section);
		champs[0].style.display = 'block';
	}

	//Filtrado !!
	const rowOrganization = document.getElementById('organizationBox');// voy a mostrar  la data
	const organization =  document.getElementById('organizationBody');// llamando al boton
	if(organization) {
		let buttons = document.getElementsByClassName('btn-link');
		for (let i=0; i<buttons.length; i++) {
		let currentButton = buttons[i];
			currentButton.addEventListener('click',()=> { //llamando a constante organizacion y le doy el evento escuchar el link
		let condition = currentButton.value; //rescatando el valor se pasa a la condicion
		let filtering = filterTag(data, condition);// juntando data.js con el dom
		rowOrganization.innerHTML = ""; //limpiar el div
		rowOrganization.style.display = "block";
		
		if (document.getElementById('organizationBoxOrder')) {
			document.getElementById('organizationBoxOrder').innerHTML = "";
		}

		filtering.forEach(element => {
				rowOrganization.innerHTML += createChampSmallHTML(element, 'champs-filtering')// name y title son lo que necesito
			});
		});
		}
	}
	//Fin Filtrado !!

// Ordenar

function getChampsSelected(selector) {
	let champions = [];
	let champsCollention = document.getElementsByClassName(selector);
	for (let i = 0; i < champsCollention.length-1; i++) {
		champions.push(champsCollention[i].innerText);
	}
	return champions;
}

function displaySortedChamps(champs) {
	organizationBoxOrder.innerHTML = '';
	champs.forEach(element => {
		let champ = LOL.data[element];
	 	organizationBoxOrder.innerHTML += `
			<div>
			<h3> <hr/> ${champ.id}<h3>
			</h3>
			<p>Elemento: ${champ.info.attack}</p>
			<p>Defensa: ${champ.info.defense}</p>
			<p>Magia: ${champ.info.magic}</p>
			</div>
		`
	});
}

	let orderChampions = document.getElementById('OrderBy');
	if (orderChampions) {
		orderChampions.addEventListener('change', () => {
			let option = orderChampions.value;
			let champs = getChampsSelected('champ-name');
			let ordering = window.sortChampions(champs, 'name', option); //desde data
			displaySortedChamps(ordering);
		});
	}

	let selectChamps = document.getElementById('selectBy');
	if (selectChamps) {
		selectChamps.addEventListener('change', () => {
			let option = selectChamps.value;
			let champs = getChampsSelected('champ-name');
			let selections = window.selectChampions(data, champs, option); //desde data
			displaySortedChamps(selections);
		});
	}

	let selectBtn = document.getElementById('select-button');
	if (selectBtn) {
		selectBtn.addEventListener('click',()=> {
			let champsBox =  document.getElementById('organizationBox');
			champsBox.style.display = "none";
		});
	}
