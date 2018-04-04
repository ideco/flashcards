import {AsyncStorage} from 'react-native';

const STORAGE_KEY = '@flashcards:key';

export const getDecks = () => (AsyncStorage.getItem(STORAGE_KEY).then(JSON.parse));

export const addDeck = (title) => (AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [title]: {
        title,
        questions: []
    }
})).then(getDecks));

export const addQuestion = (deck, question, answer) => (getDecks()
        .then(decks => AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
            ...decks,
            [deck]: {
                ...decks[deck],
                questions: decks[deck].questions.concat([{
                    question,
                    answer
                }])
            }
        })))
        .then(getDecks)
);