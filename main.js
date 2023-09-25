import './style.css';
import 'normalize.css';

import { AsYouType } from 'libphonenumber-js';

const heroForm = document.querySelector('.hero__form');
const inputNameHero = document.querySelector('.hero__input-name');
const inputPhoneHero = document.querySelector('.hero__input-phone');
const premiumForm = document.querySelector('.premium__form');
const inputNamePremium = document.querySelector('.premium__input-name');
const inputPhonePremium = document.querySelector('.premium__input-phone');

let phoneNumberValid = false;

const messageContainer = document.createElement('div');

messageContainer.className = 'message-container';

const checkValidPhone = (e) => {
  const valueNumber = new AsYouType('RU');
  valueNumber.input(e.target.value);
  phoneNumberValid = valueNumber.isValid();
};

const templateMessage = (message, theme = 'success') => {
  return theme == 'success'
    ? `<p class="message message_success">${message}</p>`
    : `<p class="message message_warning">${message}</p>`;
};

const addMessage = (form, message, theme = 'success') => {
  messageContainer.innerHTML = templateMessage(message, theme);
  form.append(messageContainer);
  setTimeout(() => messageContainer.remove(), 3000);
};

const openPopup = () => {
  const popup = document.createElement('div');

  popup.className = 'popup';
  popup.innerHTML = `<p class="popup__message">Ваша заявка принята</p>
                     <button class="popup__close" type="button"></button>
  `;
  document.body.append(popup);

  const buttonPopupClose = document.querySelector('.popup__close');

  buttonPopupClose.addEventListener('click', () => closePopup(popup));
};

const closePopup = (popup) => {
  popup.style = 'animation: closePopup 2s cubic-bezier(0.215, 0.61, 0.355, 1);';
  setTimeout(() => popup.remove(), 1800);
};

const submitForm = (form, name, phone, popup = false) => {
  if (!name.value && !phone) {
    addMessage(form, 'Заполните обязательные поля', 'warning');
    return;
  } else if (!phone) {
    addMessage(form, 'Проверьте номер телефона', 'warning');
    return;
  } else if (!name.value) {
    addMessage(form, 'Заполните имя', 'warning');
    return;
  } else {
    if (popup) {
      addMessage(form, 'Ваша заявка принята');
      inputNameHero.value = '';
      inputPhoneHero.value = '';
      phoneNumberValid = false;
    } else {
      openPopup();
      inputNamePremium.value = '';
      inputPhonePremium.value = '';
      phoneNumberValid = false;
    }
  }
};

inputPhoneHero.addEventListener('input', (e) => checkValidPhone(e));
inputPhonePremium.addEventListener('input', (e) => checkValidPhone(e));

heroForm.addEventListener('submit', (e) => {
  e.preventDefault();
  submitForm(heroForm, inputNameHero, phoneNumberValid, true);
});

premiumForm.addEventListener('submit', (e) => {
  e.preventDefault();
  submitForm(premiumForm, inputNamePremium, phoneNumberValid, false);
});
