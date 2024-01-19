import * as yup from 'yup';

const validationMessages = {
  emailRequired: {
    en: 'Email is required',
    ru: 'Введите электронную почту',
  },
  emailSimbol: {
    en: "Email address must contain an '@' symbol",
    ru: 'Электронная почта должна содержать @',
  },
  emailDomain: {
    en: 'Email address must contain a domain name (e.g., example.com)',
    ru: 'Электронная почта должна доменное имя (напр., example.com)',
  },
  emailInvalid: {
    en: 'Invalid email address',
    ru: 'Невалидный адрес электронной почты',
  },
  passwordRequired: {
    en: 'Password is required',
    ru: 'Введите пароль',
  },
  passwordDigit: {
    en: 'Password must contain at least one digit',
    ru: 'Пароль должен содержать хотя бы одну цифру',
  },
  passwordCharacter: {
    en: 'Password must contain at least one special character !@#$%^&*',
    ru: 'Пароль должен содержать хотя бы один спецсимвол !@#$%^&*',
  },
  passwordLetter: {
    en: 'Password must contain at least one letter',
    ru: 'Пароль должен содержать хотя бы одну букву',
  },
  passwordLength: {
    en: 'Password must contain minimum 8 symbols',
    ru: 'Пароль должен содержать как минимум 8 символов',
  },
};

export const schema = (lang: 'ru' | 'en') =>
  yup
    .object()
    .shape({
      email: yup
        .string()
        .required(validationMessages.emailRequired[lang] || '')
        .test(
          'contains-at-symbol',
          validationMessages.emailSimbol[lang] || '',
          (value) => {
            if (!value) return true;
            return value.includes('@');
          }
        )
        .test(
          'contains-domain',
          validationMessages.emailDomain[lang] || '',
          (value) => {
            if (!value) return true;
            const trimmedValue = value.replace(/\s/g, '');
            const domainRegex = /^[^@\s]+@[^@\s]+.[^@\s]+$/;
            const isValidFormat = domainRegex.test(trimmedValue);
            const hasDomainName = trimmedValue.split('@')[1]?.length > 0;
            return isValidFormat && hasDomainName;
          }
        )
        .email(validationMessages.emailInvalid[lang] || ''),

      password: yup
        .string()
        .required(validationMessages.passwordRequired[lang] || '')
        .matches(/[0-9]/, validationMessages.passwordDigit[lang] || '')
        .matches(/[!@#$%^&*]/, validationMessages.passwordCharacter[lang] || '')
        .matches(
          /[A-Z-a-z-А-Я-а-я]/,
          validationMessages.passwordCharacter[lang] || ''
        )
        .test(
          'password length',
          validationMessages.passwordLength[lang] || '',
          (value) => {
            if (value && value?.length >= 8) return true;
            return false;
          }
        ),
    })
    .required();
