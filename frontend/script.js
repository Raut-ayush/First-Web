document.addEventListener('DOMContentLoaded', () => {
    const itemsList = document.getElementById('items-list');
    const itemForm = document.getElementById('item-form');
    const itemInput = document.getElementById('item-input');

    fetch('http://localhost:3000/items')
        .then(response => response.json())
        .then(items => {
            items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.name;
                itemsList.appendChild(li);
            });
        });

    itemForm.addEventListener('submit', event => {
        event.preventDefault();
        const newItem = itemInput.value.trim();

        if (newItem) {
            fetch('http://localhost:3000/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newItem })
            })
            .then(response => response.json())
            .then(item => {
                const li = document.createElement('li');
                li.textContent = item.name;
                itemsList.appendChild(li);
                itemInput.value = '';
            });
        }
    });
});
