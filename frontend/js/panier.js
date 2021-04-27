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
            <p class="col-4 product-name">${productLocalStorage[i].Nom}</p>
            <p class="col-4 product-color">${productLocalStorage[i].Couleur}</p>
            <p class="col-4 product-price" id="product-price">${productLocalStorage[i].Prix}</p>
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
    
        const postData = {
            contact: {},
            products: []
        }

        //récupération des valeurs du formulaire
        let firstNameForm = document.getElementById('firstName').value;
        let lastNameForm  = document.getElementById('lastName').value;
        let addressForm = document.getElementById('address').value;
        let cityForm = document.getElementById('city').value;
        let emailForm = document.getElementById('email').value;

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
        function dataEmptyField(getElementById) {
            document.getElementById(`${getElementById}`).textContent = "Champ obligatoire !";
        };

        //fonction control
        //prénom
        function firstNameControl() {
            const firstName = firstNameForm;
            if (regExNameCity(firstName)) {
                return true;
            } else {
                dataEmptyField("EmptyFirstName");
                return false;
            }
        };
        
        //nom
        function lastNameControl() {
            const lastName = lastNameForm;
            if (regExNameCity(lastName)) {
                return true;
            } else {
                dataEmptyField("EmptyLastName");
                return false;
            }
        };

        //adresse
        function addressControl() {
            const address = addressForm;
            if (regExAddress(address)) {
                return true;
            } else {
                dataEmptyField("EmptyAddress");
                return false;
            }
        };

        //city
        function cityControl() {
            const city = cityForm;
            if (regExNameCity(city)) {
                return true;
            } else {
                dataEmptyField("EmptyCity");
                return false;
            }
        };

        //email
        function emailControl() {
            const email = emailForm;
            if (regExEmail(email)) {
                return true;
            } else {
                dataEmptyField("EmptyEmail");
                return false;
            }
        };

        if (firstNameControl() && lastNameControl() && addressControl() && cityControl() && emailControl()) {
            //mettre l'object "postData.contact" dans le local storage
            localStorage.setItem("contact", JSON.stringify(postData.contact));
        } else {
        }
        //fin validation avant l'envoi des données au serveur

        // //envoyer "postData" au serveur
        // fetch('http://localhost:3000/api/teddies/order', {
        //     method: "POST",
        //     body: JSON.stringify(postData),
        //     headers: {"Content-type": "application/json; charset=UTF-8"}
        // })
        // .then(res => res.json())
        // .then(function(json) {
        //     console.log(json);
        //     localStorage.setItem("orderId", JSON.stringify(json.orderId));
        //     //redirection sur la page commande
        //     window.location.href = "./commande.html";
        // })
        // .catch(err => console.log(err));
        
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

        //vider localstorage product
        window.localStorage.removeItem('product');
    })
};

showForm();

