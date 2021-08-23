/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
export const validateEmail = (email) => {
  const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  const validEmail = regex.test(email) ? false : 'Please enter Valid email';
  return validEmail;
};

export const requireField = (name, msg = true) => {
  if (typeof name === 'number') {
    name = name.toString();
  }
  const validField = name.length > 0 ? false : msg;
  return validField;
};

export const validatePassword = (isSignup, password) => {
  if (isSignup) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    const validPass = regex.test(password) ? false : 'Password strength is weak';
    return validPass;
  }
  return password.trim().length > 0 ? false : 'Password can not be empty';
};

export const validateConfirmPassWord = (Confirmpass, password) => (Confirmpass === password && Confirmpass.length > 1 ? false : 'Invalid confirm password');

export const mobileNumberValidator = (number) => {
  if (number.length <= 0) {
    return true;
  }
  return number.length !== 10;
};

export const zipCodeValidator = (code) => {
  if (code.length <= 0) {
    return true;
  }
  return code.length !== 6;
};

export const isObjectEmpty = (object) => {
  let flag = true;
  const traverseNode = (arr, id, n, obj) => {
    if (id >= n) return;

    if (obj[arr[id]] instanceof Object) {
      traverseNode(
        Object.keys(obj[arr[id]]),
        0,
        Object.keys(obj[arr[id]]).length,
        obj[arr[id]]
      );
    } else if (obj[arr[id]] !== false) {
      flag = false;
    } else {
      traverseNode(arr, id + 1, n, obj);
    }
  };
  traverseNode(Object.keys(object), 0, Object.keys(object).length, object);

  return flag;
};

export const getUser = () => {
  if (typeof window === undefined) {
    return false;
  }
  if (localStorage.getItem('token') && localStorage.getItem('user')) {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    return { token, user };
  }

  return false;
};

export const cartHelper = (selectedProduct, productQuantity) => {
  let newCart = [];
  if (localStorage.getItem('cart')) {
    const oldCart = JSON.parse(localStorage.getItem('cart'));
    const itemExist = oldCart.some((item) => item._id === selectedProduct._id);
    if (itemExist) {
      newCart = oldCart.map((item) => {
        if (item._id === selectedProduct._id) {
          item.quantity = productQuantity;
        }
        return item;
      });
    } else {
      newCart = [...oldCart, { ...selectedProduct, quantity: productQuantity }];
    }
  } else {
    newCart.push({ ...selectedProduct, productQuantity });
  }
  return newCart;
};
