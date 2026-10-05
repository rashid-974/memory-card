import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("https://api.nekosapi.com/v5/images?limit=10&rating=safe", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCards(data.items);
      });
  }, []);

  return (
    <div>
      <h1>Memory Game</h1>
      <h2>{score}</h2>
      <div className="cards-box">
        {cards.map((card) => (
          <img
            src={card.url}
            key={card.id}
            alt="game card"
            onClick={() => {
              onCardClick({
                clickedCards: clickedCards,
                changeScore: setScore,
                cardID: card.id,
                addClickedCard: setClickedCards,
                shuffleCards: setCards,

              });
              setCards(shuffle([...cards]))
            }}
          ></img>
        ))}
      </div>
    </div>
  );
}

function onCardClick({ clickedCards, changeScore, cardID, addClickedCard}) {
  if (clickedCards.includes(cardID)) {
    changeScore(0);
    addClickedCard([]);
  } else {
    const newArr = [...clickedCards];
    newArr.push(cardID);
    changeScore((prevCount) => prevCount + 1);
    addClickedCard(newArr);
  }
}

function shuffle(array) {
  const newArr = array.sort(() => Math.random() - 0.5);
  return newArr;
}

export default App;
