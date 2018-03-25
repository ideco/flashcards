import React from 'react';
import {View} from 'react-native';
import DeckList from "./components/DeckList";
import AppStatusBar from "./components/AppStatusBar";

export default class App extends React.Component {
    render() {
        return (
            <View>
                <AppStatusBar />
                <DeckList/>
            </View>
        );
    }
}


