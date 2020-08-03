
const form = () => {
    const forms = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');

    const message = {
        success: 'Спасибо! Мы с Вами скоро свяжемся!',
        error: 'Упс! Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        failure: 'assets/img/fail.png'
    };

    const postFormData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            body: data
        }) 
        return await res.text();
    };

    const clearInputs = (inputs) => {
        inputs.forEach(item => {
            item.value = '';
        })
    }

    forms.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusDiv = document.createElement('div');
            const statusText = document.createElement('div');
            const statusImg = document.createElement('img');

            statusDiv.classList.add('animated', 'fadeInDown');
            statusImg.setAttribute('src', message.spinner); 
            statusDiv.appendChild(statusImg);
            statusDiv.appendChild(statusText);

            const data = new FormData(item);

            item.parentNode.appendChild(statusDiv);
            item.classList.add('animated', 'fadeOutUp');

            setTimeout(() => {
                item.style.display = 'none';
            }, 400)

            postFormData('assets/server.php', data)
                .then(res => {
                    statusText.textContent = message.success;
                    statusImg.setAttribute('src', message.ok);
                })
                .catch(error => {
                    statusText.textContent = message.error;
                    statusImg.setAttribute('src', message.failure);
                })
                .finally(() => {
                    clearInputs(inputs);
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 6000)
                })

        });
    });
};

export default form;