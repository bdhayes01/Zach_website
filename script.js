function validateNumber() {
    const numberInput = document.getElementById('number').value;
    const errorMessage = document.getElementById('error-message');

    if (numberInput < 1 || numberInput > 10) {
        errorMessage.style.display = 'block';
        return false;
    }

    errorMessage.style.display = 'none';
    alert('Form submitted successfully!');
    return true;
}
