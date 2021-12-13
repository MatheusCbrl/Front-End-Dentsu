const bandasList = document.getElementById("bandasList");
const searchBar = document.getElementById("searchBar");
const NumCount = document.querySelector("result-music");
let bands = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredcaracters = bands.filter((caracter) =>
    caracter.name.toLowerCase().includes(searchString)
  );
  displaycaracters(filteredcaracters);

  var tag = document.createElement("p");
  var text = document.createTextNode(filteredcaracters.length + " Resultados");
  tag.append(text);
  var element = document.getElementById("new");
  element.replaceChildren(text);
  
});
function sortOn(arr, prop) {
  arr.sort(function (a, b) {
    if (a[prop] < b[prop]) {
      return -1;
    } else if (a[prop] > b[prop]) {
      return 1;
    } else {
      return 0;
    }
  });
}
const loadcaracters = async () => {
  try {
    const res = await fetch(
      "https://iws-brazil-labs-iws-recruiting-bands.iwsbrazil.io/api/bands"
    );
    bands = await res.json();
    displaycaracters(bands);

    var tag = document.createElement("p");
    var text = document.createTextNode(bands.length + " Resultados");
    tag.appendChild(text);
    var element = document.getElementById("new");
    element.appendChild(text);
    console.log(bands.length);

    displayfilterAtoB(bands);
  } catch (err) {
    console.error(err);
  }
};
loadcaracters();

function filterChange() {
  console.log(document.getElementById("filters").value);
  const filterSelect = document.getElementById("filters").value;

  if (filterSelect === "ABFilter") {
    displayfilterAtoB(bands);
  } else if (filterSelect === "FansFilter") {
    displayfilterFansAtoB(bands);
  } else {
    displaycaracters(bands);
  }
}
const displayfilterFansAtoB = (bands) => {
  sortOn(bands, "numPlays");
  const htmlString = bands
    .map((bands) => {
      return `
        <li class="bands">
            <h2>${bands.name}</h2>
            <p>Most Plays: ${bands.numPlays}</p>
            
            <img src="${bands.image}"></img>
        </li>
    `;
    })
    .join("");
  if (htmlString == null || htmlString === "")
    bandasList.innerHTML = `<li class="">
                <p class="no_results_txt">Sem resultados...</p>
                <img class="no_result_img" src="./assets/no_results.png"></img>
             </li>  `;
  else bandasList.innerHTML = htmlString;
};

const displayfilterAtoB = (bands) => {
  sortOn(bands, "name");
  const htmlString = bands
    .map((bands) => {
      return `
        <li class="bands">
            <h2>${bands.name}</h2>
            <p>Most Plays: ${bands.numPlays}</p>
            
            <img src="${bands.image}"></img>
        </li>
    `;
    })
    .join("");
  if (htmlString == null || htmlString === "")
    bandasList.innerHTML = `<li class="">
                <p class="no_results_txt">Sem resultados...</p>
                <img class="no_result_img" src="./assets/no_results.png"></img>
             </li>  `;
  else bandasList.innerHTML = htmlString;
};

const displaycaracters = (bands) => {
  const htmlString = bands
    .map((bands) => {
      return `
            <li class="bands">
            
                <h2>${bands.name}</h2>
                <p>Most Plays: ${bands.numPlays}</p>
                
                <img src="${bands.image}"></img>
            </li>
        `;
    })
    .join("");

  if (htmlString == null || htmlString === "")
    bandasList.innerHTML = `<li class="">
                <p class="no_results_txt">Sem resultados...</p>
                <img class="no_result_img" src="./assets/no_results.png"></img>
             </li>  `;
  else bandasList.innerHTML = htmlString;
};

const displaycaractersInfo = (bands) => {
  sortOn(bands, "numPlays");
  const htmlString = bands
    .map((bands) => {
      return `
        <li class="bandsInfo">
              
        <h2>${bands.name}</h2>
        <img src="${bands.image}"></img>
        <br>
        
        <p>${bands.biography}</p>
        <h5>Most Plays: ${bands.numPlays}</h5>
        
    </li>
      `;
    })
    .join("");
  if (htmlString == null || htmlString === "")
    bandasList.innerHTML = `<li class="">
                  <p class="no_results_txt">Sem resultados...</p>
                  <img class="no_result_img" src="./assets/no_results.png"></img>
               </li>  `;
  else bandasList.innerHTML = htmlString;
};
