const anchorsScroll = (backToTopButtonSelector, ...rest) => {
    const button = document.querySelector(backToTopButtonSelector);
    button.classList.add('animated');

    rest.forEach(restItem => {
        document.querySelectorAll(restItem).forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const blockID = item.getAttribute('href').substr(1);
                document.getElementById(blockID).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        })
    })

    window.addEventListener('scroll', () => {
        if(Math.floor(window.scrollY) > 1800) {
            button.classList.remove('fadeOut')
            button.classList.add('fadeIn');
            setTimeout(() => {
                button.style.display = 'block';
            }, 400)
        } else {
            button.classList.remove('fadeIn')
            button.classList.add('fadeOut');
            setTimeout(() => {
                button.style.display = 'none';
            }, 400)
        }
    })
}

export default anchorsScroll;