const accordion = (btnSelector) => {
    const btns = document.querySelectorAll(btnSelector);

    btns.forEach(item => {
        item.nextElementSibling.style.display = 'none';
        item.nextElementSibling.classList.add('animated');

        item.addEventListener('click', () => {
            if(item.classList.contains('active')) {
                closeItem(item);
            } else {
                openItem(item);
            }
        })
    })

    const closeItem = (item) => {
        item.classList.remove('active');
        item.nextElementSibling.classList.remove('fadeInUp');
        item.nextElementSibling.classList.add('fadeOut');
        setTimeout(() => {
            item.nextElementSibling.style.display = 'none';
        }, 400);
    }

    const openItem = (item) => {
        item.classList.add('active');
        item.nextElementSibling.classList.remove('fadeOut');
        item.nextElementSibling.classList.add('fadeInUp'); 
        item.nextElementSibling.style.display = 'block';
    }
}

export default accordion;