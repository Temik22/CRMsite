// let inputs = document.getElementsByTagName('input');
// for (let elem of inputs) {
//     elem.addEventListener('input', function () {
//         checkInput(this)
//     });
// }
//
// let button = document.getElementById('form-button');
// button.addEventListener('click', function () {
//     for (let el of inputs) {
//         checkInput(el);
//     }
//     auth(inputs);
// });


// function getImage() {
//     fetch('https://dog.ceo/api/breeds/image/random')
//         .then(
//             function (response) {
//                 if (response.status !== 200) {
//                     console.log('answer.status:' + response.status);
//                 }
//
//                 response.json().then(function (data) {
//                     console.log(data.message);
//                 });
//             }
//         )
// }