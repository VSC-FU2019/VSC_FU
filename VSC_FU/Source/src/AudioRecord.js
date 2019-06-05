import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Platform,
    Image,
    TouchableOpacity,
    Alert,
    PermissionsAndroid, Dimensions,
} from 'react-native';

var {height, width} = Dimensions.get('window');
import Sound from 'react-native-sound';
import {DocumentDirectoryPath} from "react-native-fs"
import {AudioRecorder} from 'react-native-audio';
import {Icon, Picker, Form, Button} from "native-base";
import {currentLanguage, GENDER, languages, SPEECH_TYPES} from "./constants";

class AudioRecord extends Component {
    currentTime = Date.now();
    indexArray = -1;
    state = {
        word: null,
        currentTime: 0.0,
        recording: false,
        paused: false,
        stoppedRecording: false,
        finished: false,
        audioPath: DocumentDirectoryPath + '/' + this.currentTime + '.aac',
        audioName: this.currentTime + '.aac',
        hasPermission: undefined,
    };

    prepareRecordingPath(audioPath) {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 8000,
            Channels: 1,
            AudioQuality: "High",
            AudioEncoding: "aac",
            IncludeBase64: true
        });
    }

    componentDidMount() {
        this.authen();
    }

    authen = () => {
        AudioRecorder.requestAuthorization().then((isAuthorised) => {
            this.setState({hasPermission: isAuthorised});

            if (!isAuthorised) return;

            this.prepareRecordingPath(this.state.audioPath);

            AudioRecorder.onProgress = (data) => {
                this.setState({currentTime: Math.floor(data.currentTime)});
            };

            AudioRecorder.onFinished = (data) => {
                // Android callback comes in the form of a promise instead.
                if (Platform.OS === 'ios') {
                    this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
                }
            };
        });
    }

    async _stop() {
        if (!this.state.recording) {
            console.warn('Can\'t stop, not recording!');
            return;
        }

        this.setState({stoppedRecording: true, recording: false, paused: false});

        try {
            const filePath = await
                AudioRecorder.stopRecording();

            if (Platform.OS === 'android') {
                this._finishRecording(true, filePath);
            }
            return filePath;
        } catch (error) {
            console.error(error);
        }
    }

    async _play() {
        if (this.state.recording) {
            await
                this._stop();
        }

        // These timeouts are a hacky workaround for some issues with react-native-sound.
        // See https://github.com/zmxv/react-native-sound/issues/89.
        setTimeout(() => {
            var sound = new Sound(this.state.audioPath, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                }
            });

            setTimeout(() => {
                sound.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }, 100);
        }, 100);
    }

    async _record() {
        if (!this.state.word) {
            Alert.alert(
                languages['Thông báo'][currentLanguage],
                languages['Vui lòng chọn từ cần thu'][currentLanguage]
            );
            return;
        }
        if (this.state.recording) {
            console.warn('Already recording!');
            return;
        }

        if (!this.state.hasPermission) {
            Alert.alert(
                languages['Thông báo'][currentLanguage]
                ,
                languages['Vui lòng cấp quyền sử dụng micro'][currentLanguage],
            );
            return;
        }

        if (this.state.stoppedRecording) {
            this.prepareRecordingPath(this.state.audioPath);
        }

        this.setState({recording: true, paused: false});

        try {
            const filePath = await
                AudioRecorder.startRecording();
        } catch (error) {
            console.error(error);
        }
    }

    _finishRecording(didSucceed, filePath, fileSize) {
        this.setState({finished: didSucceed});
        console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
    }

    onValueChangeWord = (value) => {
        this.setState({
            word: value
        })
        SPEECH_TYPES.forEach((item, index) => {
            if (item.value == value) {
                this.indexArray = index;
            }
        })
    }

    save = () => {
        this.props.saveData(this.state.word, this.state.audioPath, languages['Bản ghi '][currentLanguage] + this.currentTime, this.state.audioName);
    }

    saveAndExit = () => {
        this.save();
        this.closeModal();
    }

    closeModal = async () => {
        if (this.state.recording) {
            await this._stop();
        }
        this.props.closeModal();
    };

    saveAndNext = () => {
        this.save();
        this.reset();
        this.indexArray++;
        this.setState({
            word: SPEECH_TYPES[this.indexArray].value
        })

    }

    saveAndReset = () => {
        this.save();
        this.reset();
        this.setState({
            word: SPEECH_TYPES[this.indexArray].value
        })
    }

    reset = () => {
        this.currentTime = Date.now();
        this.setState({
            word: null,
            currentTime: 0.0,
            recording: false,
            paused: false,
            stoppedRecording: false,
            finished: false,
            audioPath: DocumentDirectoryPath + '/' + this.currentTime + '.aac',
            audioName: this.currentTime + '.aac',
        })
        this.authen();
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.controls}>
                    <Picker
                        style={{width: width / 2}}
                        mode="dropdown"
                        iosHeader={languages["Chọn từ"][currentLanguage]}
                        iosIcon={<Icon name="arrow-down"/>}
                        placeholder={languages["Chọn từ"][currentLanguage]}
                        selectedValue={this.state.word}
                        onValueChange={this.onValueChangeWord}
                        enabled={!this.state.recording && !this.state.stoppedRecording}
                    >
                        {[{
                            value: null,
                            label: languages["Chọn từ"][currentLanguage]
                        }, ...SPEECH_TYPES].map((type, index) => {
                            return (
                                <Picker.Item label={type.label} value={type.value} key={index}/>
                            )
                        })}
                    </Picker>
                    <View style={{marginVertical: 20}}>
                        {
                            !this.state.recording ?
                                <TouchableOpacity onPress={() => {
                                    this._record();
                                }}>
                                    <Image style={{width: width / 4, height: width / 4}}
                                           source={require('../assets/image/record.png')}/>
                                </TouchableOpacity>

                                :
                                <TouchableOpacity onPress={() => {
                                    this._stop();
                                }}>
                                    <Image style={{width: width / 4, height: width / 4}}
                                           source={require('../assets/image/recording.png')}/>
                                </TouchableOpacity>
                        }
                    </View>

                    <Text style={{fontSize: 25}}>
                        {this.state.currentTime / 60 > 9 ? Math.floor(this.state.currentTime / 60) : '0' + Math.floor(this.state.currentTime / 60)}
                        :
                        {this.state.currentTime % 60 > 9 ? this.state.currentTime % 60 : '0' + this.state.currentTime % 60}
                    </Text>
                </View>
                <View style={{padding: 20, paddingBottom: 20, width: width - 50}}>
                    {this.indexArray >= SPEECH_TYPES.length - 1 ?
                        <Button block disabled={!this.state.stoppedRecording} onPress={() => {
                            this.saveAndExit()
                        }}>
                            <Text style={{color: '#FFFFFF'}}>{languages['LƯU VÀ THOÁT'][currentLanguage]}</Text>
                        </Button>
                        :
                        <Button block disabled={!this.state.stoppedRecording} onPress={() => {
                            this.saveAndNext()
                        }}>
                            <Text style={{color: '#FFFFFF'}}>{languages['LƯU VÀ THU TỪ TIẾP THEO'][currentLanguage]}</Text>
                        </Button>
                    }

                    <Button block disabled={!this.state.stoppedRecording} style={{marginTop: 20}} onPress={() => {
                        this.saveAndReset()
                    }}>
                        <Text style={{color: '#FFFFFF'}}>{languages['LƯU VÀ THU LẠI TỪ NÀY'][currentLanguage]}</Text>
                    </Button>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1, paddingRight: 5}}>
                            <Button block
                                    disabled={!this.state.stoppedRecording}
                                    onPress={() => {
                                        this._play()
                                    }}
                                    style={{marginTop: 20}}>
                                <Text style={{color: '#FFFFFF'}}>{languages['PHÁT LẠI'][currentLanguage]}</Text>
                            </Button>
                        </View>
                        <View style={{flex: 1, paddingLeft: 5}}>
                            <Button block
                                    onPress={this.closeModal}
                                    style={{marginTop: 20}}>
                                <Text style={{color: '#FFFFFF'}}>{languages['THOÁT'][currentLanguage]}</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    controls: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    progressText: {
        paddingTop: 50,
        fontSize: 50,
        color: "#000000"
    },
    button: {
        padding: 20
    },
    disabledButtonText: {
        color: '#000000'
    },
    buttonText: {
        fontSize: 20,
        color: "#000000"
    },
    activeButtonText: {
        fontSize: 20,
        color: "#B81F00"
    }

});

export default AudioRecord;