const cards = document.querySelectorAll(".card"),
timeTag = document.querySelector(".time b"),
bestTag = document.querySelector(".correct b"),
refreshBtn = document.querySelector(".details button");

var pyro = document.createElement('div');
pyro.className = 'pyro';
pyro.innerHTML = '<div class="before"></div><div class="after"></div>';
pyro.setAttribute("hidden","true");
document.body.insertBefore(pyro, document.getElementById('body'));


let timePassed = 0;
let matchedCard = 0;
let disableDeck = false;
let isPlaying = false;
var bestScore = Infinity;
var startBestScore = "N/A";
let cardOne, cardTwo, timer;

function initTimer() {
    if(matchedCard == 8) {
        return clearInterval(timer);
    }
    timePassed++;
    timeTag.innerText = timePassed;
}

function flipCard({target: clickedCard}) {
    if(!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if(clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matchedCard++;
        if(matchedCard == 8) {
            playVictorySound();
            addFirework();
            isPlaying = false;
            if (timePassed < bestScore) {
                bestScore = timePassed;
                bestTag.innerText = timePassed + "s";
            }
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = "";
        cardTwo = "";
        return disableDeck = false;
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = "";
        cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    timePassed = 0;
    matchedCard = 0;
    cardOne = "";
    cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timePassed;
    if (bestScore == Infinity) {
        bestTag.innerText = "N/A";
    }
    else {
        bestTag.innerText = bestScore + "s";
    }
    disableDeck = false;
    isPlaying = false;

    removeFirework();

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `images/img-${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

function playVictorySound(){
    var audio = new Audio("music/uefa-champions-league-official-theme-song.mp3");
    audio.play();
}

function addFirework(){
    document.getElementsByClassName("pyro")[0].removeAttribute("hidden");
 }
 
function removeFirework(){
     document.getElementsByClassName("pyro")[0].setAttribute("hidden","true");
 }

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});