import React, {Component} from 'react'
import {View, Text} from "react-native";
import {Button, Card} from "react-native-elements";

class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            questions: [],
            index: -1,
            showQuestion: true,
            showResult: false,
            correct: 0,
        };
    }

    componentDidMount() {
        const {title, questions} = this.props.navigation.state.params;
        this.setState((state) => ({
            ...state,
            title,
            questions,
            index: 0,
            correct: 0,
            showQuestion: true,
            showResult: false,
        }))
    }

    onShowAnswerPress = () => {
        this.setState((state) => ({
            ...state,
            showQuestion: false
        }))
    };

    onCorrectAnswerPress = () => {
        const nextIdx = this.state.index + 1;
        const newCorrect = this.state.correct + 1;
        if (nextIdx === this.state.questions.length) {
            this.setState((state) => ({
                ...state,
                correct: newCorrect,
                showResult: true
            }))
        }
        this.setState((state) => ({
            ...state,
            correct: newCorrect,
            index: nextIdx,
            showQuestion: true,
        }))
    };

    onWrongAnswerPress = () => {
        const nextIdx = this.state.index + 1;
        if (nextIdx === this.state.questions.length) {
            this.setState((state) => ({
                ...state,
                showResult: true
            }))
        }
        this.setState((state) => ({
            ...state,
            index: nextIdx,
            showQuestion: true,
        }))
    };

    onRestartQuizPress = () => {
        this.setState((state) => ({
            ...state,
            index: 0,
            correct: 0,
            showQuestion: true,
            showResult: false,
        }))
    };

    onBackToDeckPress = () => {
        const {goBack} = this.props.navigation;
        goBack();
    };

    render() {
        const {index, title, questions, showQuestion, showResult, correct} = this.state;
        const {onShowAnswerPress, onCorrectAnswerPress, onWrongAnswerPress, onRestartQuizPress, onBackToDeckPress} = this;
        const question = questions[index] ? questions[index].question : '';
        const answer = questions[index] ? questions[index].answer : '';
        if (showResult) {
            return (
                <Card
                    title={`Deck '${title}' completed.`}>
                    <Text style={{marginBottom: 20, textAlign: 'center'}}>
                        {`You scored ${correct} out of ${questions.length} possible points.`}
                    </Text>
                    <Button
                        icon={{name: 'question-answer'}}
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                        onPress={onRestartQuizPress}
                        title='Restart Quiz'/>
                    <Button
                        icon={{name: 'question-answer'}}
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        onPress={onBackToDeckPress}
                        title='Back to Deck'/>
                </Card>
            )
        }
        return (
            <Card
                title={`Question ${index + 1} of ${questions.length}`}>
                {showQuestion ?
                    (
                        <View>
                            <Text style={{marginBottom: 20, textAlign: 'center'}}>
                                {question}
                            </Text>
                            <Button
                                icon={{name: 'add'}}
                                backgroundColor='#03A9F4'
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                                onPress={onShowAnswerPress}
                                title='Show Answer'/>
                        </View>
                    ) : (
                        <View>
                            <Text style={{marginBottom: 20, textAlign: 'center'}}>
                                {answer}
                            </Text>
                            <Button
                                icon={{name: 'question-answer'}}
                                backgroundColor='green'
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                                onPress={onCorrectAnswerPress}
                                title='Correct'/>
                            <Button
                                icon={{name: 'question-answer'}}
                                backgroundColor='red'
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                onPress={onWrongAnswerPress}
                                title='Wrong'/>
                        </View>
                    )}
            </Card>
        )
    }
}

export default Quiz;