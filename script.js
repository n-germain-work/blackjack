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
scoreD.setAttribute("id","scoreD")
const cardsleft = document.getElementById("cardsleft");
let hiddencard = null;
const launchbutton = document.getElementById("launchbutton")
const restartbutton = document.getElementById("restartbutton")
restartbutton.disabled = true

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

        //Crée un paragraphe dans la card pour pouvoir centrer verticalement
        const cardvalue = document.createElement("p");
        cardsP[nbCardsP].appendChild(cardvalue)

        //Attribue la valeur au paragraphe créé
        cardvalue.innerHTML=hand[hand.length-1][0];
        
        //Attribue un id unique à chaque carte
        cardsP[nbCardsP].setAttribute("id", `cardP${hand.length}`)

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

        if (hand.length===2) {
            cardvalue.setAttribute("id","hiddenvalue");
        }

        cardsD[nbCardsD].appendChild(cardvalue)
        cardvalue.innerHTML=hand[hand.length-1][0];

        cardsD[nbCardsD].setAttribute("id", `cardD${hand.length}`)

        pointsD += hand[hand.length-1][1];
        if (pointsD>21) {
            aceRule(hand);
        }

        document.querySelector(".dealer").appendChild(cardsD[nbCardsD]);

        nbCardsD++;
        
        //Score dealer remis en fin de partie
        //scoreD.innerHTML=`Score : ${pointsD}`;
        //document.querySelector(".dealer").appendChild(scoreD);
    }
}
//_____________________________________________________________________

//** Pour faire tirer le dealer */
function dealerDraw(){
    hiddencard.style.backgroundImage = null;
    document.getElementById("hiddenvalue").style.opacity ="1";
    if (pointsP<21){
        while(pointsD<17){
            play(nameD,handD);
        }
    }
}


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
//FONCTIONS POUR BOUTONS
function launch(){
    restartbutton.disabled = false;
    launchbutton.disabled = true
    document.getElementById("instruction").innerHTML = "Do you want another card ?";
    play(nameP,handP);
    play(nameP,handP);
    play(nameD,handD);
    play(nameD,handD);
    hiddencard = document.getElementById("cardD2");
    hiddencard.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/819152997492850708/819560387715792906/WildCard.png')";
    document.getElementById("hiddenvalue").style.opacity ="0";
    if (pointsP>= 21) {
        stop();
    }
}

function newCard(){
    play(nameP,handP);
    if (pointsP>= 21) {
        stop();
    }
}

function stop(){
    dealerDraw();
    scoreD.innerHTML=`Score : ${pointsD}`;
    document.querySelector(".dealer").appendChild(scoreD);
    if(pointsP>21){
        document.getElementById("instruction").innerHTML = "You loose ! You went over 21 !";
    } else if (pointsP===21) {
        document.getElementById("instruction").innerHTML = "BLACKJACK !!! You won like a legend ! ";
    } else if (pointsP===pointsD) {
        document.getElementById("instruction").innerHTML = "This is a draw, too bad :)";
    } else if(pointsP>pointsD) {
        document.getElementById("instruction").innerHTML = "WOOT !!! YOU WON !";
    } else if(pointsD>21) {
        document.getElementById("instruction").innerHTML = "The bank went over 21 ! You won !!!";
    } else {
        document.getElementById("instruction").innerHTML = "YOU LOOSE ! BOOOOOH !!!";
    }
}
        

//*********************************************************************
//ESSAIS CONSOLES

//launch()
//newCard()
//stop()



/*play(nameP,handP)
play(nameP,handP)


play(nameD,handD)
play(nameD,handD)

console.log(deck)
console.log(handP)
console.log("player " + pointsP);
console.log("dealer " + pointsD);*/