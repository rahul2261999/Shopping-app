import {createSelector} from 'reselect'

const memoizedProducts = createSelector(
    state=>state.products,
    (products) => {
        const {modal,allProducts} = products
        return {
            modal,
            allProducts
        }
    }
)
export default memoizedProducts