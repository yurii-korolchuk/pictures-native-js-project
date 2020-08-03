const slider = () => {
    const bindSlider = (slidesSelector, direction, prevButtonSelector, nextButtonSelector) => {
        const slides = document.querySelectorAll(slidesSelector);
        let slideIndex = 0;
        let paused;

        const showSlide = (n) => {
            slideIndex = n;

            if(slideIndex < 0) slideIndex = slides.length - 1;
            if(slideIndex + 1 > slides.length) slideIndex = 0;
            slides.forEach(item => {
                item.classList.add('animated');
                item.style.display = 'none';
            })
            slides[slideIndex].style.display = 'block';
        }

        const changeSlide = (n) => {
            showSlide(slideIndex += n);
        }

        showSlide(0);

        try {
            const prevButton = document.querySelector(prevButtonSelector);
            const nextButton = document.querySelector(nextButtonSelector);

            prevButton.addEventListener('click', () => {
                changeSlide(-1);
                slides[slideIndex].classList.remove('slideInRight');
                slides[slideIndex].classList.add('slideInLeft');
            })

            nextButton.addEventListener('click', () => {
                changeSlide(1);
                slides[slideIndex].classList.remove('slideInLeft');
                slides[slideIndex].classList.add('slideInRight');
            })
            
        } catch(e) {}

        const activateInterval = () => {
            if(direction === 'vertical') {
                paused = setInterval(() => {
                    changeSlide(1);
                    slides[slideIndex].classList.add('slideInDown');
                }, 8500)
            } else {
                paused = setInterval(() => {
                    changeSlide(1);
                    slides[slideIndex].classList.remove('slideInLeft');
                    slides[slideIndex].classList.add('slideInRight');
                }, 8500)
            }
        }

        activateInterval();

        slides[0].parentNode.addEventListener('mouseenter', () => {
            clearInterval(paused);
        })

        slides[0].parentNode.addEventListener('mouseleave', () => {
            activateInterval();
        })


    }

    bindSlider('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
    bindSlider('.main-slider-item', 'vertical');
}

export default slider;