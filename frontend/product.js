//récupération de la chaîne de requête dans l'URL
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

//extraction de l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);
const id = urlSearchParams.get("productId");
console.log(id);

//afficher le produit via l'id 
let teddy;
let fetchTeddy = async() => {
    teddy = await fetch(
        'http://localhost:3000/api/teddies/'+id).then(res => 
        res.json());
}

console.log(teddy);

const results = document.querySelector('.container-product');

const showTeddy = async() => {
    await fetchTeddy();
    results.innerHTML = 
                `
                <div class="page-product">
                        <img class="picture-product" src="${teddy.imageUrl}" />
                    <div class="product">
                        <ul>
                            <li>Nom : <span>${teddy.name}</span></li>
                            <li>Description : <span>${teddy.description}</span></li>
                            <form>
                                <label for="color-product"></label>
                                <select name="color-product" id="color-product">
                                    <option value="couleur">${teddy.colors}</option>
                                </select>
                            <li>Prix : <span>${teddy.price /100} €</span></li>
                        </ul>
                        <button id="btn-send" type="submit" name="btn-send">Ajouter au panier</button>
                    </div>
                </div>
                `
    ;
};

showTeddy();