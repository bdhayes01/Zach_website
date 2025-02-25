function validateNumber() {
    const numberInput = document.getElementById('number').value;
    const errorMessage = document.getElementById('error-message');

    if (numberInput < 1 || numberInput > 10) {
        errorMessage.style.display = 'block';
        return false;
    }
    else{
        store(numberInput);
    }

    errorMessage.style.display = 'none';
    alert('Form submitted successfully!');
    return true;
}


function getLastWeek(){
    let parsedObj;
    if(localStorage.getItem('local_pain') !== null) {
        parsedObj = JSON.parse(localStorage.getItem('local_pain'));
    }
    else{
        return;
    }

    const list = document.getElementById("last-week");

    const newMap = new Map(Object.entries(parsedObj));
    Array.from(newMap).reverse().forEach(([key, value]) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${key}: ${value}`;
        list.appendChild(listItem);
    });
}
function store(e) {
    let curr_map = new Map();
    const now = new Date();
    // const currentTime = now.toLocaleTimeString();

    if(localStorage.getItem('local_pain') !== null) {
        curr_map = JSON.parse(localStorage.getItem('local_pain'));
        curr_map = new Map(Object.entries(curr_map));
    }
    curr_map.set(now, parseInt(e));

    let obj = Object.fromEntries(curr_map);

    localStorage.setItem('local_pain', JSON.stringify(obj))
}

document.addEventListener('DOMContentLoaded', function() {
    getLastWeek();
});