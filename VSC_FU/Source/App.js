import React, {Component} from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import LoginScreen from "./src/LoginScreen";
import UserInfoScreen from "./src/UserInfoScreen";
import RecordScreen from "./src/RecordScreen";
import UploadScreen from "./src/UploadScreen";

const Authentication = createStackNavigator({
    UserInfo: UserInfoScreen,
    Record: RecordScreen,
    Upload: UploadScreen,
}, {
    defaultNavigationOptions: {
        headerBackTitle: null,
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: '#1565C0'
        },
        headerPressColorAndroid: '#ffffff80',
    },
});

const AppNavigator = createStackNavigator(
    {
        LoginScreen: {
            screen: LoginScreen,
        },
        AuthenticationScreen: Authentication
    },
    {
        initialRouteName: "LoginScreen",
        headerMode: 'none',

    }
);

const AppContainer = createAppContainer(AppNavigator);

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <AppContainer/>
        );
    }
}


