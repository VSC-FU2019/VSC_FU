/**
 * Created by phanmduong on 4/26/17.
 */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Dimensions} from 'react-native';
import App from './App'
import CodePush from "react-native-code-push";
import Modal from 'react-native-modalbox';
import {Container, Content, Text, View} from 'native-base';
import * as Progress from 'react-native-progress';

var {height, width} = Dimensions.get('window');


export default class SpeechCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codePushDownloading: false,
            codePushInstalling: false,
            downloadProgress: 0
        };
    }

    componentDidMount() {
        CodePush.sync({updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE},
            (status) => {
                switch (status) {
                    case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                        this.setState({
                            codePushDownloading: true,
                            codePushInstalling: false,
                        });
                        this._modal.open();
                        break;
                    case CodePush.SyncStatus.INSTALLING_UPDATE:
                        this.setState({
                            codePushDownloading: false,
                            codePushInstalling: true,
                        });
                        break;
                    case CodePush.SyncStatus.UPDATE_INSTALLED:
                        this._modal.close();
                        this.setState({
                            codePushDownloading: false,
                            codePushInstalling: false
                        });
                        break;
                    default:
                        break;
                }
            },
            ({receivedBytes, totalBytes}) => {
                this.setState({downloadProgress: (receivedBytes / totalBytes) * 100});
            }
        );
    }

    updateText() {
        if (this.state.codePushDownloading && !this.state.codePushInstalling) {
            return "Đang tải ..."
        } else {
            if (!this.state.codePushDownloading && this.state.codePushInstalling) {
                return "Đang cài đặt ..."
            } else if (this.state.codePushDownloading && this.state.codePushInstalling) {
                return "Cập nhật thành công.";
            }
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <App/>
                <Modal
                    style={styles.modal}
                    position={"center"}
                    ref={(modal) => {
                        this._modal = modal
                    }}
                    isDisabled={false}
                    backdropPressToClose={false}
                    swipeToClose={false}
                >
                    <Progress.Circle
                        size={150}
                        progress={this.state.downloadProgress}
                        indeterminate={this.state.indeterminate}
                        color={"#1565C0"}
                        showsText
                        formatText={(progressValue) => {
                            return parseInt(progressValue * 100) + '%';
                        }}
                    />
                    <Text style={{fontSize: 20, marginTop: 16}}>
                        {this.updateText()}
                    </Text>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: 300
    },
    textProgress: {
        fontSize: 30
    }
});

let codePushOptions = {updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE};
SpeechCollection = CodePush(codePushOptions)(SpeechCollection);

AppRegistry.registerComponent('SpeechCollection', () => SpeechCollection);