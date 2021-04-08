import { Platform } from 'react-native'


let baseURL = 'https://192.168.1.83:3443/';

{Platform.OS == 'android'
? baseURL =  'https://192.168.1.83:3443/' /*' exp://192.168.1.83:19000/api/' */
: baseURL = 'https://localhost:3443/'
}

export default baseURL;
