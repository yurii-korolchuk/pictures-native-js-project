
const showFileName = (item) => {
    const _nameSplit = item.files[0].name.split('.');
    const _nameExtension = _nameSplit[_nameSplit.length - 1];
    const _name = _nameSplit[0];

    const name = _name.length > 8 ? _name.substr(0, 6) + '...' + _nameExtension : item.files[0].name;
    item.parentElement.querySelector('.file_name').textContent = name;
}

const form = () => {
    const forms = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');
    const upload = document.querySelectorAll('input[name=upload]');

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
        upload.forEach(item => {
            item.parentElement.querySelector('.file_name').textContent = 'Файл не выбран';
        })
    }

    upload.forEach(item => {
        item.addEventListener('input', (e) => {
            showFileName(e.target);
        })
    })

    forms.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusDiv = document.createElement('div');
            const statusText = document.createElement('div');
            const statusImg = document.createElement('img');

            statusDiv.classList.add('animated', 'fadeInDown');
            statusDiv.style.cssText = `
                display: flex;
                justify-content: center;
                align-items: center;
                flex-directon: column;
            `;
            statusImg.setAttribute('src', message.spinner); 
            statusDiv.appendChild(statusImg);
            statusDiv.appendChild(statusText);

            const data = new FormData(item);

            item.parentNode.appendChild(statusDiv);
            item.classList.add('animated', 'fadeOutUp');

            setTimeout(() => {
                item.style.display = 'none';
            }, 400)
            const api = item.closest('.popup-design') || item.classList.contains('form-data') ? 'assets/server.php' : 'assets/question.php';
            postFormData(api, data)
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
                        statusDiv.classList.remove('fadeInDown');
                        statusDiv.classList.add('fadeOutDown');
                        setTimeout(() => {
                            statusDiv.remove();
                        },400)

                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 4500)
                })

        });
    });
};

export { showFileName, form }
