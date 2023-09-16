/*
<!--Validation HTML-->
<!--Par: William John Adam Trindade-->
<!--2023-09-11-->
*/
const form = document.getElementById('form');
const prenom = document.getElementById('prenom');
const nom = document.getElementById('nom');
const courriel = document.getElementById('courriel');
const telephone = document.getElementById('telephone');

const date_naissance = document.getElementById('date_naissance');
const adresse = document.getElementById('adresse');
const ville = document.getElementById('ville');
const etat_province = document.getElementById('etat_province');
const code_postal = document.getElementById('code_postal');


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhoneNumber(input_str) {
    const re2 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    return re2.test(input_str);
}

const validateInputs = () => {
    const prenomValue = prenom.value.trim();
    const nomValue = nom.value.trim();
    const courrielValue = courriel.value.trim();
    const telephoneValue = telephone.value.trim();

    const adresseValue = adresse.value.trim();
    const villeValue =  ville.value.trim();
    const etat_provinceValue =  etat_province.value.trim();
    const code_postalValue =  code_postal.value.trim();

    let noError = true;
    

    if(prenomValue === '') {
        setError(prenom, 'prénom requis');
        noError =false;
    } else {
        setSuccess(prenom);
    }

    if(nomValue === '') {
        setError(nom, 'nom requis');
        noError =false;
    } else {
        setSuccess(nom);
    }
    if(telephoneValue === '') {
        setError(telephone, 'Le téléphone est requis');
        noError =false;
    } else if (!validatePhoneNumber(telephoneValue)){
        setError(telephone , 'SVP mettez un téléphone valide');
        noError =false;
    } else {

        setSuccess(telephone)
    }

    if(courrielValue === '') {
        setError(courriel, 'Un courriel est requis');
        noError =false;
    } else if (!isValidEmail(courrielValue)) {
        setError(courriel, 'SVP mettez une adresse courriel valide');
        noError =false;
    } else {
        setSuccess(courriel);
    }


    if(adresseValue === '') {
        setError(adresse, 'Un adresse est requis');
        noError =false;
   
    } else {
        setSuccess(adresse);
    }
    
    if(villeValue === '') {
        setError(ville, 'Une ville est requis');
        noError =false;
   
    } else {
        setSuccess(ville);
    }
    if(etat_provinceValue === '') {
        setError(etat_province, 'Un état ou province est requis');
        noError =false;
   
    } else {
        setSuccess(etat_province);
    }
    if(code_postalValue === '') {
        setError(code_postal, 'Un code postal est requis');
        noError =false;
   
    } else {
        setSuccess(code_postal);
    }


    return noError;
};

