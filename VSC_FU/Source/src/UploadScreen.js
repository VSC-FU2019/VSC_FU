/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {Text, Dimensions, View, Image, Alert} from 'react-native';
import {Button, Spinner} from 'native-base'
import {GoogleSignin} from 'react-native-google-signin';
import RNFS, {DocumentDirectoryPath} from "react-native-fs"
import {zip} from 'react-native-zip-archive'
import GDrive from "react-native-google-drive-api-wrapper";
import {currentLanguage, languages, PROVINCE} from "./constants";

var {height, width} = Dimensions.get('window');
import {StackActions, NavigationActions} from 'react-navigation';

class LoginScreen extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            typeProgress: 'moving',
            finished: false,
            folderData: Date.now(),
            error: false
        }
    }

    componentDidMount() {
        this.uploadData();
    };

    xoa_dau(str = '') {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    }

    uploadDrive = (filePath, fileName) => {
        GDrive.files.safeCreateFolder({
            name: this.state.userInfo.user.name + '_' + this.state.userInfo.user.email,
            parents: ["1rYmeql87Aye8FdJL9Dat5_EqIfKMak2w"]
        })
            .then(res => {
                RNFS.readFile(filePath, "base64").then((data) => {
                    console.log(data);
                    GDrive.files.createFileMultipart(
                        data,
                        'application/octet-stream\ncontent-transfer-encoding: base64', {
                            parents: [res],
                            name: fileName,
                        }).then(() => {
                        this.setState({finished: true})
                    }).catch((error) => {
                        this.setState({error: true});
                        console.log(error);
                        Alert.alert(
                            languages['Thông báo'][currentLanguage],
                            'Lỗi upload',
                        );
                    });
                })
            }).catch((error) => {
            this.setState({error: true});
            console.log(error);
            Alert.alert(
                languages['Thông báo'][currentLanguage],
                'Lỗi tạo thư mục',
            );
        });
    }

    uploadData = async () => {
        this.setState({typeProgress: 'moving', error: false});
        let folderPath = DocumentDirectoryPath + '/' + this.state.folderData;
        try {
            await RNFS.unlink(folderPath);
        } catch (e) {

        }

        let token = await GoogleSignin.getTokens();
        GDrive.setAccessToken(token.accessToken);
        GDrive.init();


        let currentUser = await GoogleSignin.getCurrentUser();
        this.setState({userInfo: currentUser});

        await RNFS.mkdir(folderPath);
        let listRecord = this.props.navigation.getParam('listRecord');
        let currentPath;

        listRecord.forEach((item) => {
            if (item.isHeader) {
                currentPath = folderPath + '/' + item.value;
                console.log(currentPath);
            } else {
                RNFS.mkdir(currentPath).then(
                    RNFS.copyFile(item.link, currentPath + "/" + item.nameFile).then((res) => {
                        console.log("move_ok")
                    }).catch((error) => {
                        this.setState({error: true});
                        Alert.alert(
                            'Thông báo',
                            'Lỗi khi dịch chuyển dữ liệu',
                        );
                    })
                );

            }
        });

        let age = this.props.navigation.getParam('age');
        let gender = this.props.navigation.getParam('gender');
        let province = this.props.navigation.getParam('province');

        let provinceData = PROVINCE.filter((item) => item.provinceid == province)[0].name;
        console.log(provinceData);

        let nameFileZip = `${age}_${gender}_${this.xoa_dau(provinceData)}_${this.state.folderData}.zip`;
        // let nameFileZip = `bot-vbee_vn.zip`;

        setTimeout(() => {
            this.setState({typeProgress: 'zipping'});
            zip(folderPath, DocumentDirectoryPath + '/' + nameFileZip)
                .then((path) => {
                    this.setState({typeProgress: 'uploading'});
                    this.uploadDrive(DocumentDirectoryPath + '/' + nameFileZip, nameFileZip)
                })
                .catch((error) => {
                    this.setState({error: true});
                    Alert.alert(
                        'Thông báo',
                        'Lỗi khi nén dữ liệu',
                    );
                })
        }, 1000)


    }

    static navigationOptions = () => ({
        title: languages['Lưu trữ dữ liệu'][currentLanguage],
        headerLeft: null
    })

    resetStack = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'AuthenticationScreen'})],
        });
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {!this.state.finished ?
                    <View style={styles.containerLogo}>
                        <Image
                            resizeMode={'contain'}
                            source={require('../assets/image/upload.png')}
                            style={{width: width / 2, height: width / 2}}
                        />
                        <Text style={{
                            marginTop: 30,
                            fontSize: 20
                        }}>{languages['Vui lòng chờ trong giây lát'][currentLanguage]}</Text>
                        <Spinner color='#1565C0'/>
                        <Text style={{marginTop: 10, fontSize: 18, color: '#1565C0'}}>
                            {
                                this.state.typeProgress == 'moving' ? languages['Đang dịch chuyển dữ liệu...'][currentLanguage] :
                                    this.state.typeProgress == 'zipping' ? languages['Đang nén dữ liệu...'][currentLanguage] :
                                        languages['Đang lưu trữ dữ liệu...'][currentLanguage]
                            }
                        </Text>
                        {
                            this.state.error &&
                            <Button block onPress={this.uploadData} style={{marginHorizontal: 50, marginTop: 30}}>
                                < Text style={{color: '#FFFFFF'}}>{languages['THỬ LẠI'][currentLanguage]}</Text>
                            </Button>
                        }
                    </View>
                    :
                    <View style={styles.containerLogo}>
                        <Image
                            resizeMode={'contain'}
                            source={require('../assets/image/success.png')}
                            style={{width: width / 2, height: width / 2}}
                        />
                        <Text style={{
                            marginTop: 30,
                            fontSize: 20
                        }}>{languages['Lưu trữ hoàn thành'][currentLanguage]}</Text>
                        <Button block onPress={this.resetStack} style={{marginHorizontal: 50, marginTop: 30}}>
                            < Text style={{color: '#FFFFFF'}}>{languages['TRỞ LẠI'][currentLanguage]}</Text>
                        </Button>
                    </View>
                }

                <View style={styles.containerBottom}>
                    <Text
                        style={{marginBottom: 20}}>{languages['Cảm ơn bạn đã cung cấp dữ liệu cho chúng tôi'][currentLanguage]}</Text>
                </View>
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
    containerBottom: {
        alignItems: 'center',
        justifyContent: 'space-between'
        // justifyContent: 'center'
    }
}

export default (LoginScreen);