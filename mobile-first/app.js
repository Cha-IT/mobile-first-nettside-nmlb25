document.addEventListener("DOMContentLoaded", () => {
    loadMenu();
});

let order = [];

function loadMenu() {
    fetch('meny.json')
        .then(response => response.json())
        .then(data => {
            const menuList = document.getElementById('menu-list');  // Fixed typo here
            data.meny.forEach((item, index) => {
                let li = document.createElement('li');
                li.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p><strong>Pris:</strong> ${item.price}</p>
                    ${item.image ? `<img class="image" src="${item.image}" alt="${item.name}" />` : ''} <!-- Added 'image' class here -->
                    <button onclick="addToOrder(${index}, '${item.name}', '${item.price}')">Legg til</button>
                    <hr>
                `;
                menuList.appendChild(li);
            });
        })
        .catch(error => console.error('Feil ved lasting av meny:', error));
}

function addToOrder(index, name, price) {
    order.push({ index, name, price });
    updateOrderList();
}

function updateOrderList() {
    const orderList = document.getElementById('order-list');
    orderList.innerHTML = "";
    order.forEach((item, i) => {
        let li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - ${item.price} 
            <button onclick="removeFromOrder(${i})">Fjern</button>
        `;
        orderList.appendChild(li);
    });
}

function removeFromOrder(index) {
    order.splice(index, 1);
    updateOrderList();
}

function submitOrder() {
    alert("Bestilling sendt! Takk for din ordre.");
    order = [];
    updateOrderList();
}
