const containerTeddies = document.getElementById('container-teddies');

//fonction clickOnProductHandle
function clickOnProductHandle(productID) {
    window.location.href = "./produit.html?productId="+productID;
}

fetch('http://localhost:3000/api/teddies')
.then((res) => res.json())
.then((data) => {
    containerTeddies.innerHTML = (
        data.map(teddy => (
            `
                <div class="row align-items-center product">
                    <div class="col-lg-6 order-lg-2">
                        <div class="p-3 p-lg-5">
                            <img class="img-fluid" src="${teddy.imageUrl}" alt="image ours" 
                            onclick="clickOnProductHandle('${teddy._id}')">
                        </div>
                    </div>
                    <div class="col-lg-6 order-lg-1">
                        <div class="py-0 px-3 p-lg-5">
                            <h2 class="name-product" onclick="clickOnProductHandle('${teddy._id}')">${teddy.name}</h2>
                            <p class="description-product">${teddy.description}</p>
                            <div class="price-product">${teddy.price /100} €</div>
                        </div>
                    </div>
                </div>
            `
        )).join('')
    );
})
.catch((err) => {console.log(err);});