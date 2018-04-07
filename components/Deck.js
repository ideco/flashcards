import React, {Component} from 'react';
import {Text} from "react-native";
import {Button, Card} from "react-native-elements";
import {addQuestion, getDeck} from "../utils/data";

class Deck extends Component {

    constructor(props) {
        super(props);
        const {title, refresh} = props.navigation.state.params;
        this.state = {
            title,
            size: 0,
            questions: [],
            refreshParent: refresh
        };
    }

    componentDidMount() {
        const {title} = this.props.navigation.state.params;
        getDeck(title).then(deck => {
            this.setState((state) => ({
                ...state,
                title: deck.title,
                questions: deck.questions,
                size: deck.questions.length
            }))
        })
    }

    submitQuestion(question, answer) {
        addQuestion(this.state.title, question, answer)
            .then(deck => this.setState((state) => ({
                    ...state,
                questions: deck.questions,
                    size: deck.questions.length
                }))
            )
            .then(this.state.refreshParent);
    }

    onAddQuestionPress = () => {
        const {navigate} = this.props.navigation;
        const submitQuestion = this.submitQuestion.bind(this);
        navigate('AddQuestion', {
            submitQuestion
        });
    };

    onStartQuizPress = () => {
        const {navigate} = this.props.navigation;
        const {title, questions} = this.state;
        navigate('Quiz', {
            title,
            questions
        })
    };

    render() {
        const {title, size} = this.state;
        const {onAddQuestionPress, onStartQuizPress} = this;
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
                    onPress={onAddQuestionPress}
                    title='Add Questions'/>
                <Button
                    icon={{name: 'question-answer'}}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    onPress={onStartQuizPress}
                    title='Start Quiz'/>
            </Card>
        );
    }
}

export default Deck;
