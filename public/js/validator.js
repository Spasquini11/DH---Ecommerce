window.onload = function(){

    
    let form = document.querySelector('.form')
    

    
    form.firstName.focus();

    form.addEventListener('submit', (e) =>{

        let errors = [];

        let firstName = document.querySelector('#firstName');
        let lastName = document.querySelector('#lastName');
        let email = document.querySelector('#email');
        let password = document.querySelector('#password');
        let repassword = document.querySelector('#repassword');
        let image = document.querySelector('#image');

        
        if (firstName.value == '' || firstName.value.length < 3) {
            errors.push('El campo Nombre no puede estar vacío y debe contener mas de 2 caracteres');
            firstName.classList.add('is-invalid');
        } else{
            firstName.classList.add('is-valid');
            firstName.classList.remove('is-invalid');
            form.lastName.focus();
        };
    
        if (lastName.value == '' || lastName.value.length < 3) {
            errors.push('El campo Apellido no puede estar vacío y debe contener mas de 2 caracteres');
            lastName.classList.add('is-invalid');
        } else{
            lastName.classList.add('is-valid');
            lastName.classList.remove('is-invalid');
            form.email.focus();
        };

        

        let re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
        if(!re.exec(email.value)){
            errors.push('El campo email ingresado no es válido');
        }
        else {
            email.classList.add('is-valid');
            email.classList.remove('is-invalid');
            form.password.focus()

        };

        

        if (password.value == '' || password.value.length < 8) {
            errors.push('El campo password no puede estar vacío y debe contener al menos 8 caracteres');
            password.classList.add('is-invalid');
        } else {
            
            var erPass=/[a-zA-Z]+/g
            if(!rePass.exec(password.value)){
                errors.push('El password ingresado no es válido, debes ingresar May y Min ...')
            }
            else {
            password.classList.add('is-valid');
            password.classList.remove('is-invalid');
            form.repassword.focus();
            }
        };

        
        let extensions = /(.jpg|.gif|.jpeg|.png)$/i;
        let archivoRuta = image.value
        console.log(extensions, archivoRuta)

        if(image.value == '' || !extensions.exec(archivoRuta)) {
            errors.push('Debes cargar una imagen con extensión .jpg, .jpeg, .gif o .png');
            image.classList.add('is-invalid');
        } else{
            image.classList.add('is-valid');
            image.classList.remove('is-invalid');                
        }                    


        if (errors.length > 0 ){
        e.preventDefault();
        
        let ulErrors = document.querySelector('.errores');
        ulErrors.classList.add('alert-warning');
        ulErrors.innerHTML = '';
        
        for(let i= 0; i < errors.length; i++){
            ulErrors.innerHTML += `<li> ${errors[i]}  </li>`;
        };

        } else {
            alert('Validación exitosa');
            form.submit();
        }   
    });
}