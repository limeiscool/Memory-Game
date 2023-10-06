document.addEventListener('DOMContentLoaded', () => {
  fetch('cardArray.json')
  .then(res => res.json())
  .then(data => {
    const cardArray = data
    
    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    let cardsChosen = []
    let cardsChosenID = []
    let cardsWon = []

    // create board
    const createBoard = () => {
      cardArray.forEach((el, i) => {
        let card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
      })
    }
    // check match
    const checkMatch = () => {
      let cards = document.querySelectorAll('img')
      const optionOneID = cardsChosenID[0]
      const optionTwoID = cardsChosenID[1]
      if (cardsChosen[0] === cardsChosen[1]) {
        alert('You found a match!')
        cards[optionOneID].setAttribute('src', '')
        cards[optionTwoID].setAttribute('src', '')
        cardsWon.push(cardsChosen)
      } else {
        cards[optionOneID].setAttribute('src', 'images/blank.png')
        cards[optionTwoID].setAttribute('src', 'images/blank.png')
        alert('Sorry, try again...')
      }
      cardsChosen = []
      cardsChosenID = []
      resultDisplay.textContent = cardsWon.length
      if (cardsWon.length === cardArray.length/2) {
        resultDisplay.textContent = 'Congratulations! You found them all!!!'
      }
    }

    // flip
    const flipCard = (e) => {
      let cardID = e.target.getAttribute('data-id')
      cardsChosen.push(cardArray[cardID].Name)
      cardsChosenID.push(cardID)
      e.target.setAttribute('src', cardArray[cardID].img)
      if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
      }
    }

    createBoard();
  })
})
