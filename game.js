let game = {
  lockMode: false,
  firstCard: null,
  secondCard: null,

  fruits: ["gomo-gomo", "moku-moku", "mera-mera", "sara-sara", "hana-hana", "pika-pika", "sube-sube", "ope-ope", "yomi-yomi", "kage-kage"],
  cards: null,

  setCard: function (id) {
    let card = this.cards.filter((card) => card.id === id)[0];
    if (card.flipped || this.lockMode) {
      return false;
    }
    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  checkMatch: function () {
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },

  unflipCards: function () {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  checkGameOver() {
    return this.cards.filter((card) => !card.flipped).length == 0;
  },

  createCardsFromTech: function () {
    this.cards = [];
    this.fruits.forEach((fruit) => {
      this.cards.push(this.createPairFromTech(fruit));
    });
    this.cards = this.cards.flatMap((pair) => pair);
    this.shuffleCards();
    return this.cards;
  },

  createPairFromTech: function (fruit) {
    return [
      {
        id: this.createIdWithTech(fruit),
        icon: fruit,
        flipped: false
      },
      {
        id: this.createIdWithTech(fruit),
        icon: fruit,
        flipped: false
      }
    ];
  },

  createIdWithTech: function (fruit) {
    return (fruit += parseInt(Math.random() * 1000));
  },

  shuffleCards: function (cards) {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
    }
  }
};
