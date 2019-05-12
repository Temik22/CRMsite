window.onload = function () {
    let inputs = document.getElementsByTagName('input');
    for (let elem of inputs){
        elem.addEventListener('input', function () { checkInput(this) });
    }

    let button = document.getElementById('form-button');
    button.addEventListener('click', function () {
        for ( let el of inputs){
            checkInput(el);
        }
        auth(inputs);
        getImage();
    });

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


function auth(inputs) {
    let temp = [];
    for (let el of inputs) {
        if (!el.classList.contains('is-invalid') && el.value !== '') {
            temp.push(el.value);
        } else return;
    }

    let url = '/auth/checkUser/' + temp[0] + '/' + temp[1];

    fetch(url)
        .then(
            function (response) {
                if (response.status !== 200){
                    console.log('error status:' + response.status);
                } else {
                    response.json().then(function (data) {
                        console.log(data);
                    })
                }
            }
        )

}

function getImage() {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(
            function (response) {
                if (response.status !== 200){
                    console.log('answer.status:' + response.status);
                }

                response.json().then( function (data) {
                    console.log(data.message);
                });
            }
        )
}