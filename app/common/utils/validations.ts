import * as Yup from 'yup';

// eslint-disable-next-line max-len
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const validations = {
  phone: Yup.string().matches(phoneRegExp, 'Неверный телефон'),
};
