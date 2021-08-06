import { createSelector } from 'reselect'

const memoizedProducts = createSelector(
    state => state.products,
    (products) => {
        const {
            modal,
            allProducts,
            productLoader
        } = products
        return {
            modal,
            allProducts,
            productLoader
        }
    }
)
export default memoizedProducts