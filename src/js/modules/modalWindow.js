const modal = () => {
    
    let btnPressed = false;

    const bindModal = (openTriggerSelector, modalQuerySelector, closeTriggerSelector, destroyOpenTrigger = false, paramsToCheck = []) => {
        /* paramsToCheck - массив всех параметров (инпуты, чекбоксы и т.д.), 
           которые должны быть проверены перед открытием следующего модального окна, первый 
           элемент массива обязательно является селектором модального окна, в котором проводится проверка */

        // destroyTrigger - true, если при открытии модального окна нужно убрать триггер (подарок в данном случае)
        document.querySelector(modalQuerySelector).classList.add('animated', 'fadeIn');
        document.querySelectorAll(openTriggerSelector).forEach(item => {
            

            item.addEventListener('click', (e) => {
                if(e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if(destroyOpenTrigger) item.remove();

                if(paramsToCheck.length) {
                    const itemsToCheck = paramsToCheck.filter((item, i) => i != 0).map(item => document.querySelector(item));
                    const modalToCheck = document.querySelector(paramsToCheck[0]);

                    const warning = document.createElement('span');
                    warning.classList.add('status');
                    warning.textContent = 'Пожалуйста, введите все данные';

                    let checked;

                    itemsToCheck.forEach((item, i) => {
                        switch(item.type) {
                            case 'text':
                                item.value ? openModal(modalQuerySelector, closeTriggerSelector) : putWarningInModal(modalToCheck, warning, '.status');
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
        let checkIfOtherModalsAreOpen;

        setTimeout(() => {
            document.querySelectorAll('[data-modal]').forEach(item => {
                if(getComputedStyle(item).display !== 'none') {
                    checkIfOtherModalsAreOpen = true;
                }
            })

            if(!checkIfOtherModalsAreOpen) openModal(modalQuerySelector, closeTriggerSelector);
            
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

    const openModalByScroll = (selector) => {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if(!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                document.querySelector(selector).click();
            }
        })
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
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openModalByScroll('.fixed-gift');
    showModalAfterTime('.popup-consultation', '.popup-consultation .popup-close', 60000);
};

export default modal;