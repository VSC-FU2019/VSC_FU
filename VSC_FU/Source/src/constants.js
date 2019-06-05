import React from "react";
import {Text} from "react-native";
import {Picker} from "native-base";

export const languages = {
    "Ứng dụng thu thập": {
        vi: 'Ứng dụng thu thập',
        en: "Application collect"
    },
    "dữ liệu giọng nói": {
        vi: 'dữ liệu giọng nói',
        en: "data speech"
    },
    "HƯỚNG DẪN SỬ DỤNG": {
        vi: "HƯỚNG DẪN SỬ DỤNG",
        en: "USER MANUAL"
    },
    "Dữ liệu của bạn sẽ không công khai": {
        vi: "Dữ liệu của bạn sẽ không công khai",
        en: "Your data will be private"
    },
    "THOÁT": {
        vi: "THOÁT",
        en: "EXIT"
    },
    "Thông tin người cung cấp": {
        vi: "Thông tin người cung cấp",
        en: "User information"
    },
    "Chọn tuổi": {
        vi: "Chọn tuổi",
        en: "Choose age"
    },
    "Chọn giới tính": {
        vi: "Chọn giới tính",
        en: "Choose gender",
    },
    "Nam": {
        vi: "Nam",
        en: "Male",
    },
    "Nữ": {
        vi: "Nữ",
        en: "Female",
    },
    "Khác": {
        vi: "Khác",
        en: "Other",
    },
    "Chọn quê quán": {
        vi: "Chọn quê quán",
        en: "Choose province"
    },
    "Quay lại": {
        vi: "Quay lại",
        en: "Back"
    },
    "TIẾP TỤC": {
        vi: "TIẾP TỤC",
        en: "NEXT"
    },
    "Nơi quê quán của bạn": {
        vi: "Nơi quê quán của bạn",
        en: "Your province"
    },
    "Tuổi của bạn": {
        vi: "Tuổi của bạn",
        en: "Your age"
    },
    "Giới tính của bạn": {
        vi: "Giới tính của bạn",
        en: "Your gender"
    },
    "Thu giọng nói": {
        vi: "Thu giọng nói",
        en: "Record voice"
    },
    "Xóa dữ liệu": {
        vi: "Xóa dữ liệu",
        en: "Delete data"
    },
    "Bạn có chắc chắn muốn xóa dữ liệu này": {
        vi: "Bạn có chắc chắn muốn xóa dữ liệu này?",
        en: "Are you really want to delete data?"
    },
    "Đồng ý": {
        vi: "Đồng ý",
        en: "Yes"
    },
    "Thoát": {
        vi: "Thoát",
        en: "Exit"
    },
    "THÊM GIỌNG NÓI": {
        vi: "THÊM GIỌNG NÓI",
        en: "ADD VOICE"
    },
    "Bật đèn": {
        vi: "Bật đèn",
        en: "Turn on led"
    },
    "Tắt đèn": {
        vi: "Tắt đèn",
        en: "Turn off led"
    },
    "Bật điều hòa": {
        vi: "Bật điều hòa",
        en: "Turn on air conditioner"
    },
    "Tắt điều hòa": {
        vi: "Tắt điều hòa",
        en: "Turn off air conditioner"
    },
    "Bật quạt": {
        vi: "Bật quạt",
        en: "Turn on fan"
    },
    "Tắt quạt": {
        vi: "Tắt quạt",
        en: "Turn off fan"
    },
    "Bật tivi": {
        vi: "Bật tivi",
        en: "Turn on tivi"
    },
    "Tắt tivi": {
        vi: "Tắt tivi",
        en: "Turn off tivi"
    },
    "Mở cửa": {
        vi: "Mở cửa",
        en: "Open door"
    },
    "Đóng cửa": {
        vi: "Đóng cửa",
        en: "Close door"
    },
    "Khóa cửa": {
        vi: "Khóa cửa",
        en: "Lock door"
    },
    "Mở cổng": {
        vi: "Mở cổng",
        en: "Open gate"
    },
    "Đóng cổng": {
        vi: "Đóng cổng",
        en: "Close gate"
    },
    "Khóa cổng": {
        vi: "Khóa cổng",
        en: "Lock gate"
    },
    "Đô rê mon": {
        vi: "Đô rê mon",
        en: "Doremon"
    },
    "Thông báo": {
        vi: "Thông báo",
        en: "Notification"
    },
    "Vui lòng chọn từ cần thu": {
        vi: "Vui lòng chọn từ cần thu",
        en: "Please choose word"
    },
    "Vui lòng cấp quyền sử dụng micro": {
        vi: "Vui lòng cấp quyền sử dụng micro",
        en: "Please grant permission to use the microphone"
    },
    "Bản ghi ": {
        vi: "Bản ghi ",
        en: "Record "
    },
    "Chọn từ": {
        vi: "Chọn từ",
        en: "Choose word"
    },
    "LƯU VÀ THOÁT": {
        vi: "LƯU VÀ THOÁT",
        en: "SAVE AND EXIT"
    },
    "LƯU VÀ THU TỪ TIẾP THEO": {
        vi: "LƯU VÀ THU TỪ TIẾP THEO",
        en: "SAVE AND NEXT WORD"
    },
    "LƯU VÀ THU LẠI TỪ NÀY": {
        vi: "LƯU VÀ THU LẠI TỪ NÀY",
        en: "SAVE AND AGAIN RECORD WORD"
    },
    "PHÁT LẠI": {
        vi: "PHÁT LẠI",
        en: "PLAY"
    },
    "Lưu trữ dữ liệu": {
        vi: "Lưu trữ dữ liệu",
        en: "Store data"
    },
    "Đang dịch chuyển dữ liệu...": {
        vi: "Đang dịch chuyển dữ liệu...",
        en: "Moving data ..."
    },
    "Đang nén dữ liệu...": {
        vi: "Đang nén dữ liệu...",
        en: "Compressing data ..."
    },
    "Đang lưu trữ dữ liệu...": {
        vi: "Đang lưu trữ dữ liệu...",
        en: "Storing data ..."
    },
    "Vui lòng chờ trong giây lát": {
        vi: "Vui lòng chờ trong giây lát",
        en: "Please wait a second"
    },
    "THỬ LẠI": {
        vi: "THỬ LẠI",
        en: "AGAIN"
    },
    "Lưu trữ hoàn thành": {
        vi: "Lưu trữ hoàn thành",
        en: "Archive completed"
    },
    "TRỞ LẠI": {
        vi: "TRỞ LẠI",
        en: "BACK"
    },
    "Cảm ơn bạn đã cung cấp dữ liệu cho chúng tôi": {
        vi: "Cảm ơn bạn đã cung cấp dữ liệu cho chúng tôi",
        en: "Thank you for providing data to us"
    }
};
export const currentLanguage = "vi";

export let SPEECH_TYPES =
    [{
        value: 'turn_on_led',
        label: languages['Bật đèn'][currentLanguage]
    }, {
        value: 'turn_off_led',
        label: languages['Tắt đèn'][currentLanguage]
    }, {
        value: 'turn_on_air_conditioner',
        label: languages['Bật điều hòa'][currentLanguage]
    }, {
        value: 'turn_off_air_conditioner',
        label: languages['Tắt điều hòa'][currentLanguage]
    }, {
        value: 'turn_on_fan',
        label: languages['Bật quạt'][currentLanguage]
    }, {
        value: 'turn_off_fan',
        label: languages['Tắt quạt'][currentLanguage]
    }, {
        value: 'turn_on_tivi',
        label: languages['Bật tivi'][currentLanguage]
    }, {
        value: 'turn_off_tivi',
        label: languages['Tắt tivi'][currentLanguage]
    }, {
        value: 'open_door',
        label: languages['Mở cửa'][currentLanguage]
    }, {
        value: 'close_door',
        label: languages['Đóng cửa'][currentLanguage]
    }, {
        value: 'lock_door',
        label: languages['Khóa cửa'][currentLanguage]
    }, {
        value: 'open_gate',
        label: languages['Mở cổng'][currentLanguage]
    }, {
        value: 'close_gate',
        label: languages['Đóng cổng'][currentLanguage]
    }, {
        value: 'lock_gate',
        label: languages['Khóa cổng'][currentLanguage]
    }, {
        value: 'wake_word',
        label: languages['Đô rê mon'][currentLanguage]
    },

    ];

export let AGES = [languages["Chọn tuổi"][currentLanguage], ...Array.from({length: 80}, (v, k) => k + 7 + '')];

export let GENDER = [{
    value: null,
    label: languages['Chọn giới tính'][currentLanguage]
}, {
    value: 'Male',
    label: languages['Nam'][currentLanguage]
}, {
    value: 'female',
    label: languages['Nữ'][currentLanguage]
}, {
    value: 'no_gender',
    label: languages['Khác'][currentLanguage]
}];

export let PROVINCE =
    [
        {
            "provinceid": null,
            "name": languages["Chọn quê quán"][currentLanguage]
        },
        {
            "provinceid": "89",
            "name": "An Giang"
        },
        {
            "provinceid": "77",
            "name": "Bà Rịa - Vũng Tàu"
        },
        {
            "provinceid": "24",
            "name": "Bắc Giang"
        },
        {
            "provinceid": "06",
            "name": "Bắc Kạn"
        },
        {
            "provinceid": "95",
            "name": "Bạc Liêu"
        },
        {
            "provinceid": "27",
            "name": "Bắc Ninh"
        },
        {
            "provinceid": "83",
            "name": "Bến Tre"
        },
        {
            "provinceid": "74",
            "name": "Bình Dương"
        },
        {
            "provinceid": "70",
            "name": "Bình Phước"
        },
        {
            "provinceid": "60",
            "name": "Bình Thuận"
        },
        {
            "provinceid": "52",
            "name": "Bình Định"
        },
        {
            "provinceid": "96",
            "name": "Cà Mau"
        },
        {
            "provinceid": "92",
            "name": "Cần Thơ"
        },
        {
            "provinceid": "04",
            "name": "Cao Bằng"
        },
        {
            "provinceid": "64",
            "name": "Gia Lai"
        },
        {
            "provinceid": "02",
            "name": "Hà Giang"
        },
        {
            "provinceid": "35",
            "name": "Hà Nam"
        },
        {
            "provinceid": "01",
            "name": "Hà Nội"
        },
        {
            "provinceid": "42",
            "name": "Hà Tĩnh"
        },
        {
            "provinceid": "30",
            "name": "Hải Dương"
        },
        {
            "provinceid": "31",
            "name": "Hải Phòng"
        },
        {
            "provinceid": "93",
            "name": "Hậu Giang"
        },
        {
            "provinceid": "79",
            "name": "Hồ Chí Minh"
        },
        {
            "provinceid": "17",
            "name": "Hòa Bình"
        },
        {
            "provinceid": "33",
            "name": "Hưng Yên"
        },
        {
            "provinceid": "56",
            "name": "Khánh Hòa"
        },
        {
            "provinceid": "91",
            "name": "Kiên Giang"
        },
        {
            "provinceid": "62",
            "name": "Kon Tum"
        },
        {
            "provinceid": "12",
            "name": "Lai Châu"
        },
        {
            "provinceid": "68",
            "name": "Lâm Đồng"
        },
        {
            "provinceid": "20",
            "name": "Lạng Sơn"
        },
        {
            "provinceid": "10",
            "name": "Lào Cai"
        },
        {
            "provinceid": "80",
            "name": "Long An"
        },
        {
            "provinceid": "36",
            "name": "Nam Định"
        },
        {
            "provinceid": "40",
            "name": "Nghệ An"
        },
        {
            "provinceid": "37",
            "name": "Ninh Bình"
        },
        {
            "provinceid": "58",
            "name": "Ninh Thuận"
        },
        {
            "provinceid": "25",
            "name": "Phú Thọ"
        },
        {
            "provinceid": "54",
            "name": "Phú Yên"
        },
        {
            "provinceid": "44",
            "name": "Quảng Bình"
        },
        {
            "provinceid": "49",
            "name": "Quảng Nam"
        },
        {
            "provinceid": "51",
            "name": "Quảng Ngãi"
        },
        {
            "provinceid": "22",
            "name": "Quảng Ninh"
        },
        {
            "provinceid": "45",
            "name": "Quảng Trị"
        },
        {
            "provinceid": "94",
            "name": "Sóc Trăng"
        },
        {
            "provinceid": "14",
            "name": "Sơn La"
        },
        {
            "provinceid": "72",
            "name": "Tây Ninh"
        },
        {
            "provinceid": "34",
            "name": "Thái Bình"
        },
        {
            "provinceid": "19",
            "name": "Thái Nguyên"
        },
        {
            "provinceid": "38",
            "name": "Thanh Hóa"
        },
        {
            "provinceid": "46",
            "name": "Thừa Thiên Huế"
        },
        {
            "provinceid": "82",
            "name": "Tiền Giang"
        },
        {
            "provinceid": "84",
            "name": "Trà Vinh"
        },
        {
            "provinceid": "08",
            "name": "Tuyên Quang"
        },
        {
            "provinceid": "86",
            "name": "Vĩnh Long"
        },
        {
            "provinceid": "26",
            "name": "Vĩnh Phúc"
        },
        {
            "provinceid": "15",
            "name": "Yên Bái"
        },
        {
            "provinceid": "48",
            "name": "Đà Nẵng"
        },
        {
            "provinceid": "66",
            "name": "Đắk Lắk"
        },
        {
            "provinceid": "67",
            "name": "Đắk Nông"
        },
        {
            "provinceid": "11",
            "name": "Điện Biên"
        },
        {
            "provinceid": "75",
            "name": "Đồng Nai"
        },
        {
            "provinceid": "87",
            "name": "Đồng Tháp"
        }
    ];

