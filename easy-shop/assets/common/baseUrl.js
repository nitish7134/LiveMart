import { Platform } from 'react-native'


let baseURL = 'exp://192.168.0.107:19000';

{Platform.OS == 'android'
? baseURL = 'exp://192.168.0.107:19000/api/v1/'
: baseURL = 'http://localhost:3000/api/v1/'
}

export default baseURL;
