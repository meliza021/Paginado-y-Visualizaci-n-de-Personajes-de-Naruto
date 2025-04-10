
const dataCharacters = (characters) => {
    lists__characters.innerHTML = characters.map(character => {
        const title = character.personal.titles?.[0] || character.personal.birthdate || "No title or birthdate";
        const clan = character.personal.clan || "Unknown Clan";
        const gender = (character.personal.sex !== "Male" && character.personal.sex !== "Female") ? "Various" : character.personal.sex;

        return `
            <div class="character__container">
                <img class="image__characters" src="${character.images[0]}" alt="${character.name}">
                <div class="information__container">
                    <h3 class="character__name">${character.name}</h3>
                    <h3 class="character__sexx">${gender}</h3>
                    <h3 class="character__clan">Clan: ${clan}</h3>
                    <h3 class="character__title">${title}</h3>
                </div>
            </div>
        `;
    }).join('');
};

const pageButtons = () => {
    const totalPages = Math.ceil(allCharacters.length / itemsPerPage);
    buttons.innerHTML = `
        <div class="buttons">
            <button ${currentPage === 1 ? "disabled" : ""} id="prev">Previous</button>
            <span>Page ${currentPage} of ${totalPages}</span>
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
    const charactersToShow = allCharacters.slice(startIndex, startIndex + itemsPerPage);
    dataCharacters(charactersToShow);
    pageButtons();
};

getCharacters();

  