const modal = () => {
    const bindModal = (openTriggerSelector, modalQuerySelector, closeTriggerSelector, paramsToCheck = []) => {
        /* paramsToCheck - массив всех параметров (инпуты, чекбоксы и т.д.), 
           которые должны быть проверены перед открытием следующего модального окна, первый 
           элемент массива обязательно является селектором модального окна, в котором проводится проверка */

        document.querySelectorAll(openTriggerSelector).forEach(item => {
            item.addEventListener('click', (e) => {
                if(e.target) {
                    e.preventDefault();
                }

                if(paramsToCheck.length) {
                    const itemsToCheck = paramsToCheck.filter((item, i) => i != 0).map(item => document.querySelector(item));
                    const modal = document.querySelector(paramsToCheck[0]);

                    const warning = document.createElement('span');
                    warning.classList.add('status', 'fadeIn');
                    warning.textContent = 'Пожалуйста, введите все данные';

                    let checked;

                    itemsToCheck.forEach((item, i) => {
                        switch(item.type) {
                            case 'text':
                                item.value ? openModal(modalQuerySelector, closeTriggerSelector) : putWarningInModal(modal, warning, '.status');
                                break;
                            case 'checkbox':
                                checked = item.checked ? true : false;
                                i === itemsToCheck.length - 1 ? (checked ? openModal(modalQuerySelector, closeTriggerSelector) : putWarningInModal(modal, warning, '.status')) : null;
                                break;
                                
                            default:
                                openModal(modalQuerySelector, closeTriggerSelector);
                        }
                    })
                } else {
                    openModal(modalQuerySelector, closeTriggerSelector);
                }
                
            });
        });
    };

    const putWarningInModal = (modal, warning, warningSelector) => {
        if(!modal.contains(document.querySelector(warningSelector))) {
            modal.appendChild(warning);

            setTimeout(() => {
                warning.remove();
            }, 2000)
        } 
    }
    
    const showModalAfterTime = (modalQuerySelector, closeTriggerSelector, time) => {
        setTimeout(() => {
            openModal(modalQuerySelector, closeTriggerSelector);
        }, time);
    };

    const calcScrollWidth = () => {
        let tmp = document.createElement('div');

        tmp.style.overflowY = 'scroll';
        tmp.style.width = '50px';
        tmp.style.height = '50px';
        tmp.style.visibility = 'hidden';

        document.body.appendChild(tmp);

        let scrollWidth = tmp.offsetWidth - tmp.clientWidth;

        tmp.remove();

        return scrollWidth;

    }
    
    const openModal = (modalQuerySelector, closeTriggerSelector) => { 
        const modal = document.querySelector(modalQuerySelector);
        const scrollWidth = calcScrollWidth();

        document.body.style.overflow = 'hidden';
        modal.style.display = 'block';

        document.body.style.marginRight = `${scrollWidth}px`;
       
        const closeModal = (modalQuerySelector) => {
            const modal = document.querySelector(modalQuerySelector);
            document.body.style.overflow = 'auto';
            modal.style.display = 'none';
            document.body.style.marginRight = ``;
        };
    
        document.querySelector(modalQuerySelector).addEventListener('click', (e) => {
            if(e.target && e.target === document.querySelector(modalQuerySelector)) {
                closeModal(modalQuerySelector);
            }
        });
    
        document.querySelector(closeTriggerSelector).addEventListener('click', (e) => {
            e.preventDefault();
            closeModal(modalQuerySelector);
        });
    };

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
};

export default modal;