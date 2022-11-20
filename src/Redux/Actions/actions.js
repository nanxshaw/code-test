
const UPDATE_PRODUCT = (data) => {
    return { type: 'UPDATE_PRODUCT', product:data }
}
const FILTER_PRODUCT = (data) => {
    return { type: 'FILTER_PRODUCT', filter:data }
}
export { 
    UPDATE_PRODUCT,
    FILTER_PRODUCT
}