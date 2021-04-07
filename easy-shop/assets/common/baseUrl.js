import { Platform } from 'react-native'


let baseURL = 'exp://192.168.0.107:19000';

{Platform.OS == 'android'
? baseURL = 'https://192.168.1.83:3443/'
: baseURL = 'https://localhost:3443/'
}

export default baseURL;
