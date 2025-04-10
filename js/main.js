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

const get = async() =>  {
    let request = await fetch('https://dattebayo-api.onrender.com/characters')
    return request.json()
}

  

const container = document.getElementById("cards-container");
let  createCard = () => {
    const card = document.createElement("div")
    const cardcontent = document.createElement("div")
    card.classList.add("card")
    cardcontent.classList.add("card-content")
    const image = document.createElement("img")
    image.classList.add("card-image")
    const title = document.createElement("h2")
    title.classList.add("card-title")
    const head = document.createElement("p")
    head.classList.add("card-head")
    const description = document.createElement("p")
    description.classList.add("card-description")
    cardcontent.appendChild(title);
    cardcontent.appendChild(head);
    cardcontent.appendChild(description);
    card.appendChild(image);
    card.appendChild(cardcontent);
    return card
}


const create = (parent, card, data) =>{

    for (let item of card.children) {
        console.log(item.tagName);
        if (item.tagName == "IMG") {
              item.src = data.url
        }
        if(item instanceof HTMLDivElement) {
          const a = document.createElement('a')
          a.textContent = data.name
          item.insertAdjacentHTML('afterbegin',` <p> ${data.title}</p>`)
          item.insertAdjacentHTML('afterbegin',` <p> ${data.clan}</p>`)
          item.insertAdjacentElement('afterbegin', a)
          for(let subItem of item.children) {
              console.log(subItem);
          }
        }
        
      }
      parent.appendChild(card)


}
let personajes = await get()


for(let item of personajes.characters){
    let card = createCard()

create(container,card,{ 
    url: item.images[0],
    name: item.name,
    clan: item.personal.clan,
    head: "Lorem",
    title: item.personal.titles[0]
})

}