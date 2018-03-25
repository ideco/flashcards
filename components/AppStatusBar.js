import React from 'react';
import {StatusBar, View} from "react-native";
import {Constants} from 'expo'

const AppStatusBar = () => {
    return (
        <View style={{height: Constants.statusBarHeight}}>
            <StatusBar/>
        </View>
    );
};

export default AppStatusBar;
