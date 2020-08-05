const burger = (burgerSelector, menuSelector) => {
    const menu = document.querySelector(menuSelector);
    menu.style.display = 'none';

    document.querySelector(burgerSelector).addEventListener('click', () => {
        if(menu.style.display === 'none' && window.screen.availWidth <= 992) {
            menu.style.display = 'block';
        } else if(menu.style.display === 'block' && window.screen.availWidth <= 992) {
            menu.style.display = 'none';
        }
    })

    window.addEventListener('resize', () => {
        if(menu.style.display === 'block' && window.screen.availWidth > 992) {
            menu.style.display = 'none';
        }
    })
}

export default burger;