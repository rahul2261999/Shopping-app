import { createSelector } from 'reselect';

export const memoisedCategory = createSelector(
  (state) => state.category,
  (catergory) => {
    const { allCategories, modal, loading } = catergory;
    return {
      allCategories,
      modal,
      loading
    };
  }
);
