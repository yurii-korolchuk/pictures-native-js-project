import { showFileName } from './form';

const dragAndDrop = (ddSelector) => {

    const inputs = document.querySelectorAll(ddSelector);

    const uploadIcon = document.createElement('img');
    uploadIcon.setAttribute('src', 'assets/img/file-upload-solid.svg');
    uploadIcon.classList.add('animated', 'fadeInUp');

    uploadIcon.style.cssText = `
        width: 50px;
        height: 50px;
    `
    
    const showUploadIcon = (item) => {
        if(item.querySelector('button').style.display !== 'none') item.querySelector('button').style.display = 'none';
        if(!item.querySelector('.file_name').contains(uploadIcon)) item.querySelector('.file_name').appendChild(uploadIcon);
    }   

    const hideUploadIcon = (item) => {
        if(item.querySelector('button').style.display === 'none') item.querySelector('button').style.display = 'block';
        if(item.querySelector('.file_name').contains(uploadIcon)) uploadIcon.remove();
    }

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventType => {
        inputs.forEach(input => {
            input.addEventListener(eventType, (e) => {
                switch(e.type) {
                    case 'dragenter': 
                        e.preventDefault();
                        showUploadIcon(e.target.closest('.file_upload'));
                        break;
                    case 'dragleave':
                        e.preventDefault();
                        hideUploadIcon(e.target.closest('.file_upload'))
                        break;
                    case 'dragover':
                        e.preventDefault();
                        showUploadIcon(e.target.closest('.file_upload'));
                        break;
                    case 'drop':
                        e.preventDefault();
                        hideUploadIcon(e.target.closest('.file_upload'));
                        e.target.files = e.dataTransfer.files;
                        showFileName(e.target);
                        break;
                    default:
                        break;
                }
            });
        })
    })

}

export default dragAndDrop;