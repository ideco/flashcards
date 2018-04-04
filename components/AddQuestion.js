import React, {Component} from 'react';
import {FormLabel, FormInput, Button, FormValidationMessage} from 'react-native-elements'
import {View, Text} from "react-native";

class AddQuestion extends Component {

    constructor(props) {
        super(props);
        const {submitQuestion} = props.navigation.state.params;
        this.state = {
            question: '',
            answer: '',
            submitQuestion
        };
        this.setQuestion = this.setQuestion.bind(this);
        this.setAnswer = this.setAnswer.bind(this);
    }

    setQuestion(question) {
        this.setState((state) => ({
            ...state,
            question
        }))
    }

    setAnswer(answer) {
        this.setState((state) => ({
            ...state,
            answer
        }))
    }

    render() {
        const {question, answer, submitQuestion} = this.state;
        const {navigation} = this.props;
        const questionEmpty = !question || question.length === 0;
        const answerEmpty = !answer || answer.length === 0;
        const buttonDisabled = questionEmpty || answerEmpty;
        return (
            <View style={{backgroundColor: 'white'}}>
                <FormLabel>Question</FormLabel>
                <FormInput onChangeText={this.setQuestion}/>
                {questionEmpty ? <FormValidationMessage> {'Please enter a question'}</FormValidationMessage> : <Text>''</Text>}

                <FormLabel>Answer</FormLabel>
                <FormInput onChangeText={this.setAnswer}/>
                {answerEmpty ? <FormValidationMessage> {'Please enter an answer'}</FormValidationMessage> :  <Text>''</Text>}
                <Button
                    disabled={buttonDisabled}
                    icon={{name: 'add'}}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 20}}
                    onPress={() => {
                        submitQuestion(question, answer);
                        navigation.goBack();
                    }}
                    title='Submit'/>
            </View>
        );
    }
}

export default AddQuestion;
