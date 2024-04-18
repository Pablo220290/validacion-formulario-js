const firebaseConfig = {
    apiKey: "AIzaSyDKKhd5ZuQgMJaLCfQjny_y1cavLROjj8I",
    authDomain: "datos-de-formulario-35253.firebaseapp.com",
    projectId: "datos-de-formulario-35253",
    storageBucket: "datos-de-formulario-35253.appspot.com",
    messagingSenderId: "435490771766",
    appId: "1:435490771766:web:74e601c8ad6d4e2e30d997",
    measurementId: "G-VV7VC89H8H"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) =>{
    event.preventDefault()

    //Validar campo nombre
    let entradanombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradanombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introducí tu nombre'
        errorNombre.classList.add('error-mesage')
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    //Validar correo
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introducí un email válido'
        emailError.classList.add('error-message')
    }else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    //Validar contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById ('passwordError')
    let contrasenaPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/; 
    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, debe tener al menos un número, debe tener al menos un caracter especial'
        contrasenaError.classList.add('error-message')
    }else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    //Si todos los campos son validos, enviar el formulario
    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
        
        //BACKEND QUE RECIBA LA INFORMACION

        db.collection("users").add({
            nombre: entradanombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con éxito', docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error)
        })

    }
})