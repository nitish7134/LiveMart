import { Platform } from 'react-native'


let baseURL = "http://ec2-18-216-67-251.us-east-2.compute.amazonaws.com:3000/"//'https://192.168.1.83:3443/';
/* 
{Platform.OS == 'android'
? baseURL =  'https://192.168.1.83:3443/' 
: baseURL = 'https://localhost:3443/'
} */

export default baseURL;
