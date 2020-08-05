const showImages = (blockSelector) => {
    const blocks = document.querySelectorAll(blockSelector);

    const showImage = (block) => {
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -4) + '-1.png';

        block.querySelectorAll('p:not(.sizes-hit)').forEach(item => {
            item.style.display = 'none';
        })
    }

    const hideImage = (block) => {
        const img = block.querySelector('img');
        img.src = img.src.slice(0, -6) + '.png';

        block.querySelectorAll('p:not(.sizes-hit)').forEach(item => {
            item.style.display = 'block';
        })
    }

    blocks.forEach(item => {
        item.addEventListener('mouseover', () => {
            showImage(item);
        })
        item.addEventListener('mouseout', () => {
            hideImage(item);
        })
    })
}

export default showImages;