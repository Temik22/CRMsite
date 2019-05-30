Vue.component('logpage', {
    props: ['seen'],
    data: function () {
        return {
            login: '',
            password: ''
        }
    },

    methods:{
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
        }
    },

    template: '<div v-if="seen" class="main-field container bg-white shadow rounded">\n' +
        '    <div class="container d-flex justify-content-center h-25">\n' +
        '        <h1 class="mt-4">Login?</h1>\n' +
        '    </div>\n' +
        '    <div class="d-flex flex-column p-2 h-75" id="login-form" data-status="true">\n' +
        '        <div class="container d-flex flex-column align-content-center mt-4">\n' +
        '            <label class="pl-1" for="login-email">Login</label>\n' +
        '            <input v-model="login" @input="check"\n' +
        '                   class="form-control border-top-0 border-left-0 border-right-0 border-dark bg-light"\n' +
        '                   id="login-email" placeholder="Enter your email"\n' +
        '                   data-regexp="^[a-zA-z]+@[a-z]+\\.[a-z]{1,4}$">\n' +
        '            <div class="invalid-feedback">\n' +
        '                Your login must be an E-Mail address\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="container d-flex flex-column align-content-center mt-4">\n' +
        '            <label class="pl-1" for="login-password">Password</label>\n' +
        '            <input v-model="password" @input="check"\n' +
        '                   class="form-control border-right-0 border-left-0 border-top-0 border-dark bg-light"\n' +
        '                   id="login-password" placeholder="Enter your password" data-regexp="^.{6,}$">\n' +
        '            <div class="invalid-feedback">\n' +
        '                Your password can\'t be shorter than 6 symbols\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <button id="form-button" @click="send" class="btn btn-primary shadow mt-4">Sign in</button>\n' +
        '    </div>\n' +
        '</div>\n'
});

Vue.component('workspace', {
    props: ['seen'],

    data : () => {
        return {
            activeScreen : null
        }
    },

    template: '<div @change="showScreen($event.target.ordinal)">' +
        '<tabpanel>' +
        '    <tab v-for="screen, i in $slots.screens" :ordinal="i" :name="screen.name" seen="true"></tab>' +
        '</tabpanel>' +
        '    <slot></slot>' +
        '    <slot name="screens"></slot>' +
        '</div>',

    mounted : function () {
        this.showScreen(this.$slots.screens[0]);
    },

    methods : {
        showScreen: function (screenNum) {
            let screen = this.$slots.screens[screenNum];
            console.log(screen);
            if (screen === this.activeScreen) return;
            if (this.activeScreen !== null)
            this.activeScreen.seen = false;
            screen.seen = true;
            this.activeScreen = screen;
        }
    }
});

Vue.component('tabpanel', {
    template: '<nav class="navbar navbar-expand-sm bg-primary">\n' +
        '    <ul class="navbar-nav">\n' +
        '        <slot></slot>\n' +
        '    </ul>\n' +
        '</nav>'
});

Vue.component('screen', {
    props: ['name', 'seen'],

    template: '<div v-if="seen" style="background-color: darkcyan">This is screen: {{name}}</div>'
});

Vue.component('tab', {
    props: ['name', 'seen'],

    template: '<li v-if="seen" class="nav-item">\n' + // to mark button as active class active can be added
        '    <button class="btn btn-primary">{{name}}</button>\n' +
        '</li>',

    methods : {
        click : function () {
            this.$emit('change');
        }
    }

});

let app = new Vue({
    el: "#app",
    data:{
        logseen: true,
        workseen: false
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