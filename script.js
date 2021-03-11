//INITIALISATIONS DES VARIABLES

const deck = [
    ['1&hearts;',11],
    ['2&hearts;',2],
    ['3&hearts;',3],
    ['4&hearts;',4],
    ['5&hearts;',5],
    ['6&hearts;',6],
    ['7&hearts;',7],
    ['8&hearts;',8],
    ['9&hearts;',9],
    ['10&hearts;',10],
    ['J&hearts;',10],
    ['Q&hearts;',10],
    ['K&hearts;',10],
    ['1&diams;',11],
    ['2&diams;',2],
    ['3&diams;',3],
    ['4&diams;',4],
    ['5&diams;',5],
    ['6&diams;',6],
    ['7&diams;',7],
    ['8&diams;',8],
    ['9&diams;',9],
    ['10&diams;',10],
    ['J&diams;',10],
    ['Q&diams;',10],
    ['K&diams;',10],
    ['1&clubs;',11],
    ['2&clubs;',2],
    ['3&clubs;',3],
    ['4&clubs;',4],
    ['5&clubs;',5],
    ['6&clubs;',6],
    ['7&clubs;',7],
    ['8&clubs;',8],
    ['9&clubs;',9],
    ['10&clubs;',10],
    ['J&clubs;',10],
    ['Q&clubs;',10],
    ['K&clubs;',10],
    ['1&spades;',11],
    ['2&spades;',2],
    ['3&spades;',3],
    ['4&spades;',4],
    ['5&spades;',5],
    ['6&spades;',6],
    ['7&spades;',7],
    ['8&spades;',8],
    ['9&spades;',9],
    ['10&spades;',10],
    ['J&spades;',10],
    ['Q&spades;',10],
    ['K&spades;',10]];


const cardsP =[];
const cardsD =[];
const handP=[];
const handD=[];
let pointsP = 0;
let pointsD=0;
let nbCardsP = 0;
let nbCardsD = 0;
//*****************************

//MODIFICICATION DOM
const nameP = "Player One" //prompt("What's your name ? ");
document.getElementById("nameP").innerHTML = nameP;
const nameD = "Bank a.k.a Bastien";
document.getElementById("nameD").innerHTML = nameD;
const scoreP = document.createElement("p");
scoreP.classList.add("score");
const scoreD = document.createElement("p");
scoreD.classList.add("score");
const cardsleft = document.getElementById("cardsleft");
//*****************************

//FONCTIONS



//** Tire une carte aléatoire et la retire du deck */
function draw(hand) {
    let pick = Math.floor(Math.random()*deck.length);
    hand.push(deck[pick,pick]);
    deck.splice(pick,1);
    cardsleft.innerHTML=`${deck.length} left`
}
//___________________________________________________


//** Crée une carte visuelle et la dépose dans la bonne section */
function play(player, hand) {
    draw(hand);
    if (player === nameP) {
        //crée un div et lui assigne la classe .card
        cardsP[nbCardsP]=document.createElement("div");
        cardsP[nbCardsP].classList.add("card");

        //vérifie le signe pour attribuer une classe qui colore le texte
        if(hand[hand.length-1][0].includes("hearts") || hand[hand.length-1][0].includes("diams")) {
            cardsP[nbCardsP].classList.add("redCard");
        } else {
            cardsP[nbCardsP].classList.add("blackCard");
        }

        //Crée un paragraphe dans la card pour pouvoir le flex align center
        const cardvalue = document.createElement("p");
        cardsP[nbCardsP].appendChild(cardvalue)

        //Attribue la valeur au paragraphe créé
        cardvalue.innerHTML=hand[hand.length-1][0];
        
        //calcul les points et remets la valeur des As à 1 si besoin
        pointsP += hand[hand.length-1][1];
        if (pointsP>21) {
            aceRule(hand);
        }
        //rattache le div crée en fin de section .player
        document.querySelector(".player").appendChild(cardsP[nbCardsP]);
        //renseigne le nombre de carte dans la main du player
        nbCardsP++;
        //affiche le score total
        scoreP.innerHTML=`Score : ${pointsP}`;
        document.querySelector(".player").appendChild(scoreP);


    } else if (player === nameD) {
        //Pour les commentaires 
        cardsD[nbCardsD]=document.createElement("div");
        cardsD[nbCardsD].classList.add("card");

        if(hand[hand.length-1][0].includes("hearts") || hand[hand.length-1][0].includes("diams")) {
            cardsD[nbCardsD].classList.add("redCard");
        } else {
            cardsD[nbCardsD].classList.add("blackCard");
        }

        const cardvalue = document.createElement("p");
        cardsD[nbCardsD].appendChild(cardvalue)
        cardvalue.innerHTML=hand[hand.length-1][0];


        pointsD += hand[hand.length-1][1];
        if (pointsD>21) {
            aceRule(hand);
        }

        document.querySelector(".dealer").appendChild(cardsD[nbCardsD]);

        nbCardsD++;

        scoreD.innerHTML=`Score : ${pointsD}`;
        document.querySelector(".dealer").appendChild(scoreD);
    }
}
//_____________________________________________________________________


//** Si POINTS>21 => Cherche le 1er As et le valorise à 1 */
function aceRule(hand){
    for(let i = 0; i < hand.length; i++) {
        if(hand[i][1]===11){
            hand[i][1]=1;
            break;
            console.log("break")
        }
    }
    if(hand===handP){
        pointsP=0;
        for (let n = 0; n < hand.length;n++) {
            pointsP += hand[n][1];
        }
    } else {
        pointsD=0;
        for (let n = 0; n < hand.length;n++) {
            pointsD += hand[n][1];
        }
    }
}
//_____________________________________________________________________

//*********************************************************************


//ESSAIS CONSOLES
play(nameP,handP)
play(nameP,handP)


play(nameD,handD)
play(nameD,handD)

console.log(deck)
console.log(handP)
console.log("player " + pointsP);
console.log("dealer " + pointsD);