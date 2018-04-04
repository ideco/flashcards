import React, {Component} from 'react';
import {Text} from "react-native";
import {Button, Card} from "react-native-elements";
import {getDeck} from "../utils/data";

class Deck extends Component {

    constructor(props) {
        super(props);
        this.state = {deck: null}
    }

    componentDidMount() {
        const {title} = this.props.navigation.state.params;
        getDeck(title).then((deck) => {
            this.setState({
                deck
            })
        })
    }

    render() {
        if (this.state.deck === null) {
            return (
                <Text>Loading</Text>
            )
        }
        const {navigation} = this.props;
        const {title, questions} = this.state.deck;
        const size = questions.length;
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
                    onPress={() => navigation.navigate('AddQuestion', title)}
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
