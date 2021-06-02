import {createSelector} from 'reselect'

const memoizedProducts = createSelector(
    state=>state.products,
    (products) => {
        const {allProducts} = products
        return {
            allProducts
        }
    }
)
export default memoizedProducts