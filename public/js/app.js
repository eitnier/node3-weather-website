const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    const url = 'http://localhost:3000/weather?address=' + location;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(url).then((response) => {
        response.json().then(({error=undefined, location, forecast}) => {
            if (error) {
                console.log(error);
                messageOne.textContent = error;
            } else {
                messageOne.textContent = location;
                messageTwo.textContent = forecast;
            }
        });
    })
});