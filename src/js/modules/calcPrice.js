const calcPrice = (sizeSelector, materialSelector, additionalSelector, promocodeSelector, overallSelector) => {
    const size = document.querySelector(sizeSelector),
          material = document.querySelector(materialSelector),
          additional = document.querySelector(additionalSelector),
          promocode = document.querySelector(promocodeSelector),
          overall = document.querySelector(overallSelector);

    const calc = () => {
        if(size.value && material.value) {
            let sum = Math.round(+size.value * +material.value);

            if(additional.value) sum += +additional.value;
            if(promocode.value == 'IWANTPOPART') sum = Math.floor(sum * 0.7);

            overall.textContent = sum;
        } else {
            overall.textContent = 'Для расчета нужно выбрать размер картины и материал картины'
        }

    }

    size.addEventListener('change', calc);
    material.addEventListener('change', calc);
    additional.addEventListener('change', calc);
    promocode.addEventListener('input', calc);
}

export default calcPrice;