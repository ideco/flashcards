import {AsyncStorage} from 'react-native';

const STORAGE_KEY = '@flashcards:key';

export const getDecks = () => (AsyncStorage.getItem(STORAGE_KEY).then(JSON.parse));

export const addDeck = (title) =>
    (AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    })).then(getDecks));


export const getDeck = (id) => {
    return getDecks().then(decks => decks[id]);
};