import modal from './modules/modalWindow';
import slider from './modules/slider';
import form from './modules/form';
import mask from './modules/mask';
import chechTextInputs from './modules/checkTextInputs';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    modal();
    slider();
    form();
    mask('[name=phone]', '+7 (___) ___ __ __');
    chechTextInputs('[name=name]');
});