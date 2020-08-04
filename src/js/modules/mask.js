const mask = (selector, matrix) => {

    const setCursor = (pos, elem) => {
        elem.focus();

        if(elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if(elem.createTextRange) { // для IE 9 и ниже

            const range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    function createMask(event) {
        const def = matrix.replace(/\D/g, '');
        let val = this.value.replace(/\D/g, '');
        let i = 0;

        if(def.length >= val.length) val = def;

        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        if(event.type === 'blur') {
            this.value = this.value.length === 2 ? '' : this.value ;
        } else {
            setCursor(this.value.length, this);
        }
    }

    document.querySelectorAll(selector).forEach(item => {
        item.addEventListener('input', createMask);
        item.addEventListener('focus', createMask)
        item.addEventListener('blur', createMask)
    })
}

export default mask;