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

const containerTeddies = document.getElementById('container-teddies');

const showTeddies = async() => {
    await fetchTeddies();
    containerTeddies.innerHTML = (

        teddies
            .map(teddy => (
                `
                    <div class="row align-items-center product">
                        <div class="col-lg-6 order-lg-2">
                            <div class="p-3 p-lg-5">
                                <img class="img-fluid" src="${teddy.imageUrl}" alt="img_teddy" 
                                onclick="clickOnProductHandle('${teddy._id}')">
                            </div>
                        </div>
                        <div class="col-lg-6 order-lg-1">
                            <div class="py-0 px-3 p-lg-5">
                                <h3 class="name-product" onclick="clickOnProductHandle('${teddy._id}')">${teddy.name}</h3>
                                <p class="description-product">${teddy.description}</p>
                                <p class="price-product">${teddy.price /100} €</p>
                            </div>
                        </div>
                    </div>
                `
            )).join('')
    );
};

showTeddies();

