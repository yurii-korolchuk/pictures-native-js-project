const filterImages = (filtersSelector, imagesSelector, noItemsToShowSelector) => {
    const filters = document.querySelectorAll(filtersSelector);
    const images = document.querySelectorAll(imagesSelector);
    const noItems = document.querySelector(noItemsToShowSelector);

    filters[0].parentNode.addEventListener('click', (e) => {
        if(e.target && e.target.tagName === 'LI' && !e.target.classList.contains('active')) {
            let itemsToShow;

            images.forEach(item => {
                item.classList.remove('fadeIn');
                item.style.display = 'none';

                if(item.classList.contains(e.target.className)) {
                    item.classList.add('animated', 'fadeIn');
                    item.style.display = 'block';
                    itemsToShow = true;

                    if(noItems.style.display === 'block') {
                        noItems.classList.remove('animated');
                        noItems.style.display = 'none';
                    }
                }
            })

            filters.forEach(item => {
                item.classList.remove('active');
                if(item === e.target) item.classList.add('active');
            })

            if(!itemsToShow) {
                noItems.classList.add('animated', 'fadeIn');
                noItems.style.display = 'block';
            }
        }
    });

}

export default filterImages;