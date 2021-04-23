import { Platform } from 'react-native'


let baseURL = /* "http://18.216.67.251:3000/" */'http://192.168.1.83:3000/' //"http://ec2-18-216-67-251.us-east-2.compute.amazonaws.com:3000"
// let baseURL = 'http://192.168.0.107:3000/';
/* 
{Platform.OS == 'android'
? baseURL =  'https://192.168.1.83:3443/' 
: baseURL = 'https://localhost:3443/'
} */

export default baseURL;
