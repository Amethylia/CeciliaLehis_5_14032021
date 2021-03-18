const results = document.getElementById('results');

let teddies;

const fetchTeddies = async() => {
    teddies = await fetch(
        'http://localhost:3000/api/teddies').then(res => 
        res.json());
};

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
                            <h3 class="color-product">${teddy.colors}</h3>
                            <h2 class="price-product">${teddy.price /100} €</h2>
                        </div>
                    </li>
                `
            )).join('')
    );
};

showTeddies();

function clickOnProductHandle(productID)
{
    console.log(productID);
    window.location.href = "./product.html?productId="+productID;
}