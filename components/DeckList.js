import React from "react";
import {FlatList, Text, View} from 'react-native';
import {getDecks} from "../utils/data";
import {Card} from "react-native-elements";

const renderCard = ({item}) => (
    <Card
        key={item.title}
        title={item.title}>
        <Text style={{textAlign: 'center'}}>{`${item.size} cards`}</Text>
    </Card>
);

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

    render() {
        const {decks} = this.state;
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
                        title: deck.title,
                        size: deck.questions.length
                    })))}
                    renderItem={renderCard}
                />
            </View>
        );
    }
}


