import Config from 'react-native-config'
import axios from 'axios';
import NotifyService from '../Services/notify.service';
import Loader from '../Services/loader.service';
import AsyncStorage from '@react-native-community/async-storage';

export const defautlHeaders = {
    'Content-Type': 'application/json;charset=UTF-8',
};

export async function Get(obj) {
    if (!(obj && obj.url)) {
        return false;
    }

    const params = await getNecessaryParams(obj);
    return ApiCall(params);
}

export async function Post(obj) {
    obj.method = 'POST';
    const params = await getNecessaryParams(obj);
    return ApiCall(params);
}

export async function Put(obj) {
    obj.method = 'PUT';
    const params = await getNecessaryParams(obj);
    return ApiCall(params);
}

export async function Delete(obj) {
    const params = await getNecessaryParams(obj);
    return ApiCall(params);
}

async function getToken() {
    try {
        const value = await AsyncStorage.getItem('@token')
        return value;
    } catch (e) {
        return;
    }
}

function ApiCall({ url, method, headers, body, resolve = defaultResolve, reject = defaultReject, params, hideMessage, hideLoader, persist, callback, extraParams, imageUploadId }) {
    const postDict = {
        headers, method
    };

    if (body) { // if body is attached
        postDict.body = body;
    }

    if (!hideLoader) {
        Loader.start();
    }

    console.log('url', url);
    return axios({
        url,
        headers,
        data: body,
        method,
        params
    })
        .then((response) => {
            Loader.stop();
            console.log('response', response);
            return resolve(response.data, { callback });
        })
        .catch((error) => {
            Loader.stop();
            return reject(error);
        });
}

async function getNecessaryParams(obj) {
    const url = createFinalUrl(obj);
    const method = obj.method || 'GET';
    const headers = await createHeader(obj);

    const resolve = obj.hasOwnProperty('resolve') ? obj.resolve : resolve;
    const reject = obj.hasOwnProperty('reject') ? obj.reject : reject;

    const responseObj = {
        url, method, headers, resolve, reject, hideMessage: obj.hideMessage || false, hideLoader: obj.hideLoader
    };

    if (obj.body) {
        responseObj.body = obj.body;
        console.log('obj.body', obj.body)
    }

    return responseObj;
}

function createFinalUrl(obj) {
    if (__DEV__) {
        return `http://192.168.1.9:3000/${obj.url}`;
    }

    return `${Config.getConstants().API_URL}/${obj.url}`;
}

async function createHeader(obj) {
    const headers = defautlHeaders;
    const token = await getToken();
    headers['Authorization'] = `Bearer ${token}`;

    // if headers are not passed
    if (!obj.headers) {
        return headers;
    }

    // extend default header options with one, passed with obj
    return { ...headers, ...obj.headers };
}

function defaultResolve(result, { callback }) {
    if (typeof callback == 'function') {
        callback(result);
    }

    if (result && result.response && typeof result.response == 'string') {
        NotifyService.notify({
            title: '',
            message: result.response,
            type: result.success ? 'success' : 'error',
            duration: 1200
        })
    }

    return result;
}

function defaultReject(response) {
    console.log('response', response);
    NotifyService.notify({
        title: 'Server issue',
        message: '',
        type: 'error',
        duration: 1200
    })
    return response;
}