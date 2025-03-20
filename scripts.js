function storeName() {
    const name = document.getElementById('nameInput').value;
    if (name) {
        localStorage.setItem('userName', name);
        window.location.href = 'passion.html'; // Redirect to passion.html
    } else {
        alert('Please enter your name!');
    }
}

function retrieveName() {
    const name = localStorage.getItem('userName');
    if (name) {
        document.getElementById('displayName').innerText = name;
    }
}

// Call retrieveName() on the passion.html page load to display the name
document.addEventListener('DOMContentLoaded', (event) => {
    if (document.getElementById('displayName')) {
        retrieveName();
    }
});