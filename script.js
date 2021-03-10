const cards = document.getElementsByClassName("memory-card");
const cardsArray = Array.from(cards);

let oneCardFlipped = false;
let firstCard, secondCard;
let boardLocked = false;

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

  setTimeout(() => {
    firstCard.classList.add("disabled");
    secondCard.classList.add("disabled");
    firstCard = null;
    secondCard = null;
    boardLocked = false;
  }, 1500);
};

const unflipCards = () => {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    firstCard = null;
    secondCard = null;
    boardLocked = false;
  }, 1500)
};

const shuffle = () => {
  cardsArray.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 24);
    card.style.order = randomPosition;
  })
}
shuffle(); 

cardsArray.forEach(card => card.addEventListener("click", flipCard));
