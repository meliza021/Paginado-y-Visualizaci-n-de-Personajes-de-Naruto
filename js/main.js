// const container = document.getElementById("cards-container");

// const data = {
// url: "https://placehold.co/600x400@2x.png",
// title: "Titulo",
// head: "Lorem",
// description: "Lorem",
// };


// let createCard = () => {
//     const card = document.createElement("div");
//     const cardContent = document.createElement("div");
//     card.classList.add("card");
//     cardContent.classList.add("card-content");
//     const image = document.createElement("img");
//     image.classList.add("card-image");
//     const title = document.createElement("h2");
//     title.classList.add("card-title");
//     const head = document.createElement("p");
//     head.classList.add("card-head");
//     const description = document.createElement("p");
//     head.classList.add("card-description");
//     title.textContent = data.title;
//     head.textContent = data.head;
//     description.textContent = data.description;
//     image.src = data.url;
//     cardContent.appendChild(title);
//     cardContent.appendChild(head);
//     cardContent.appendChild(description);
//     card.appendChild(image);
//     card.appendChild(cardContent);
//     return card;
// }

// const createCharacterCard = (parent, card, data) => {
    
// };
// let card = createCharacterCard(container, data);

// for (let item of card.children) {
// console.log(item.tagName);
// if (item.tagName == "IMG") {
//         item.src = "https://placehold.co/200x200.png"
// }
// if(item instanceof HTMLDivElement) {
//     const a = document.createElement('a')
//     a.textContent = "Hola campers!!"
//     item.insertAdjacentHTML('afterbegin','<a> Hola mundo! </a>')
//     item.insertAdjacentElement('afterbegin', a)
//     for(let subItem of item.children) {
//         console.log(subItem);
//     }
// } 
// }
// container.appendChild(card);
// console.log(card);

// const get = async() =>  {
//     let request = await fetch('https://dattebayo-api.onrender.com/characters')
//     return request.json()
// }

  

// const container = document.getElementById("cards-container");
// let  createCard = () => {
//     const card = document.createElement("div")
//     const cardcontent = document.createElement("div")
//     card.classList.add("card")
//     cardcontent.classList.add("card-content")
//     const image = document.createElement("img")
//     image.classList.add("card-image")
//     const title = document.createElement("h2")
//     title.classList.add("card-title")
//     const head = document.createElement("p")
//     head.classList.add("card-head")
//     const description = document.createElement("p")
//     description.classList.add("card-description")
//     cardcontent.appendChild(title);
//     cardcontent.appendChild(head);
//     cardcontent.appendChild(description);
//     card.appendChild(image);
//     card.appendChild(cardcontent);
//     return card
// }


// const create = (parent, card, data) =>{

//     for (let item of card.children) {
//         console.log(item.tagName);
//         if (item.tagName == "IMG") {
//               item.src = data.url
//         }
//         if(item instanceof HTMLDivElement) {
//           const a = document.createElement('a')
//           a.textContent = data.name
//           item.insertAdjacentHTML('afterbegin',` <p> ${data.title}</p>`)
//           item.insertAdjacentHTML('afterbegin',` <p> ${data.clan}</p>`)
//           item.insertAdjacentElement('afterbegin', a)
//           for(let subItem of item.children) {
//               console.log(subItem);
//           }
//         }
        
//       }
//       parent.appendChild(card)


// }
// let personajes = await get()


// for(let item of personajes.characters){
//     let card = createCard()

// create(container,card,{ 
//     url: item.images[0],
//     name: item.name,
//     clan: item.personal.clan,
//     head: "Lorem",
//     title: item.personal.titles[0]
// })

// }
// Constantes y variables para la paginación
const cardsPerPage = 4; // Número de tarjetas por página
let currentPage = 1;    // Página actual
let totalPages = 0;     // Total de páginas
let allCharacters = []; // Array para almacenar todos los personajes

// Elementos DOM
const container = document.getElementById("cards-container");
const paginationContainer = document.getElementById("pagination-container");

// Función para obtener datos de la API
const get = async() => {
    try {
        let request = await fetch('https://dattebayo-api.onrender.com/characters');
        return request.json();
    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        throw error;
    }
}

// Función para crear una tarjeta
const createCard = () => {
    const card = document.createElement("div");
    const cardcontent = document.createElement("div");
    card.classList.add("card");
    cardcontent.classList.add("card-content");
    
    const image = document.createElement("img");
    image.classList.add("card-image");
    
    const title = document.createElement("h2");
    title.classList.add("card-title");
    
    const head = document.createElement("p");
    head.classList.add("card-head");
    
    const description = document.createElement("p");
    description.classList.add("card-description");
    
    card.appendChild(image);
    card.appendChild(cardcontent);
    
    return card;
}

// Función para rellenar una tarjeta con datos
const create = (parent, card, data) => {
    for (let item of card.children) {
        if (item.tagName === "IMG") {
            item.src = data.url;
            item.alt = `Imagen de ${data.name}`;
            
            // Añadir animación de carga
            item.onload = () => {
                item.classList.add("loaded");
            };
            
            // Manejar error de carga de imagen
            item.onerror = () => {
                item.src = 'https://via.placeholder.com/250x250?text=Imagen+No+Disponible';
            };
        }
        
        if (item instanceof HTMLDivElement) {
            // Crear enlace con el nombre
            const a = document.createElement('a');
            a.textContent = data.name;
            a.href = "#";
            a.title = `Ver más información sobre ${data.name}`;
            
            // Añadir eventos al enlace
            a.addEventListener('click', (e) => {
                e.preventDefault();
                alert(`Detalles completos de ${data.name} estarán disponibles pronto!`);
            });
            
            // Crear elementos para clan y título si existen
            const clanText = data.clan ? data.clan : "Clan desconocido";
            const titleText = data.title ? data.title : "Sin título conocido";
            
            // Insertar elementos en el contenido de la tarjeta
            item.insertAdjacentHTML('afterbegin', `<p>Título: ${titleText}</p>`);
            item.insertAdjacentHTML('afterbegin', `<p>Clan: ${clanText}</p>`);
            item.insertAdjacentElement('afterbegin', a);
        }
    }
    
    // Añadir animación de entrada a la tarjeta
    setTimeout(() => {
        card.classList.add("appear");
    }, 100);
    
    parent.appendChild(card);
}

// Función para crear los controles de paginación
const createPaginationControls = () => {
    paginationContainer.innerHTML = '';
    
    // Efecto de rotación para los botones
    const addPulsateEffect = (button) => {
        button.addEventListener('mouseover', () => {
            button.classList.add('pulsate');
        });
        
        button.addEventListener('mouseout', () => {
            button.classList.remove('pulsate');
        });
    };
    
    // Botón Atrás
    const prevButton = document.createElement("button");
    prevButton.textContent = "← Atrás";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderCurrentPage();
            // Mostrar animación al cambiar de página
            container.classList.add('page-change');
            setTimeout(() => {
                container.classList.remove('page-change');
            }, 500);
        }
    });
    addPulsateEffect(prevButton);
    
    // Indicador de página actual
    const pageIndicator = document.createElement("span");
    pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
    pageIndicator.classList.add("page-indicator");
    
    // Botón Siguiente
    const nextButton = document.createElement("button");
    nextButton.textContent = "Siguiente →";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderCurrentPage();
            // Mostrar animación al cambiar de página
            container.classList.add('page-change');
            setTimeout(() => {
                container.classList.remove('page-change');
            }, 500);
        }
    });
    addPulsateEffect(nextButton);
    
    // Añadir los elementos al contenedor de paginación
    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(pageIndicator);
    paginationContainer.appendChild(nextButton);
}

// Función para renderizar la página actual
const renderCurrentPage = () => {
    // Mostrar indicador de carga
    container.innerHTML = '<div class="loading">Cargando personajes...</div>';
    
    // Pequeña demora para mostrar la animación de carga
    setTimeout(() => {
        // Limpiar el contenedor
        container.innerHTML = '';
        
        // Calcular los índices de inicio y fin para la página actual
        const startIndex = (currentPage - 1) * cardsPerPage;
        const endIndex = Math.min(startIndex + cardsPerPage, allCharacters.length);
        
        // Mostrar solo los personajes de la página actual
        for (let i = startIndex; i < endIndex; i++) {
            const item = allCharacters[i];
            let card = createCard();
            
            create(container, card, {
                url: item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/250x250?text=Sin+Imagen',
                name: item.name,
                clan: item.personal && item.personal.clan ? item.personal.clan : null,
                title: item.personal && item.personal.titles && item.personal.titles.length > 0 ? item.personal.titles[0] : null
            });
        }
        
        // Actualizar los controles de paginación
        createPaginationControls();
        
    }, 300);
}

// Función para inicializar el sistema de paginación
const initPagination = () => {
    // Calcular el número total de páginas
    totalPages = Math.ceil(allCharacters.length / cardsPerPage);
    
    // Renderizar la primera página
    renderCurrentPage();
    
    // Mostrar mensaje si no hay personajes
    if (allCharacters.length === 0) {
        container.innerHTML = '<div class="no-data">No se encontraron personajes</div>';
        paginationContainer.style.display = 'none';
    } else {
        paginationContainer.style.display = 'flex';
    }
}

// Función principal para inicializar la aplicación
const initApp = async () => {
    try {
        // Mostrar indicador de carga
        container.innerHTML = '<div class="loading">Cargando datos de personajes...</div>';
        
        // Obtener los datos de la API
        const data = await get();
        
        // Verificar si hay datos
        if (data && data.characters && data.characters.length > 0) {
            // Tomar solo los primeros 20 personajes como especifica el requisito
            allCharacters = data.characters.slice(0, 20);
            
            // Inicializar el sistema de paginación
            initPagination();
        } else {
            container.innerHTML = '<div class="error">No se pudieron cargar los personajes. Por favor, intenta de nuevo más tarde.</div>';
        }
    } catch (error) {
        console.error("Error al obtener datos:", error);
        container.innerHTML = '<div class="error">Error al cargar los personajes. Por favor, intenta de nuevo más tarde.</div>';
    }
}

// Añadir animaciones CSS adicionales
const addStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
            font-family: "ninja" ;
            }
        
        .card.appear {
            opacity: 1;
            transform: translateY(0);
        }
        
        .loading, .error, .no-data {
            text-align: center;
            padding: 2rem;
            font-size: 1.2rem;
            color: var(--naruto-blue);
        }
        
        .error {
            color: var(--naruto-red);
        }
        
        .page-change {
            animation: fadeChange 0.5s ease;
        }
        
        @keyframes fadeChange {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
        
        .pulsate {
            animation: pulsate 1s infinite;
        }
        
        @keyframes pulsate {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    addStyles();
    initApp();
});