const front = "card_front";
const back = "card_back";
const icon = "icon";

startGame();

function startGame() {
  initializeCards(game.createCardsFromFruits());
}

function initializeCards(cards) {
  let gameBoard = document.getElementById("gameBoard");

  gameBoard.innerHTML = "";

  game.cards.forEach((card) => {
    let cardElement = document.createElement("div");
    cardElement.id = card.id;
    cardElement.classList.add("card");
    cardElement.dataset.icon = card.icon;

    createCardContent(card, cardElement);

    gameBoard.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  });
}

function createCardContent(card, cardElement) {
  createCardFace(front, card, cardElement);
  createCardFace(back, card, cardElement);
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement("div");
  cardElementFace.classList.add(face);

  if (face === front) {
    let iconElement = document.createElement("img");
    iconElement.classList.add(icon);
    iconElement.src = "./images/" + card.icon + ".png";
    cardElementFace.appendChild(iconElement);
  } else {
    cardElementFace.innerHTML = "<img class='fruits-image' src='./images/one-piece-icon.png'>";
  }
  element.appendChild(cardElementFace);
}

function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add("flip");
    if (game.secondCard) {
      if (game.checkMatch()) {
        game.clearCards();
        if (game.checkGameOver()) {
          let gameOverLayer = document.getElementById("gameOver");
          gameOverLayer.style.display = "flex";
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);

          firstCardView.classList.remove("flip");
          secondCardView.classList.remove("flip");
          game.unflipCards();
        }, 1000);
      }
    }
  }
}

function restart() {
  game.clearCards();
  startGame();
  let gameOverLayer = document.getElementById("gameOver");
  gameOverLayer.style.display = "none";
}
