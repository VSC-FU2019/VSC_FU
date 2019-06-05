/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {Dimensions, Text, View, Alert} from 'react-native';
import {currentLanguage, languages, SPEECH_TYPES} from "./constants";
import {Container, Left, Right, Icon, Content, List, ListItem, Button} from 'native-base';
import Modal from "react-native-modal";
import AudioRecord from "./AudioRecord";
import Sound from "react-native-sound";
import {StackActions, NavigationActions} from 'react-navigation';

var {height, width} = Dimensions.get('window');

class RecordScreen extends React.Component {
    constructor(props, context) {
        super(props, context);
        let list = SPEECH_TYPES;
        list = list.map((type) => {
            return {
                ...type,
                speechCollections: []
            }
        })
        this.state = {
            list: list,
            isVisible: false
        }

    }

    static navigationOptions = () => ({
        title: languages["Thu giọng nói"][currentLanguage],
    })

    convertData = (data) => {
        let arr = [];
        data.forEach(item => {
            arr.push({name: item.label, isHeader: true, value: item.value});
            item.speechCollections.forEach((speech) => {
                arr.push({...speech});
            });
        })
        return arr;
    }

    isNext = (data) => {
        return data.length > SPEECH_TYPES.length;
    }

    openScreen = (listRecord) => {
        this.props.navigation.navigate('Upload', {
            age: this.props.navigation.getParam('age'),
            gender: this.props.navigation.getParam('gender'),
            province: this.props.navigation.getParam('province'),
            listRecord: listRecord
        })
    }

    hideModal = () => {
        this.setState({isVisible: false})
    }

    openModal = () => {
        this.setState({isVisible: true})
    }

    saveData = (speechType, link, name, nameFile) => {
        var list = this.state.list;
        list = list.map(item => {
            if (item.value == speechType) {
                let speechCollections = [...item.speechCollections, {
                    name: name,
                    link: link,
                    nameFile: nameFile
                }];
                return {
                    ...item,
                    speechCollections: speechCollections
                }
            }
            return {...item}
        })
        this.setState({list})
    }

    async _play(audioPath) {
        // These timeouts are a hacky workaround for some issues with react-native-sound.
        // See https://github.com/zmxv/react-native-sound/issues/89.
        setTimeout(() => {
            var sound = new Sound(audioPath, '', (error) => {
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

    deleteData = (link) => {
        var list = this.state.list;
        list = list.map(item => {
            let speechCollections = item.speechCollections.filter((item) => item.link != link);
            return {
                ...item,
                speechCollections: speechCollections
            }
        })
        this.setState({list})
    };

    confirmDeleteData = (link) => {
        Alert.alert(
            languages['Xóa dữ liệu'][currentLanguage],
            languages['Bạn có chắc chắn muốn xóa dữ liệu này'][currentLanguage],
            [
                {
                    text: languages['Thoát'][currentLanguage],
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: languages['Đồng ý'][currentLanguage], onPress: () => this.deleteData(link)},
            ],
        );
    }

    render() {
        let data = this.convertData(this.state.list);
        return (
            <View style={{justifyContent: 'space-between', flex: 1}}>

                <View style={{flex: 1}}>
                    <Content>
                        <List style={{flex: 1}}>
                            {
                                data.map((item, index) => {
                                    return (
                                        <ListItem itemDivider={item.isHeader} key={index}
                                                  onPress={() => {
                                                      if (!item.isHeader) {
                                                          this._play(item.link);
                                                      }
                                                  }}>
                                            <Left>
                                                <Text>{item.name}</Text>
                                            </Left>
                                            {
                                                !item.isHeader &&
                                                <Right>
                                                    <Icon name="trash"
                                                          onPress={() => this.confirmDeleteData(item.link)}/>
                                                </Right>
                                            }

                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Content>

                </View>
                <View style={{padding: 20, paddingBottom: 40}}>
                    <Button block onPress={this.openModal}>
                        <Text style={{color: '#FFFFFF'}}>{languages['THÊM GIỌNG NÓI'][currentLanguage]}</Text>
                    </Button>
                    <Button block disabled={!this.isNext(data)} onPress={() => this.openScreen(data)}
                            style={{marginTop: 20}}>
                        <Text style={{color: '#FFFFFF'}}>{languages['TIẾP TỤC'][currentLanguage]}</Text>
                    </Button>
                </View>
                <Modal isVisible={this.state.isVisible}
                       style={{justifyContent: "flex-end"}}
                >
                    <View style={{
                        height: 4 * height / 5,
                        backgroundColor: '#FFF',
                        borderRadius: 10,
                        padding: 20,
                    }}>
                        <AudioRecord closeModal={this.hideModal} saveData={this.saveData}/>
                    </View>
                </Modal>
            </View>
        );
    }
}

export default (RecordScreen);