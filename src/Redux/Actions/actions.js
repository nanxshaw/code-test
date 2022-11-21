
const UPDATE_USER = (data) => {
    return { type: 'UPDATE_USER', user:data }
}
const UPDATE_PRODUCT = (data) => {
    return { type: 'UPDATE_PRODUCT', product:data }
}
const FILTER_PRODUCT = (data) => {
    return { type: 'FILTER_PRODUCT', filter:data }
}
const UPDATE_WISHLIST = (bool, item) => {
    return { type: 'UPDATE_WISHLIST', bool:bool, item:item }
}
export { 
    UPDATE_USER,
    UPDATE_PRODUCT,
    FILTER_PRODUCT,
    UPDATE_WISHLIST
}