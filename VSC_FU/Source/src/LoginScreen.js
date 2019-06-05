/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {Text, Dimensions, View, Image} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {Button} from 'native-base';
import Modal from "react-native-modal";
import {currentLanguage, languages} from "./constants";


var {height, width} = Dimensions.get('window');

class LoginScreen extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isSigninInProgress: false,
            isVisible: false
        }
    }

    signIn = async () => {
        this.setState({isSigninInProgress: true});

        try {
            await GoogleSignin.configure({
                scopes: ['https://www.googleapis.com/auth/drive'],
                offlineAccess: false
            });
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signIn();
            this.props.navigation.navigate('UserInfo');
        } catch (error) {
            console.warn(error)
        }
        this.setState({isSigninInProgress: false});
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.containerLogo}>
                    <Image
                        source={require('../assets/image/voice.png')}
                        style={{width: width / 3, height: width / 3}}
                    />
                    <Text style={{marginTop: 30, fontSize: 20}}>{languages['Ứng dụng thu thập'][currentLanguage]}</Text>
                    <Text style={{fontSize: 20}}>{languages['dữ liệu giọng nói'][currentLanguage]}</Text>
                </View>
                <View style={styles.containerButtonSignIn}>
                    <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
                        <GoogleSigninButton
                            style={{width: 2 * width / 3, height: 48}}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this.signIn}
                            disabled={this.state.isSigninInProgress}
                        />
                        <Button block
                                onPress={() => {
                                    this.setState({isVisible: true})
                                }}
                                style={{marginTop: 20}}>
                            <Text style={{color: '#FFFFFF'}}>{languages['HƯỚNG DẪN SỬ DỤNG'][currentLanguage]}</Text>
                        </Button>
                    </View>


                    <Text style={{marginBottom: 20}}>{languages['Dữ liệu của bạn sẽ không công khai'][currentLanguage]}</Text>
                </View>
                <Modal isVisible={this.state.isVisible}
                >
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                            style={{flex: 1, width: 4 * width / 5}}
                            resizeMode="contain"
                            source={require('../assets/image/user_manual.gif')}
                        />
                        <Button block
                                onPress={() => {
                                    this.setState({isVisible: false})
                                }}
                                style={{marginTop: 20}}>
                            <Text style={{color: '#FFFFFF'}}>{languages['THOÁT'][currentLanguage]}</Text>
                        </Button>
                    </View>

                </Modal>
            </View>

        );
    }
}

const styles = {
    containerLogo: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerButtonSignIn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
        // justifyContent: 'center'
    }
}

export default (LoginScreen);