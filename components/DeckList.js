import React from "react";
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {addDeck, getDecks} from "../utils/data";
import {Card, Button} from "react-native-elements";


export default class DeckList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {decks: null};
        this.submitDeck = this.submitDeck.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.refresh();
    }


    refresh() {
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

    renderCard = ({item}, navigation, refresh) => (
        <TouchableOpacity onPress={() => navigation.navigate('Deck', {
            title: item.title,
            refresh
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
        const refresh = this.refresh;
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
                        renderItem={item => this.renderCard(item, navigation, refresh)}
                    />) : (
                    <Text>No cards</Text>
                )
                }
                <Button
                    icon={{name: 'add'}}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 20}}
                    onPress={() => navigation.navigate('AddDeck', {refresh, submitDeck})}
                    title='Create New Deck'/>
            </View>
        );
    }
}


