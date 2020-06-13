import React from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';
const API_BASE_URL = "https://www.deckofcardsapi.com/api/deck";

class Deck extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            deck: null,
            drawn: []
        }
        this.getCard = this.getCard.bind(this);
    }

    async componentDidMount(){
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        this.setState({deck: deck.data});
    }

    async getCard(){
        let cardUrl = `${API_BASE_URL}/${this.state.deck.deck_id}/draw`;
        try{
            let cardRes = await axios.get(cardUrl)
            if(!cardRes.data.success){
                throw new Error("No Cards Left!");
            }
            let card = cardRes.data.cards[0];
            const newCard = {
                id: card.code,
                image: card.image,
                name: `${card.suit} ${card.value}`
            };
            this.setState(st => ({
                drawn: [...st.drawn, newCard]
            }));
        } catch(err){
            alert(err);
        }
    }
    
    render(){
        const cards = this.state.drawn.map(c => <Card name={c.name} key={c.id} image={c.image}/>)
        return (
            <div className="Deck">
                <h1 className="Deck-title">Card Dealer!</h1>
                <h2 className="Deck-title subtitle">Little Demo made with REACT!</h2>
                <button className="Deck-btn" onClick={this.getCard}>Get Card</button>
                <div className="Deck-cards">
                    {cards}
                </div>
            </div>
        );
    }
}

export default Deck;