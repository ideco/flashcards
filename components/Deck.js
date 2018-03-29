import React, {Component} from 'react';
import {Text} from "react-native";
import {Button, Card} from "react-native-elements";

class Deck extends Component {
    render() {
        const {title, size} = this.props.navigation.state.params;
        return (
            <Card
                title={title}>
                <Text style={{marginBottom: 20, textAlign: 'center'}}>
                    This card deck contains {size} question{size !== 1 ? 's' : ''}.
                </Text>
                <Button
                    icon={{name: 'add'}}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                    title='Add Questions'/>
                <Button
                    icon={{name: 'question-answer'}}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Start Quiz'/>
            </Card>
        );
    }
}

export default Deck;
