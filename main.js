let controller = new Vue({
    el: '#controller',
    data: {
        sw: false
    },
    methods: {
        change: function () {
            if (controller.sw) {
                login.seen = !controller.sw;
                work.seen = controller.sw;
            }
        }
    }
});

let login = new Vue({
    el: '#login',
    data: {
        seen: true,
        login: '',
        password: ''
    },
    methods: {
        check: function () {
            let inputs = document.getElementsByTagName('input');
            for (let input of inputs)
                checkInput(input);
        },
        send: function () {
            let inputs = document.getElementsByTagName('input');
            for (let input of inputs)
                checkInput(input);
            auth(inputs);
            controller.change();
        }
    }
});

let work = new Vue({
    el: '#workspace',
    data: {
        seen: false
    }
});

function checkInput(input) {
    let regexp = new RegExp(input.getAttribute('data-regexp'));
    let check = regexp.test(input.value);

    if (input.value !== '') {
        if (input.classList.contains('is-invalid')) {
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
                if (response.status !== 200) {
                    console.log('error status:' + response.status);
                } else {
                    response.json().then(function (data) {
                        console.log(data);
                    })
                }
            }
        )
}