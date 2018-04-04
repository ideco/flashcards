import React from 'react';
import DeckList from "./components/DeckList";
import {StackNavigator} from "react-navigation";
import Deck from "./components/Deck";
import AddQuestion from "./components/AddQuestion";
import AddDeck from "./components/AddDeck";

const Stack = StackNavigator({
    DeckList: {
        screen: DeckList
    },
    Deck: {
        screen: Deck
    },
    AddDeck: {
        screen: AddDeck
    },
    AddQuestion: {
        screen: AddQuestion
    }
});

export default class App extends React.Component {
    render() {
        return (
            <Stack/>
        );
    }
}


