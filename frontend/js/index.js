const results = document.getElementById('results');

let teddies;

const fetchTeddies = async() => {
    teddies = await fetch(
        'http://localhost:3000/api/teddies').then(res => 
        res.json());
};

//fonction clickOnProductHandle
function clickOnProductHandle(productID) {
    window.location.href = "./produit.html?productId="+productID;
}

const showTeddies = async() => {
    await fetchTeddies();

    results.innerHTML = (

        teddies
            .map(teddy => (
                `
                    <li class="product" onclick="clickOnProductHandle('${teddy._id}')">
                        <h2 class="name-product">${teddy.name}</h2>
                        <img class="picture-product" src="${teddy.imageUrl}" />
                        <div class="info-product">
                            <p class="description-product">${teddy.description}</p>
                            <h2 class="price-product">${teddy.price /100} €</h2>
                        </div>
                    </li>
                `
            )).join('')
    );
};

showTeddies();

