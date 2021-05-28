//déclaration variable avec key et values
let productLocalStorage = JSON.parse(localStorage.getItem("product"));

//affichage produits
const positionElement = document.getElementById('container-product-panier');

//vérification présence articles dans le panier
if(productLocalStorage === null) {
    const emptyPanier = `
        <div class="empty-panier">Le panier est vide.</div>
    `;
    positionElement.innerHTML = emptyPanier;
} else {
    let productPanierStructure = [];
    let total = 0;
    for(var i = 0; i < productLocalStorage.length ; i++) {

        productPanierStructure = productPanierStructure + `
            <span class="col-4 mb-1 product-name">${productLocalStorage[i].Nom}</span>
            <span class="col-4 mb-1 product-color">${productLocalStorage[i].Couleur}</span>
            <span class="col-4 mb-1 product-price" id="product-price">${productLocalStorage[i].Prix}</span>
        `;
        
        //total panier
        var prix = productLocalStorage[i].Prix;
        prix = prix.replace('€', '');
        total += Number(prix);

        if(i == productLocalStorage.length - 1){
            positionElement.innerHTML = productPanierStructure;
        }
    }
    localStorage.setItem("totalPrice", JSON.stringify(total));
    //affichage total panier
    document.getElementById("totalPrice").innerHTML = total + ' €';
}

//gestion du formulaire
const showForm = () => {

    const btnSendForm = document.getElementById('sendForm');

    btnSendForm.addEventListener("click", (event) => {
        event.preventDefault();

        //récupération des valeurs du formulaire
        let firstNameForm = document.getElementById('firstName').value;
        let lastNameForm  = document.getElementById('lastName').value;
        let addressForm = document.getElementById('address').value;
        let cityForm = document.getElementById('city').value;
        let emailForm = document.getElementById('email').value;

        //contact & products dans un objet pour l'envoyer ensuite au serveur
        const postData = {
            contact: {},
            products: []
        }

        postData.contact = {
            firstName: firstNameForm,
            lastName: lastNameForm,
            address: addressForm,
            city: cityForm,
            email: emailForm
        }
    
        for (element of productLocalStorage) {
            postData.products.push(element.Teddy_id);
          }

        //début validation avant l'envoi des données au serveur
        //regEx
        const regExNameCity = (value) => {
            return /^[A-Za-z]{3,10}$/.test(value);
        }

        const regExAddress = (value) => {
            return /^[0-9A-Za-z\s]{5,40}$/.test(value);
        }

        const regExEmail = (value) => {
            return /^[\w\.-]+@[\w\.-]+\.\w{2,4}$/.test(value);
        }

        //fonction avertissement
        function EmptyFieldEmptyText(getElementById) {
            return document.getElementById(getElementById).textContent = "";
        };

        function EmptyFieldText(getElementById) {
            return document.getElementById(getElementById).textContent = "Champ obligatoire !";
        };

        //fonction control
        //nom
        function lastNameControl() {
            const lastName = lastNameForm;
            if (regExNameCity(lastName)) {
                EmptyFieldEmptyText("EmptyLastName");
                return true;
            } else {
                EmptyFieldText("EmptyLastName");
                return false;
            }
        };

        //prénom
        function firstNameControl() {
            const firstName = firstNameForm;
            if (regExNameCity(firstName)) {
                EmptyFieldEmptyText("EmptyFirstName");
                return true;
            } else {
                EmptyFieldText("EmptyFirstName");
                return false;
            }
        };
        
        //adresse
        function addressControl() {
            const address = addressForm;
            if (regExAddress(address)) {
                EmptyFieldEmptyText("EmptyAddress");
                return true;
            } else {
                EmptyFieldText("EmptyAddress");
                return false;
            }
        };

        //city
        function cityControl() {
            const city = cityForm;
            if (regExNameCity(city)) {
                EmptyFieldEmptyText("EmptyCity");
                return true;
            } else {
                EmptyFieldText("EmptyCity");
                return false;
            }
        };

        //email
        function emailControl() {
            const email = emailForm;
            if (regExEmail(email)) {
                EmptyFieldEmptyText("EmptyEmail");
                return true;
            } else {
                EmptyFieldText("EmptyEmail");
                return false;
            }
        };

        if (lastNameControl() && firstNameControl() && addressControl() && cityControl() && emailControl()) {
            //mettre l'object "postData.contact" dans le local storage
            localStorage.setItem("contact", JSON.stringify(postData.contact));

            //envoyer "postData" au serveur
            const sendHttpRequest = (method, url) => {
                const promise = new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open(method, url);
                    xhr.responseType = 'json';
                    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
                    xhr.onload = () => {
                        resolve(xhr.response);
                    };
                    xhr.onerror = () => {
                        reject('error');
                    };
                    xhr.send(JSON.stringify(postData));
                });
              return promise;
            };
    
            const sendData = () => {
                sendHttpRequest('POST', 'http://localhost:3000/api/teddies/order')
                .then(responseData => {
                    console.log(responseData);
                    localStorage.setItem("orderId", JSON.stringify(responseData.orderId));
                        //redirection sur la page commande
                        window.location.href = "./commande.html";
                })
                .catch(err => {
                    console.log(err);
                });
            };
            sendData();
        } else {
            alert("Veuillez bien remplir le formulaire !");
        }
        //fin validation avant l'envoi des données au serveur

        //vider localstorage product
        window.localStorage.removeItem('product');
    })
};

showForm();