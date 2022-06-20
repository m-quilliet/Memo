//nombre de vie du joueur en debut de partie
const NB_PLAYER_LIVES=8;
// Rattacher à la section
let section= document.querySelector("section");
let playerLivesCount = document.querySelector("span");
let playerLives= NB_PLAYER_LIVES;
// Liens textes
playerLivesCount.textContent = playerLives;
// Générer la data
let getData = () => [
    {imgSrc:"assets/img/1.jpeg",name:"dracaufeu"},
    {imgSrc:"assets/img/2.jpeg", name:"mewtow"},
    {imgSrc:"assets/img/3.jpeg", name:"tortank"},
    {imgSrc:"assets/img/4.jpeg", name:"ronflex"},
    {imgSrc:"assets/img/7.jpeg", name:"carapuce"},
    {imgSrc:"assets/img/8.jpeg", name:"salameche"},
    
];
// Randomize (aleatoire)
let randomize = (cardData) => {
    cardData.sort (()=> Math.random() -0.5);
    return cardData;
};
let initCard=(item) => {
    let card = document.createElement("div");
    let face = document.createElement("img");
    let back = document.createElement("div");
    // Créer une classe à chaque élément
    card.classList.add("card");
    face.classList.add("face");
    back.classList.add("back");
    // Rattacher les infos de la card
    
    setTimeout(() => {
        face.setAttribute("src", item.imgSrc);
    }, 300);
    
    card.setAttribute("name", item.name);
   // Rattacher les cards à la section
    section.appendChild(card);
    // Rattacher les éléments de card à la card
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (evt) => {
        card.classList.toggle("toggleCard");
        checkCards(evt);
    });
};
// Generer le html pour les cards et rattaché au mode aléatoire
// aléatoire
let cardGenerator= () => {
    let data= getData();
    let cardData = randomize([].concat(data,data));
   //foreach pour accéder à la totalité des cards
    cardData.forEach(initCard);
};
// Verifier la carte//
let checkCards = (e) => {
    let clickedCard = e.target;
    clickedCard.classList.add("flipped");
    let toggleCard = document.querySelectorAll(".toggleCard");
    let flippedCards = document.querySelectorAll(".flipped");
// Conditions//
    if(flippedCards.length === 2) {
        if (
            flippedCards[0].getAttribute("name") ===
            flippedCards[1].getAttribute("name")
        ){
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
        } else {
            flippedCards.forEach (card => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if(playerLives===0){
                restart("Oups, tu as perdu!");
            }
        }
    }
    //Verification de "si" on a gagné le jeu//
    if (toggleCard.lenght===12){
        restart("Bravo, tu as gagné!!!");
    }
};
//Rejouer//
let restart = (text) => {
    let cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        section.removeChild(card);
    })
    playerLives = NB_PLAYER_LIVES;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
    cardGenerator();
};
cardGenerator ();
