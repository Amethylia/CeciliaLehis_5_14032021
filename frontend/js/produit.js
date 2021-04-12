//récupération de la chaîne de requête dans l'URL
const queryString_url_id = window.location.search;

//extraction de l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("productId");

//afficher le produit via l'id 
let teddy;
let fetchTeddy = async() => {
    teddy = await fetch(
        'http://localhost:3000/api/teddies/'+id).then(res => 
        res.json());
}

const results = document.getElementById('container-product');

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
                                <select name="color-product" id="color-product"></select>
                            </form>
                            <li>Prix : <span>${teddy.price /100} €</span></li>
                        </ul>
                        <button class="popup" id="btn-send" type="submit" name="btn-send">
                            Ajouter au panier
                        </button> 
                        <div id="windowPopup-container">
                            <div id="myPopUp"> ${teddy.name} a bien été ajouté au panier.
                            <button class="close" id="close">x</button></div>
                        </div>
                    </div>
                </div>
                `
    ;

    //choix des couleurs
    let selectColor = document.getElementById('color-product');
    let option = '';

    teddy.colors.forEach(element => {
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
            Nom : teddy.name,
            Teddy_id : teddy._id,
            Description : teddy.description,
            Couleur : choiceForm,
            Prix : teddy.price /100 + '€'
        }; 

        //stocker la récupération des valeurs dans le local storage
        //déclaration variable avec key et values
        let productLocalStorage = JSON.parse(localStorage.getItem("product"));

        //fonction additionLocalStorage
        const additionLocalStorage = () => {
            productLocalStorage.push(optionsProduct);
            localStorage.setItem("product", JSON.stringify(productLocalStorage));
        }

        //vérification présence de produits dans le local storage
        if(productLocalStorage){
            additionLocalStorage();
        }
        else{
            productLocalStorage = [];
            additionLocalStorage();
        }

        //popup
        const popUpShow = document.getElementById("windowPopup-container");
        popUpShow.classList.add("active");
    })

    //gestion popUpClose
    const popUpHide = document.getElementById('close');
    const popUpShow = document.getElementById("windowPopup-container");

    popUpHide.addEventListener("click", (event) => {
        event.preventDefault();

        popUpShow.classList.remove("active");
    })
};

showTeddy();


