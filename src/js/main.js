import modal from './modules/modalWindow';
import slider from './modules/slider';
import form from './modules/form';
import mask from './modules/mask';
import chechTextInputs from './modules/checkTextInputs';
import loadMoreStyles from './modules/loadMoreStyles';
import calcPrice from './modules/calcPrice';
import filterImages from './modules/filterImages';
import showImages from './modules/showImages';
import accordion from './modules/accodrion';
import burger from './modules/burger';
import anchorsScroll from './modules/anchorsScroll';

window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    modal();
    slider();
    form();
    mask('[name=phone]', '+7 (___) ___ __ __');
    chechTextInputs('[name=name]');
    chechTextInputs('[name=message]');
    loadMoreStyles('.button-styles', '.styles-2');
    calcPrice('#size', '#material', '#options', '.promocode', '.calc-price');
    filterImages('.portfolio-menu li', '.portfolio-block', '.portfolio-no');
    showImages('.sizes-block');
    accordion('.accordion-heading');
    burger('.burger', '.burger-menu');
    anchorsScroll('.chevron-up', '.chevron-up a', '.burger-menu li a')
});