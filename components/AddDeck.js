import React, {Component} from 'react';
import {FormLabel, FormInput, Button, FormValidationMessage} from 'react-native-elements'
import {View, Text} from "react-native";

class AddDeck extends Component {

    constructor(props) {
        super(props);
        const {submitDeck, refresh} = props.navigation.state.params;
        this.state = {
            title: '',
            submitDeck,
            refresh
        };
        this.setTitle = this.setTitle.bind(this);
    }

    setTitle(title) {
        this.setState((state) => ({
            ...state,
            title: title
        }))
    }


    render() {
        const {title, submitDeck, refresh} = this.state;
        const titleEmpty = !title || title.length === 0;
        const {navigation} = this.props;
        return (
            <View style={{backgroundColor: 'white'}}>
                <FormLabel>Deck Title</FormLabel>
                <FormInput onChangeText={this.setTitle}/>
                {titleEmpty ?
                    <FormValidationMessage> {'Please enter a title for the new deck'}</FormValidationMessage> :
                    <Text>''</Text>}
                <Button
                    icon={{name: 'add'}}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginTop: 20}}
                    onPress={() => {
                        submitDeck(title);
                        navigation.navigate('Deck', {
                            title,
                            refresh
                        })
                    }}
                    title='Create'/>
            </View>
        );
    }
}

export default AddDeck;

