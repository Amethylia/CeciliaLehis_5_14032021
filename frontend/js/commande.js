//récupération de la chaîne de requête dans l'URL
const queryString_url_id = window.location.search;

//extraction de l'id de la commande
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("orderId");

//afficher la commande via l'id 
let order;
let fetchOrder = async() => {
    order = await fetch(
        'http://localhost:3000/api/teddies/'+id).then(res => 
        res.json());
};

let localStorageOrder = JSON.parse(localStorage.getItem("order"));

const totalPrice = document.getElementById('totalPrice');
const orderId = document.getElementById('orderId');

const showOrder = async() => {
    await fetchOrder();
    totalPrice.innerHTML = `
        ${localStorageOrder.totalPrice}
    `;
    orderId.innerHTML = `
        ${localStorageOrder.orderId}
    `;
};

showOrder();