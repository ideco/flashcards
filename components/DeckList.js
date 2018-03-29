import React from "react";
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {getDecks} from "../utils/data";
import {Card} from "react-native-elements";



export default class DeckList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {decks: null}
    }

    componentDidMount() {
        getDecks().then((decks) => {
            this.setState({
                decks: JSON.parse(decks)
            })
        })
    }

    renderCard = ({item}, navigation) => (
        <TouchableOpacity onPress={() => navigation.navigate('Deck', item)}>
            <Card
                key={item.title}
                title={item.title}>
                <Text style={{textAlign: 'center'}}>{`${item.size} cards`}</Text>
            </Card>
        </TouchableOpacity>
    );

    render() {
        const {decks} = this.state;
        const {navigation} = this.props;
        if (decks === null) {
            return (
                <Text>Loading</Text>
            )
        }
        return (
            <View>
                <FlatList
                    data={Object.values(decks).map((deck => ({
                        key: deck.title,
                        size: deck.questions.length,
                        ...deck
                    })))}
                    renderItem={item => this.renderCard(item, navigation)}
                />
            </View>
        );
    }
}


