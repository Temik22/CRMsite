window.onload = function () {
    let inputs = document.getElementsByTagName('input');
    for (let elem of inputs){
        elem.addEventListener('input', function () { checkInput(this) });
    }

    let button = document.getElementById('form-button');
    button.addEventListener('click', function () { auth() });

};

function checkInput(input) {
    let regexp = new RegExp(input.getAttribute('data-regexp'));
    let check = regexp.test(input.value);

    if (input.value !== ''){
        if (input.classList.contains('is-invalid')){
            if (check) {
                input.classList.remove('is-invalid');

            }
        } else {
            if (!check) {
                input.classList.add('is-invalid');
            }
        }
    } else {
        if (input.classList.contains('is-invalid')) {
            input.classList.remove('is-invalid');
        }
    }
}


function auth() {
    let data = document.getElementsByTagName('input');
    let temp = [];
    for (let el in data) {
        if (!el.classList.contains('is-invalid') && el.value !== '') {
            temp.push(el.value);
        }
    }

    console.log(temp)
}