import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("https://api.nekosapi.com/v5/images?limit=10&rating=safe", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCards(data.items);
      });
  }, []);
  useEffect(() => {
    console.log(cards);
  }, [cards]);
  return (
    <div className="cards-box">
    {cards.map((card) => <img src={card.url}></img>)}
    </div>
  );
}

export default App;
