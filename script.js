const cards = document.getElementsByClassName("memory-card");
const cardsArray = Array.from(cards)

const flipCard = (event) => {
  console.log("clicked")
  event.currentTarget.classList.toggle("flip")
}

cardsArray.forEach(card => card.addEventListener("click", flipCard))