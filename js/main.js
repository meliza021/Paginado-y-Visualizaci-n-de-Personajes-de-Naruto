document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://dattebayo-api.onrender.com/characters"; // URL de la API
    const cardsContainer = document.getElementById("cards-container");
    const paginationContainer = document.getElementById("pagination"); 
    let characters = []; 
    let currentPage = 1;
    const itemsPerPage = 4; 
    const totalPages = 5; 


    async function fetchCharacters() {
try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        characters = data.slice(0, 20); 
        renderPage(currentPage);
        renderPagination();
} catch (error) {
        console.error("Error al obtener los personajes:", error);
}
    }

    function renderPage(page) {
    cardsContainer.innerHTML = ""; 
      const startIndex = (page - 1) * itemsPerPage; 
    const endIndex = startIndex + itemsPerPage; 
    const charactersToDisplay = characters.slice(startIndex, endIndex); 

    charactersToDisplay.forEach(character => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("card-image");
        img.src = character.imageUrl || "https://static.wikia.nocookie.net/naruto/images/1/14/Orochimaru_Infobox.png"; 
        img.alt = character.name;
        const content = document.createElement("div");
        content.classList.add("card-content");
        const title = document.createElement("h2");
        title.classList.add("card-title");
        title.textContent = character.name;
        const head = document.createElement("p");
        head.classList.add("card-head");
        head.textContent = `Clan: ${character.clan || "Desconocido"}`;
        const description = document.createElement("p");
        description.classList.add("card-description");
        description.textContent = `Aldea: ${character.village || "Desconocida"}`; 
        content.appendChild(title);
        content.appendChild(head);
        content.appendChild(description);
        card.appendChild(img);
        card.appendChild(content);
        cardsContainer.appendChild(card);
});
    }

    function renderPagination() {
    paginationContainer.innerHTML = ""; 

    const prevButton = document.createElement("button");
    prevButton.textContent = "Anterior";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => changePage(currentPage - 1));
    paginationContainer.appendChild(prevButton);

      
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.classList.toggle("active", i === currentPage); 
        pageButton.addEventListener("click", () => changePage(i));
        paginationContainer.appendChild(pageButton);
    }

    
    const nextButton = document.createElement("button");
    nextButton.textContent = "Siguiente";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => changePage(currentPage + 1));
    paginationContainer.appendChild(nextButton);
    }


    function changePage(page) {
    if (page < 1 || page > totalPages) return; 
    currentPage = page;
    renderPage(currentPage);
    renderPagination();
    }


    fetchCharacters();
});
