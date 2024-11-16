document.addEventListener("DOMContentLoaded", () => {
  const cardArray = [
    { name: "earth", img: "Planets/Earth.jpeg" },
    { name: "saturn", img: "Planets/jupite.jpeg" },
    { name: "lua", img: "Planets/transferir.jpeg" },
    { name: "mart", img: "Planets/mart.jpeg" },
    { name: "mercurio", img: "Planets/mercurio.png" },
    { name: "netuno", img: "Planets/netuno.png" },
    { name: "earth", img: "Planets/Earth.jpeg" },
    { name: "saturn", img: "Planets/jupite.jpeg" },
    { name: "lua", img: "Planets/transferir.jpeg" },
    { name: "mart", img: "Planets/mart.jpeg" },
    { name: "mercurio", img: "Planets/mercurio.png" },
    { name: "netuno", img: "Planets/netuno.png" },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  const livesDisplay = document.querySelector("#lives");
  const restartButton = document.querySelector("#restart");
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let lives = 5;

  // Create the game board
  function createBoard() {
    grid.innerHTML = "";
    cardArray.forEach((cardData, i) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-id", i);

      const cardInner = document.createElement("div");
      cardInner.classList.add("card-inner");

      const cardFront = document.createElement("div");
      cardFront.classList.add("card-front");

      const cardBack = document.createElement("div");
      cardBack.classList.add("card-back");
      cardBack.style.backgroundImage = `url(${cardData.img})`; // Define a imagem do verso

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      card.appendChild(cardInner);
      grid.appendChild(card);

      card.addEventListener("click", flipCard);
    });
  }

  // ... (restante do seu código, exceto checkForMatch e checkGameOver)

  function checkForMatch() {
    const cards = document.querySelectorAll(".card"); // Seleciona todas as cartas (divs)
    const [optionOneId, optionTwoId] = cardsChosenId;

    const cardOne = cards[optionOneId];
    const cardTwo = cards[optionTwoId];

    if (optionOneId === optionTwoId) {
      // Não faz nada se for a mesma carta
    } else if (cardsChosen[0] === cardsChosen[1]) {
      alert("Você encontrou um par!");
      cardOne.classList.add("matched"); // Adiciona uma classe para cartas pareadas
      cardTwo.classList.add("matched");
      cardOne.removeEventListener("click", flipCard);
      cardTwo.removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
    } else {
      // Volta as cartas para a posição inicial após um tempo
      setTimeout(() => {
        cardOne.classList.remove("flipped");
        cardTwo.classList.remove("flipped");
      }, 1000); // Tempo em milissegundos
      lives--;
      updateLivesDisplay();
      alert("Tente novamente!");
    }

    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    checkGameOver();
  }

  function checkGameOver() {
    if (cardsWon.length === cardArray.length / 2) {
      resultDisplay.textContent = "Parabéns! Você encontrou todas as cartas!";
      grid.innerHTML = "";
      alert("Parabéns! Você venceu!");
      return;
    }
    if (lives === 0) {
      alert("Game Over! Você ficou sem vidas!");
      grid.innerHTML = "";
      return;
    }
  }

  // ... (restante do seu código)

  //Flip the Card
  function flipCard() {
    const cardId = parseInt(this.getAttribute("data-id")); // parseInt para garantir que seja um número
    if (!cardsChosenId.includes(cardId)) {
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.classList.toggle("flipped"); // Adiciona ou remove a classe flipped

      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 1000); // Aumentei um pouco o tempo
      }
    }
  }

  //Update LIVES DISPLAY
  function updateLivesDisplay() {
    livesDisplay.textContent = "❤️".repeat(lives);
  }

  //Restart the game
  function restartGame() {
    lives = 5;
    cardsWon = [];
    updateLivesDisplay();
    cardArray.sort(() => 0.5 - Math.random());
    createBoard();
  }

  restartButton.addEventListener("click", restartGame);

  //INL SETUP
  updateLivesDisplay();
  createBoard();
});
