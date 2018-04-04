import React, {Component} from 'react';
import {Text} from "react-native";
import {Button, Card} from "react-native-elements";
import {addQuestion, getDeck} from "../utils/data";

class Deck extends Component {

    constructor(props) {
        super(props);
        const {title, refresh} = props.navigation.state.params;
        this.state = {
            title: title,
            size: -1,
            refreshParent: refresh
        };
        this.submitQuestion = this.submitQuestion.bind(this);
    }

    componentDidMount() {
        const {title} = this.props.navigation.state.params;
        getDeck(title).then(deck => {
            this.setState((state) => ({
                ...state,
                title: deck.title,
                size: deck.questions.length
            }))
        })
    }


    submitQuestion(question, answer) {
        addQuestion(this.state.title, question, answer)
            .then(deck => this.setState((state) => ({
                    ...state,
                    size: deck.questions.length
                }))
            )
            .then(this.state.refreshParent);
    }

    render() {
        const {navigation} = this.props;
        const {title, size} = this.state;
        const submitQuestion = this.submitQuestion;
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
                    onPress={() => navigation.navigate('AddQuestion', {
                        submitQuestion
                    })}
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
