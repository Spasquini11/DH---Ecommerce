window.onload = function(){

   
    let form = document.querySelector('.form')
    

    
    form.name.focus();

    form.addEventListener('submit', (e) =>{

        let errors = [];

        let name = document.querySelector('#name');
        let description = document.querySelector('#description');
        let price = document.querySelector('#price');       
        let image1 = document.querySelector('#image1');

        
        if (name.value == '' || name.value.length < 7) {
            errors.push('El campo Nombre del Producto no puede estar vacío y debe contener más de 6 caracteres');
            name.classList.add('is-invalid');
        } else{
            name.classList.add('is-valid');
            name.classList.remove('is-invalid');
            form.description.focus();
        };
    
        
        if (description.value == '' || description.value.length < 16) {
            errors.push('El campo Descripción del Producto no puede estar vacío y debe contener mas de 15 caracteres');
            description.classList.add('is-invalid');
        } else{
            description.classList.add('is-valid');
            description.classList.remove('is-invalid');
            form.price.focus();
        };

        
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