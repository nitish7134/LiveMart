import {
    UPDATE_CART} from '../constants';

export const updateCart = (payload) => {

    return {
        type: UPDATE_CART,
        payload
    }
}