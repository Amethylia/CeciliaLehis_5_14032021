//déclaration variable avec key et values
let productLocalStorage = JSON.parse(localStorage.getItem("product"));

//affichage produits
    const positionElement = document.getElementById('container-product-panier');

    //vérification présence articles dans le panier
    if(productLocalStorage === null) {
        const emptyPanier = `
        <div class="container-empty-panier">
            <div>Le panier est vide.</div>
        </div>
        `;
        positionElement.innerHTML = emptyPanier;
    } else {
        let productPanierStructure = [];
        let total = 0;
        for(var i = 0; i < productLocalStorage.length ; i++) {

            productPanierStructure = productPanierStructure + `
            <div id="container-product-panier">
                <div class="product-panier">
                    <h2 class="product-name">${productLocalStorage[i].Nom}</h2>
                    <h2 class="product-color">${productLocalStorage[i].Couleur}</h2>
                    <h2 class="product-price" id="product-price">${productLocalStorage[i].Prix}</h2>
                </div>
            </div>

            `;
            
            //total panier
            var prix = productLocalStorage[i].Prix;
            prix = prix.replace('€', '');
            total += Number(prix);

            if(i == productLocalStorage.length - 1){
                positionElement.innerHTML = productPanierStructure;
            }
        }
        
        //affichage total panier
        document.getElementById("price").innerHTML = "Total : " + total + ' €';
    }

//gestion du formulaire
//afficher le formulaire
const showForm = () => {

    const btnSendForm = document.getElementById('sendForm');

    btnSendForm.addEventListener("click", (event) => {
        event.preventDefault();
    
        const postData = {
            contact: {},
            products: []
        }

        //récupération des valeurs du formulaire
        let firstNameForm = document.getElementById('firstName').value;
        let lastNameForm  = document.getElementById('lastName').value;
        let adressForm = document.getElementById('adress').value;
        let cityForm = document.getElementById('city').value;
        let emailForm = document.getElementById('email').value;

        postData.contact = {
            fisrtName: firstNameForm,
            lastName: lastNameForm,
            adress: adressForm,
            city: cityForm,
            email: emailForm
        };
    
        //for (element of productLocalStorage) {
            //postData.products.push(element.Teddy_id);
            
          //}
          postData.products = [
              "5be9c8541c9d440000665243",
              "5be9c8541c9d440000665243",
              "5be9c8541c9d440000665243"
          ]
          console.log(postData.products)
          console.log(postData)


        //début validation avant l'envoi des données au serveur
        const regExNameCity = (value) => {
            return /^[A-Za-z]{3,10}$/.test(value);
        }

        const regExAdress = (value) => {
            return /^[0-9A-Za-z\s]{5,40}$/.test(value);
        }

        const regExEmail = (value) => {
            return /^[\w\.-]+@[\w\.-]+\.\w{2,4}$/.test(value);
        }

        //prénom
        function firstNameControl() {
            const firstName = firstNameForm;
            if (regExNameCity(firstName)) {
                return true;
            } else {
                return false;
            }
        };
        
        //nom
        function lastNameControl() {
            const lastName = lastNameForm;
            if (regExNameCity(lastName)) {
                return true;
            } else {
                return false;
            }
        };

        //adresse
        function adressControl() {
            const adress = adressForm;
            if (regExAdress(adress)) {
                return true;
            } else {
                return false;
            }
        };

        //city
        function cityControl() {
            const city = cityForm;
            if (regExNameCity(city)) {
                return true;
            } else {
                return false;
            }
        };

        //email
        function emailControl() {
            const email = emailForm;
            if (regExEmail(email)) {
                return true;
            } else {
                return false;
            }
        };

        if (firstNameControl() && lastNameControl() && adressControl() && cityControl() && emailControl()) {
            //mettre l'object "postData.contact" dans le local storage
            localStorage.setItem("contact", JSON.stringify(postData.contact));
        } else {
        }
        //fin validation avant l'envoi des données au serveur

        //envoyer "postData" au serveur
        fetch('http://localhost:3000/api/teddies/order', {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
    })
};

showForm();

