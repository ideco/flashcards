import React, {Component} from 'react';
import {Text} from "react-native";
import {Button, Card} from "react-native-elements";

class Deck extends Component {

    constructor(props) {
        super(props);
        const {item, submitQuestion} = props.navigation.state.params;
        this.state = {
            title: item.title,
            size: item.questions.length,
            submitQuestion
        };
        this.submitQuestion = this.submitQuestion.bind(this);
    }


    submitQuestion(question, answer) {
        this.state.submitQuestion(question, answer);
        this.setState((state) => ({
            ...state,
            size: state.size + 1
        }));

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
