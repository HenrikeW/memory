const cards = document.getElementsByClassName("memory-card");
const cardsArray = Array.from(cards);

let oneCardFlipped = false;
let firstCard, secondCard;
let boardLocked = false;
let matchCounter = 0;
let turnCounter = 0;

const flipCard = (event) => {
  if (boardLocked) return;
  if (event.currentTarget === firstCard) return;

  event.currentTarget.classList.add("flip")

  if (!oneCardFlipped) {
    oneCardFlipped = true;
    firstCard = event.currentTarget;
  } else {
    oneCardFlipped = false;
    secondCard = event.currentTarget;
  }

  checkMatch();
};

const checkMatch = () => {
  if (firstCard && secondCard) {
    boardLocked = true;
    turnCounter += 1;

    if (firstCard.dataset.image === secondCard.dataset.image) {
      disableCards();
    } else {
      unflipCards();
    }
  }
};

const disableCards = () => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matchCounter += 1;

  setTimeout(() => {
    firstCard.classList.add("disabled");
    secondCard.classList.add("disabled");
    resetBoard();
    winGame();
  }, 1500);
};

const unflipCards = () => {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500)
};

const resetBoard = () => {
  [firstCard, secondCard] = [null, null];
  [boardLocked, oneCardFlipped] = [false, false]
};

const shuffle = () => {
  resetBoard();
  let winnerImage = document.getElementById("winnerImage");
  winnerImage.classList.remove("show")
  cardsArray.forEach(card => {
    cardsArray.forEach(card => card.classList.remove("hide", "disabled", "flip"))
    let randomPosition = Math.floor(Math.random() * 24);
    card.style.order = randomPosition;
  })
};
shuffle();

const winGame = () => {
  let winnerImage = document.getElementById("winnerImage");
  let resetContainer = document.getElementById("resetContainer");

  if (matchCounter === 12) {
    cardsArray.forEach(card => card.classList.add("hide"));
    winnerImage.classList.add("show");
    document.getElementById("turnCounter").innerHTML = turnCounter;
    resetContainer.classList.add("hide");
  }
};


cardsArray.forEach(card => card.addEventListener("click", flipCard));
