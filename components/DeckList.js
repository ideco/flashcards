import React from "react";
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {addDeck, addQuestion, getDecks} from "../utils/data";
import {Card, Button} from "react-native-elements";


export default class DeckList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {decks: null};
        this.submitDeck = this.submitDeck.bind(this);
        this.submitQuestion = this.submitQuestion.bind(this);
    }

    componentDidMount() {
        getDecks().then((decks) => {
            this.setState({
                decks: decks
            })
        })
    }


    submitDeck(title) {
        addDeck(title).then((decks) => {
            this.setState({
                decks: decks
            })
        })
    }

    submitQuestion(deck, question, answer) {
        addQuestion(deck, question, answer).then((decks) => {
            this.setState({
                decks: decks
            })
        })
    }

    renderCard = ({item}, navigation, submitQuestion) => (
        <TouchableOpacity onPress={() => navigation.navigate('Deck', {
            item,
            submitQuestion: (question, answer) => submitQuestion(item.title, question, answer)
        })}>
            <Card
                key={item.title}
                title={item.title}>
                <Text style={{textAlign: 'center'}}>{`${item.size} cards`}</Text>
            </Card>
        </TouchableOpacity>
    );

    render() {
        const {decks} = this.state;
        const submitDeck = this.submitDeck;
        const submitQuestion = this.submitQuestion;
        const {navigation} = this.props;
        return (
            <View>
                {decks !== null ? (
                    <FlatList
                        data={Object.values(decks).map((deck => ({
                            key: deck.title,
                            size: deck.questions.length,
                            ...deck
                        })))}
                        renderItem={item => this.renderCard(item, navigation, submitQuestion)}
                    />) : (
                    <Text>No cards</Text>
                )
                }
                <Button
                    icon={{name: 'add'}}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 20}}
                    onPress={() => navigation.navigate('AddDeck', {submitDeck})}
                    title='Create New Deck'/>
            </View>
        );
    }
}


