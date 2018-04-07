import React from 'react';
import DeckList from "./components/DeckList";
import {StackNavigator} from "react-navigation";
import Deck from "./components/Deck";
import AddQuestion from "./components/AddQuestion";
import AddDeck from "./components/AddDeck";
import Quiz from "./components/Quiz";

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
    },
    Quiz: {
        screen: Quiz
    }
});

const prevGetStateForAction = Stack.router.getStateForAction;

Stack.router.getStateForAction = (action, state) => {
    // Do not allow to go back to AddQuestion or AddDeck
    if (action.type === 'Navigation/BACK' && state) {
        const newRoutes = state.routes.filter(r => (r.routeName !== 'AddQuestion' && r.routeName !== 'AddDeck'));
        const newIndex = newRoutes.length - 1;
        return prevGetStateForAction(action, {index: newIndex, routes: newRoutes});
    }
    return prevGetStateForAction(action, state);
};

export default class App extends React.Component {
    render() {
        return (
            <Stack/>
        );
    }
}


