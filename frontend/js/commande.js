let localStorageOrderId = JSON.parse(localStorage.getItem("orderId"));
let localStorageTotalPrice = JSON.parse(localStorage.getItem("totalPrice"));
let localStorageName = JSON.parse(localStorage.getItem("contact"));

const orderPriceNumber = {
    totalPrice: localStorageTotalPrice + '€',
    orderId: localStorageOrderId
}

const name = document.getElementById('name');
const orderId = document.getElementById('orderId');
const totalPrice = document.getElementById('totalPrice');

const showOrder = async() => {
    name.innerHTML = `
        Merci ${localStorageName.firstName} ${localStorageName.lastName} pour votre commande, à très vite !
    `;
    orderId.innerHTML = `
        ${orderPriceNumber.orderId}
    `;
    totalPrice.innerHTML = `
        ${orderPriceNumber.totalPrice}
    `;
};

showOrder();

//vider localstorage orderId + totalPrice + contact
window.localStorage.removeItem('orderId');
window.localStorage.removeItem('totalPrice');
window.localStorage.removeItem('contact');