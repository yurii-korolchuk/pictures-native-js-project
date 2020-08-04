const loadMoreStyles = (triggerSelector, styleSelector) => {
    document.querySelectorAll(triggerSelector).forEach(item => {
        item.addEventListener('click', () => {
            item.remove();
            document.querySelectorAll(styleSelector).forEach(item => {
                item.classList.add('animated', 'fadeInUp');
                item.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs', 'styles-2');
                item.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
            })
        })
    })
}   

export default loadMoreStyles;