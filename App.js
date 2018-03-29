import React from 'react';
import DeckList from "./components/DeckList";
import {StackNavigator} from "react-navigation";
import Deck from "./components/Deck";
import AddQuestion from "./components/AddQuestion";

const Stack = StackNavigator({
    DeckList: {
        screen: DeckList
    },
    Deck: {
        screen: Deck
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


