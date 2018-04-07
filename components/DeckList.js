import React from "react";
import {FlatList, Text, TouchableOpacity} from 'react-native';
import {addDeck, getDecks} from "../utils/data";
import {Card, Button} from "react-native-elements";


export default class DeckList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            decks: {}
        };
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

    renderAddButton = () => {
        const {navigate} = this.props.navigation;
        const {submitDeck, refresh} = this;
        return (
            <Button
                icon={{name: 'add'}}
                backgroundColor='#03A9F4'
                buttonStyle={{marginTop: 20, marginBottom: 20}}
                onPress={() => navigate('AddDeck', {
                    refresh,
                    submitDeck
                })}
                title='Create New Deck'/>

        );
    };

    render() {
        const {decks} = this.state;
        const deckArray = decks ? Object.values(decks) : [];
        const {refresh, renderCard, renderAddButton} = this;
        const {navigation} = this.props;
        return (
            <FlatList
                data={deckArray.map((deck => ({
                    key: deck.title,
                    size: deck.questions.length,
                    ...deck
                })))}
                renderItem={item => renderCard(item, navigation, refresh)}
                ListFooterComponent={renderAddButton}
            />
        );
    }
}


