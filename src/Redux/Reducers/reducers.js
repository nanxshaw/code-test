
import product from '../../Json/product.json';

const INITIAL_STATE = {
    data_product: product,
    product: product,
    user:null
};

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                user: action.user
            }

        case 'UPDATE_PRODUCT':
            return {
                ...state,
                product: action.product,
            }

        case 'FILTER_PRODUCT':
            let prod = [...state.product];
            if (action.filter === 'desc') {
                prod.sort((a, b) => parseFloat(b.priceDiscount) - parseFloat(a.priceDiscount));
            } else {
                prod.sort((a, b) => parseFloat(a.priceDiscount) - parseFloat(b.priceDiscount));
            }

            return {
                ...state,
                product: prod,
            }

        case 'UPDATE_WISHLIST':
            let prod2 = [...state.product];

            return {
                ...state,
                product: prod2.map(obj =>
                    obj.id === action.item.id ?
                        {
                            ...obj,
                            wishlist:action.bool,
                        }
                        : obj)
            }

        default:
            return state;
    }
}
export default rootReducer;