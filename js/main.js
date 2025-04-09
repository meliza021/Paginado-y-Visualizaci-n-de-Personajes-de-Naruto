const lists__characters = document.getElementById("list__characters");
const buttons = document.getElementById("buttons");
let urlCharacters = "https://dattebayo-api.onrender.com/characters";
let btnNext;
let btnPrevious;
let templateHtml;
let currentPage = 1;
const itemsPerPage = 8;
let allCharacters = []; 

const getCharacters= async(url) =>{
    try {
    const response = await fetch(url);
    const results = await response.json();
    console.log(results)
    dataCharacters(results.characters)
    allCharacters = results.characters
    showPage(currentPage)
}catch (error) {
        console.log(error)
    }
    } 


getCharacters(urlCharacters)

const dataCharacters = (characters) =>{
    lists__characters.innerHTML=""
    templateHtml = ""
    try {
            characters.forEach((character) => {
            console.log(character); 
            const titulo = character.personal.titles && character.personal.titles.length > 0
            ? `Title: ${character.personal.titles[0]}`
            : character.personal.birthdate
            ? `Birthdate: ${character.personal.birthdate}`
            : "Sin título ni cumpleaños";

            
          const clan =
            character.personal.clan !== undefined
          ? character.personal.clan
          : "No clan 😂";

          const genre = 
          character.personal.sex != "Male" && character.personal.sex != "Female"?
          "Various":
          character.personal.sex

            templateHtml +=`
            <div class="character__container">
            <img  class="image__characters"src="${character.images[0]}" alt=${character.name}>
            <div class="information__container">
                <h2 class="character__name"> ${character.name} </h2>
                <h2 class="character__sex"> ${genre} </h3>
                <h2 class="character__clan"> Clan: ${clan} </h2>
                <h2 class="character__title">  ${titulo} </h2>
            </div>
            </div>`
            
        })
        lists__characters.innerHTML += templateHtml
        
        document.getElementById("characters-container").innerHTML = templateHtml;
    } catch (error) {
        console.log(error)
    }
}

const pageButtons = () => {
    const totalPages = Math.ceil(allCharacters.length / itemsPerPage);
    buttons.innerHTML = `
    <div class="buttons">
      <button ${currentPage === 1 ? "disabled" : ""} id="prev">Previous</button>
      <span> Page ${currentPage} of ${totalPages} </span>
      <button ${currentPage === totalPages ? "disabled" : ""} id="next">Next</button>
    </div>
      `;
  
    document.getElementById("prev").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
      }
    });
  
    document.getElementById("next").addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
      }
    });
  };
  const showPage = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const charactersToShow = allCharacters.slice(startIndex, endIndex);
    
    dataCharacters(charactersToShow); 
    pageButtons();
  };
    