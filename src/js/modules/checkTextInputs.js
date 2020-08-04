const chechTextInputs = (selector) => {
    document.querySelectorAll(selector).forEach(item => {
        item.addEventListener('keypress', (e) => {
            const regex = item.getAttribute('name') === 'name' ? /[^а-яё]/ig : /[^а-яё 0-9]/ig;
            if(e.key.match(regex)) {
                e.preventDefault();
            }
        })
    })
}

export default chechTextInputs;

  