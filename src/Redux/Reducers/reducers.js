
import product from '../../Json/product.json';

const INITIAL_STATE = {
    data_product: product,
    product: product,
};

function rootReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'UPDATE_PRODUCT': 
            return {
                ...state,
                product: action.product 
            }
        
        case 'FILTER_PRODUCT': 
            console.log(action)
            if(action.filter === 'desc'){
                state.product.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            }else{
                state.product.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            }

            return {
                ...state,
                product: state.product,
            }
        
        default:
            return state;
    }
}
export default rootReducer;