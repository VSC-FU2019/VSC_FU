/**
 * Created by phanmduong on 9/29/18.
 */
import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {AGES, currentLanguage, GENDER, languages, PROVINCE} from "./constants";
import {Form, Picker, Icon, Button} from 'native-base';

var {height, width} = Dimensions.get('window');

class UserInfoScreen extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            gender: undefined,
            province: undefined,
            age: undefined
        }

    }

    static navigationOptions = () => ({
        title: languages["Thông tin người cung cấp"][currentLanguage],
    })

    onValueChangeAge = (value) => {
        this.setState({
            age: value
        })
    }

    onValueChangeGender = (value) => {
        this.setState({
            gender: value
        })
    }

    onValueChangeProvince = (value) => {
        this.setState({
            province: value
        })
    }

    isNext = () => {
        return (this.state.province && this.state.age && this.state.gender && this.state.age != languages["Chọn tuổi"][currentLanguage])
    }

    openScreen = () => {
        this.props.navigation.navigate('Record', {
            age: this.state.age,
            gender: this.state.gender,
            province: this.state.province
        })
    }

    render() {
        return (
            <View style={{justifyContent: 'space-between', flex: 1}}>

                <View>
                    <Form>
                        <Text style={{
                            paddingTop: 20,
                            paddingLeft: 10,
                            fontSize: 20
                        }}>{languages["Tuổi của bạn"][currentLanguage]}</Text>
                        <Picker
                            iosHeader={languages["Chọn tuổi"][currentLanguage]}
                            note
                            iosIcon={<Icon name="arrow-down"/>}
                            mode="dropdown"
                            placeholder={languages["Chọn tuổi"][currentLanguage]}
                            headerBackButtonText={languages["Quay lại"][currentLanguage]}
                            textStyle={{color: "#252525"}}
                            selectedValue={this.state.age}
                            onValueChange={this.onValueChangeAge}
                        >
                            {AGES.map((age, index) => {
                                return (
                                    <Picker.Item label={age} value={age} key={index}/>
                                )
                            })}
                        </Picker>
                        <Text style={{
                            paddingTop: 20,
                            paddingLeft: 10,
                            fontSize: 20
                        }}>{languages["Giới tính của bạn"][currentLanguage]}</Text>
                        <Picker
                            iosHeader={languages['Chọn giới tính'][currentLanguage]}
                            note
                            iosIcon={<Icon name="arrow-down"/>}
                            mode="dropdown"
                            placeholder={languages['Chọn giới tính'][currentLanguage]}
                            headerBackButtonText={languages["Quay lại"][currentLanguage]}
                            textStyle={{color: "#252525"}}
                            selectedValue={this.state.gender}
                            onValueChange={this.onValueChangeGender}
                        >
                            {GENDER.map((gender, index) => {
                                return (
                                    <Picker.Item label={gender.label} value={gender.value} key={index}/>
                                )
                            })}
                        </Picker>
                        <Text style={{
                            paddingTop: 20,
                            paddingLeft: 10,
                            fontSize: 20
                        }}>{languages["Nơi quê quán của bạn"][currentLanguage]}</Text>
                        <Picker
                            iosHeader={languages["Chọn quê quán"][currentLanguage]}
                            note
                            iosIcon={<Icon name="arrow-down"/>}
                            mode="dropdown"
                            placeholder={languages["Chọn quê quán"][currentLanguage]}
                            headerBackButtonText={languages["Quay lại"][currentLanguage]}
                            textStyle={{color: "#252525"}}
                            selectedValue={this.state.province}
                            onValueChange={this.onValueChangeProvince}
                        >
                            {PROVINCE.map((province, index) => {
                                return (
                                    <Picker.Item label={province.name} value={province.provinceid} key={index}/>
                                )
                            })}
                        </Picker>
                    </Form>
                </View>

                <View style={{padding: 20, paddingBottom: 40}}>
                    <Button block disabled={!this.isNext()} onPress={this.openScreen}>
                        <Text style={{color: '#FFFFFF'}}>{languages["TIẾP TỤC"][currentLanguage]}</Text>
                    </Button>
                </View>

            </View>
        );
    }
}

export default (UserInfoScreen);