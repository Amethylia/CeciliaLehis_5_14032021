//récupération de la chaîne de requête dans l'URL
const queryString_url_id = window.location.search;

//extraction de l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("productId");
if(!id) {
     //redirection sur la page d'accueil
     window.location.href = "./index.html";
}else {
    //afficher le produit via l'id

const results = document.getElementById('container-product');
const modalPanier = document.getElementById('modal-body');
    
fetch('http://localhost:3000/api/teddies/'+id)
.then(res => res.json()
)
.then((data) => {
    results.innerHTML =
                    `
                    <div class="container page-product">
                        <div class="row align-items-center">
                            <div class="col-12 col-lg-8 mt-4 mt-lg-0 p-4 p-lg-5">
                                <img class="picture-product" src="${data.imageUrl}" alt="image ours"/>
                            </div>
                            <div class="col-12 col-lg-4 px-4 pb-5 p-lg-5 product">
                                    <h2 class="name-product">${data.name}</h2>
                                <p class="description-product">${data.description}</p>
                                <div class="wrapper-colors-price">
                                    <div class="price-product">${data.price /100} €</div>
                                    <form class="colors">
                                        <label for="color-product"></label>
                                        <select name="color-product" id="color-product"></select>
                                    </form>   
                                </div>
                                <button type="submit" id="btn-send" class="button" data-toggle="modal" data-target="#modalPanier">
                                    Ajouter au panier
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    `
    ;

    modalPanier.innerHTML =
        `
            ${data.name} a bien été ajouté au panier.
        `
    ;
    
    //choix des couleurs
    let selectColor = document.getElementById('color-product');
    let option = '';

    data.colors.forEach(element => {
        option = document.createElement('option');
        selectColor.appendChild(option); 
        option.textContent = element;
        option.setAttribute('value',element);
    });

    //gestion du panier
    const btnSendPanier = document.getElementById('btn-send');

    btnSendPanier.addEventListener("click", (event) => {
        event.preventDefault();
    
        //choix de la couleur par l'utilisateur
        const choiceForm = selectColor.value;
    
        //récupération des valeurs de l'ours
        let optionsProduct = {
            Nom : data.name,
            Teddy_id : data._id,
            Description : data.description,
            Couleur : choiceForm,
            Prix : data.price /100 + '€'
        }; 
    
        //stocker la récupération des valeurs dans le local storage
        //déclaration variable avec key et values
        let productLocalStorage = JSON.parse(localStorage.getItem("product"));
    
        //fonction additionLocalStorage
        const additionLocalStorage = () => {
            productLocalStorage.push(optionsProduct);
            localStorage.setItem("product", JSON.stringify(productLocalStorage));
        }
    
        //vérification présence de produits dans le localStorage
        if(productLocalStorage){
            additionLocalStorage();
        }
        else{
            productLocalStorage = [];
            additionLocalStorage();
        }
    });
})
.catch(err => {console.log(err);
});
}