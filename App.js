import React from 'react';
import DeckList from "./components/DeckList";
import {StackNavigator} from "react-navigation";
import Deck from "./components/Deck";

const Stack = StackNavigator({
    DeckList: {
        screen: DeckList
    },
    Deck: {
        screen: Deck
    }
});

export default class App extends React.Component {
    render() {
        return (
            <Stack/>
        );
    }
}


