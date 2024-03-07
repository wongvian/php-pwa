// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => console.log('Service Worker registered'))
        .catch(error => console.log('Service Worker registration failed:', error));
}

// CRUD operations
const form = document.getElementById('form');
const idInput = document.getElementById('id');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const dataTable = document.getElementById('data-table').getElementsByTagName('tbody')[0];

// Function to fetch data from the server
function fetchData() {
    fetch('crud.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'action=get'
    })
    .then(response => response.json())
    .then(data => {
        dataTable.innerHTML = '';
        data.forEach(item => {
            const row = dataTable.insertRow();
            const nameCell = row.insertCell(0);
            const emailCell = row.insertCell(1);
            const phoneCell = row.insertCell(2);
            const actionsCell = row.insertCell(3);

            nameCell.textContent = item.name;
            emailCell.textContent = item.email;
            phoneCell.textContent = item.phone;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                idInput.value = item.id;
                nameInput.value = item.name;
                emailInput.value = item.email;
                phoneInput.value = item.phone;
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteData(item.id);
            });

            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Function to insert or update data
function saveData(event) {
    event.preventDefault();
    const id = idInput.value;
    const name = nameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;

    const formData = new FormData();
    formData.append('action', id ? 'update' : 'insert');
    formData.append('id', id);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);

    fetch('crud.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        if (result) {
            idInput.value = '';
            nameInput.value = '';
            emailInput.value = '';
            phoneInput.value = '';
            fetchData();
        } else {
            console.error('Error saving data');
        }
    })
    .catch(error => console.error('Error saving data:', error));
}

// Function to delete data
function deleteData(id) {
    const formData = new FormData();
    formData.append('action', 'delete');
    formData.append('id', id);

    fetch('crud.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(result => {
        if (result) {
            fetchData();
        } else {
            console.error('Error deleting data');
        }
    })
    .catch(error => console.error('Error deleting data:', error));
}

// Event listeners
form.addEventListener('submit', saveData);
fetchData();