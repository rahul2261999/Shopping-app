import { createSelector } from 'reselect';

export const toaster = createSelector(
  (state) => state.toaster,
  (toastProps) => {
    const { title, msg, mount } = toastProps;

    return { title, msg, mount };
  }
);
