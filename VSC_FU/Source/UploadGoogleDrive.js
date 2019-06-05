/**
 * Google Drive
 * created by luyxtran264@gmail.com
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    PermissionsAndroid
} from 'react-native';
import {GoogleSignin} from 'react-native-google-signin';
import GDrive from "react-native-google-drive-api-wrapper";
import RNFS, {DocumentDirectoryPath} from "react-native-fs"
import {AudioUtils} from "react-native-audio";

let apiToken = null
const url = 'https://www.googleapis.com/drive/v3' // demo method to understand easier https://developers.google.com/drive/v3/reference/files/list
const uploadUrl = 'https://www.googleapis.com/upload/drive/v3'
const downloadHeaderPath = RNFS.DocumentDirectoryPath + '/data.json' // see more path directory https://github.com/itinance/react-native-fs#api
const boundaryString = 'foo_bar_baz' // can be anything unique, needed for multipart upload https://developers.google.com/drive/v3/web/multipart-upload
// import {zip as zipfile, unzip, unzipAssets, subscribe} from 'react-native-zip-archive'

/**
 * query params
 */
function queryParams() {
    return encodeURIComponent("name = 'data.json'")
}

/**
 * Set api token
 */
function setApiToken(token) {
    apiToken = token;
    GDrive.setAccessToken(token);
    GDrive.init();
}

/**
 * crete multi body
 */
function createMultipartBody(body, isUpdate = false) {
    // https://developers.google.com/drive/v3/web/multipart-upload defines the structure
    const metaData = {
        name: 'data.json',
        description: 'Backup data for my app',
        mimeType: 'application/json',
    }
    // if it already exists, specifying parents again throws an error
    if (!isUpdate) metaData.parents = ['appDataFolder']

    // request body
    const multipartBody = `\r\n--${boundaryString}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n`
        + `${JSON.stringify(metaData)}\r\n`
        + `--${boundaryString}\r\nContent-Type: application/json\r\n\r\n`
        + `${JSON.stringify(body)}\r\n`
        + `--${boundaryString}--`

    return multipartBody
}


/**
 * configure post method
 */
function configurePostOptions(bodyLength, isUpdate = false) {
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${apiToken}`)
    headers.append('Content-Type', `multipart/related; boundary=${boundaryString}`)
    headers.append('Content-Length', bodyLength)
    return {
        method: isUpdate ? 'PATCH' : 'POST',
        headers,
    }
}

/**
 * configure get method
 */
function configureGetOptions() {
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${apiToken}`)
    return {
        method: 'GET',
        headers,
    }
}

/**
 * create download url based on id
 */
function downloadFile(existingFileId) {
    const options = configureGetOptions()
    console.log(existingFileId)
    if (!existingFileId) throw new Error('Didn\'t provide a valid file id.')
    return `${url}/files/${existingFileId}?alt=media`
}

/**
 * returns the files meta data only. the id can then be used to download the file
 */
function getFile() {
    const qParams = queryParams()
    const options = configureGetOptions()
    console.log('options', apiToken)
    return fetch(`${url}/files?q=${qParams}&spaces=appDataFolder`, options)
        .then(parseAndHandleErrors)
        .then((body) => {
            console.log(body)
            if (body && body.files && body.files.length > 0) return body.files[0]
            return null
        })
}

/**
 * upload file to google drive
 */
function uploadFile(content, existingFileId) {
    const body = createMultipartBody(content, !!existingFileId)
    const options = configurePostOptions(body.length, !!existingFileId)
    return fetch(`${uploadUrl}/files${existingFileId ? `/${existingFileId}` : ''}?uploadType=multipart`, {
        ...options,
        body,
    })
        .then(parseAndHandleErrors)
}

/**
 * handle error
 */
function parseAndHandleErrors(response) {
    console.log(response)
    if (response.ok) {

        return response.json()
    }
    return response.json()
        .then((error) => {
            console.warn(JSON.stringify(error));
            throw new Error(JSON.stringify(error))
        })
}

/**
 * require write storage permission
 */
async function requestWriteStoragePermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                'title': 'Write your android storage Permission',
                'message': 'Write your android storage to save your data'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can write storage")
        } else {
            console.log("Write Storage permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
}


/**
 * * require read storage permission
 */
async function requestReadStoragePermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                'title': 'Read your android storage Permission',
                'message': 'Read your android storage to save your data'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can Read storage")
        } else {
            console.log("Read Storage permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
}

export default class UploadGoogleDrive extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: null
        }

        this.checkPermission()
    }

    // check storage permission
    checkPermission = () => {
        // PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((writeGranted) => {
        //     console.log('writeGranted', writeGranted)
        //     if (!writeGranted) {
        //         requestWriteStoragePermission()
        //     }
        //     PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((readGranted) => {
        //         console.log('readGranted', readGranted)
        //         if (!readGranted) {
        //             requestReadStoragePermission()
        //         }
        //     })
        // })
    }

    // download and read file to get data content in downloaded file
    downloadAndReadFile = (file) => {
        const fromUrl = downloadFile(file.id)
        let downloadFileOptions = {
            fromUrl: fromUrl,
            toFile: downloadHeaderPath,
        }
        downloadFileOptions.headers = Object.assign({
            "Authorization": `Bearer ${apiToken}`
        }, downloadFileOptions.headers);

        console.log('downloadFileOptions', downloadFileOptions)

        RNFS.downloadFile(downloadFileOptions).promise.then(res => {
            console.log(res)
            return RNFS.readFile(downloadHeaderPath, 'utf8');
        }).then(content => {
            console.log(content)
            this.setState({
                data: content
            })
        }).catch(err => {
            console.log('error', err)
        });
    }

    // check existed file
    checkFile = () => {
        getFile().then((file) => {
            console.log('file', file)
            if (file) {
                this.downloadAndReadFile(file)
            } else {
                console.log('file no found')
            }
        }).catch((error) => {
            console.log('error', error)
        })
    }

    upload = () => {
        var metadata = {
            name: 'test3.acc', // Filename at Google Drive
        };

        let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac'

        let source = {
            uri: audioPath,
            name: 'test.aac',
            type: 'application/octet-stream',
        }

        var form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
        form.append('file', source);
        console.log(form);

        // fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        //     method: 'POST',
        //     headers: new Headers({'Authorization': 'Bearer ' + apiToken}),
        //     body: form,
        // }).then((res) => {
        //     console.log(res);
        // })

        var xhr = new XMLHttpRequest();
        xhr.open('post', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart');
        xhr.setRequestHeader('Authorization', 'Bearer ' + apiToken);
        xhr.responseType = 'json';
        xhr.onload = () => {
            console.log(xhr.response); // Retrieve uploaded file ID.
        };
        xhr.send(form);
    }

    // crete file to upload
    createFile = () => {
        let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac'


        // const contents = "My text file contents";
        // or
        // const contents = [10, 20, 30];
        // GDrive.files.list({q: "'root' in parents"}).then(parseAndHandleErrors);
        // console.log(RNFetchBlob.wrap(audioPath));
        // GDrive.files.createFileMultipart(
        //     RNFetchBlob.wrap(audioPath),
        //     'audio/x-hx-aac-adts', {
        //         parents: ["root"],
        //         name: "test3.aac"
        //     }).then(parseAndHandleErrors);
        GDrive.files.safeCreateFolder({
            name: this.state.userInfo.user.name + '_' + this.state.userInfo.user.email,
            parents: ["1SpYD22wesQEPFRjDyYQqchWmFuN1GvmQ"]
        })
            .then(res => {
                console.log({res});
                RNFS.readFile(audioPath, "base64").then((data) => {
                    console.log(data);
                    GDrive.files.createFileMultipart(
                        data,
                        'application/octet-stream\ncontent-transfer-encoding: base64', {
                            parents: [res],
                            name: "test4.aac",
                            mimeType: "audio/aac",
                        }).then(parseAndHandleErrors);
                })
            });

        // this.upload();
        // const targetPath = `${AudioUtils.DocumentDirectoryPath}/myFile.zip`;
        // const sourcePath = AudioUtils.DocumentDirectoryPath;
        zip(sourcePath, targetPath)
            .then((path) => {
                console.log(path);
                RNFS.readFile(path, "base64").then((data) => {
                    console.log(data);
                    GDrive.files.createFileMultipart(
                        'data:audio/aac;base64,' + data,
                        'audio/aac', {
                            parents: ["root"],
                            name: "test2.acc"
                        }).then(parseAndHandleErrors);
                });
            })
            .catch((error) => {
                console.log(error)
            })

        // console.log(RNFS.readFile(audioPath));

        // uploadFile(JSON.stringify(content), file.id)
        // getFile().then((file) => {
        //     console.log('file', file)
        //     if (file) {
        //         uploadFile(JSON.stringify(content), file.id)
        //     } else {
        //         uploadFile(JSON.stringify(content))
        //     }
        // }).catch((error) => {
        //     console.log('error', error)
        // })

    }

    getDataFromGoogleDrive = async () => {
        await this.initialGoogle()

        if (apiToken) {
            this.checkFile()
        }
    }

    setDataFromGoogleDrive = async () => {
        await this.initialGoogle()

        if (apiToken) {
            this.createFile()
        }
    }

    initialGoogle = async () => {
        await GoogleSignin.configure({
            scopes: ['https://www.googleapis.com/auth/drive'],
            offlineAccess: false
        });

        // const user = await GoogleSignin.signInPromise();
        // set api token
        // setApiToken(user.accessToken)
        this.signIn();
    }

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({userInfo});
            setApiToken(userInfo.accessToken);
            console.log({userInfo});
            console.log(userInfo.accessToken);
        } catch (error) {
            console.warn(error)
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.buttonGetData} onPress={this.getDataFromGoogleDrive}>
                    <Text style={styles.text}>
                        Get data from Google Drive
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.buttonGetData} onPress={this.setDataFromGoogleDrive}>
                    <Text style={styles.text}>
                        Create data or Update data
                    </Text>
                </TouchableHighlight>
                <Text style={styles.textData}>
                    {JSON.parse(this.state.data)}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        textAlign: 'center',
        color: '#FFFFFF',
        margin: 10,
    },
    textData: {
        textAlign: 'center',
        color: '#333333',
        margin: 10,
    },
    buttonGetData: {
        backgroundColor: '#333',
        padding: 10,
        margin: 10,
    }
});