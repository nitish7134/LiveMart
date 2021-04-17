import {
    UPDATE_CART,
} from '../constants';

const cartItems = (state = [], action) => {
    switch (action.type) {
        case UPDATE_CART:
            return  action.payload
    }
    return state;
}

export default cartItems;