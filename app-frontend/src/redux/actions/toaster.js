import { MOUNT_TOASTER, UNMOUNT_TOASTER } from '../actionTypes';

export const successToaster = (message) => ({
  type: MOUNT_TOASTER,
  payload: {
    title: 'SUCCESS',
    msg: message,
    mount: true
  }
});

export const errorToaster = (message) => ({
  type: MOUNT_TOASTER,
  payload: {
    title: 'ERROR',
    msg: message,
    mount: true
  }
});

export const hideToaster = () => ({
  type: UNMOUNT_TOASTER
});
