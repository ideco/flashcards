import {AsyncStorage} from 'react-native';

const STORAGE_KEY = '@flashcards:key';

export const DEFAULT_DATA = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
};

export const getDecks = () => AsyncStorage.getItem(STORAGE_KEY, (data) => {
    let parsedData = JSON.parse(data);
    if (parsedData !== null) {
        return parsedData;
    }
    // Insert default data and return promise
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA))
        .then(() => AsyncStorage.getItem(STORAGE_KEY, JSON.parse));
});