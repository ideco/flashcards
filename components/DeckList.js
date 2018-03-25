import React from "react";
import {FlatList, Text, View} from 'react-native';
import {getDeckInfos} from "../utils/data";
import {Card} from "react-native-elements";

const renderCard = ({item}) => (
    <Card
        key={item.title}
        title={item.title}>
        <Text style={{textAlign:'center'}}>{`${item.size} cards`}</Text>
    </Card>
);

export default class DeckList extends React.Component {
    render() {
        return (
            <View>
                <FlatList
                    data={getDeckInfos()}
                    renderItem={renderCard}
                />
            </View>
        );
    }
}


