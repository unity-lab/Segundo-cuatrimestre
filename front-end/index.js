/* a continuacion se desarrollan las arrow funciones para validar distintos formularios */

// esta funcion es un fetch que controla el funcioamiento del envio de datos a la api de prueba "https://formsubmit.co/"
const reutilizarFetch = (urlDestino, contenido) => {
    let operacion = true
     fetch(urlDestino, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        },
        // Convertir el objeto JavaScript a una cadena JSON
        body: JSON.stringify(contenido) 
    })
    .then(response => {        
        if (response.ok) {
            console.log('El formulario se ha enviado correctamente.');
            operacion = response.ok
        } else {
            console.log('Hubo un error al enviar el formulario.');
            operacion = response.ok
        }
        return operacion
    })
    .catch(error => {
        console.log(`No se pudo contactar con el servidor de la api. ${error}`);
        return false
    });
    return operacion;
}
//validar cada uno de los campos de registro del nuevo usuario
const validarRegistro = (event) => {
    // coloco un prevent default para evitar que se envie el formulario
    event.preventDefault();
    let esValido = true;
    /*Obtener los valores o values (propiedad especifica) de los campos,
    se le aplica el metodo trim, para remover espacios antes y despues del string
    */
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const email = document.getElementById('email').value.trim();
    const fechaNacimiento = document.getElementById('fecha_nacimiento').value;
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('repassword').value;    
    // VALIDACION DE NOMBRE(min y max del string)
    if (nombre.length < 3){
        Swal.fire({
                title: '¡Aviso de NOMBRE invalido!',
                text: 'coloque un NOMBRE mayor a 2 caracteres.',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
        esValido = false;
    }
    if (nombre.length > 30){
        Swal.fire({
                title: '¡Aviso de NOMBRE invalido!',
                text: 'coloque un NOMBRE menor a 30 caracteres.',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
        esValido = false;
    }
    // VALIDACION DE APELLIDO (min y max del string)
    if (apellido.length < 2){
        Swal.fire({
                title: '¡Aviso de APELLIDO invalido!',
                text: 'coloque un APELLIDO como minimo de 2 caracteres.',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
        esValido = false;
    }
    if (apellido.length > 30){
        Swal.fire({
                title: '¡Aviso de APELLIDO invalido!',
                text: 'coloque un APELLIDO menor de 30 caracteres.',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
        esValido = false;
    } 
    // validacion del largo del dni (es un number)
    if (dni < 1000000 || dni > 200000000 || isNaN(dni)) {
        Swal.fire({
                title: '¡Aviso de DNI invalido!',
                text: 'coloque un DNI entre 1 millon y 200 millones.',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
        esValido = false;
    }
    //Validar Email (Formato) con expresion regular
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        Swal.fire({
                title: '¡Aviso de Email invalido!',
                text: 'coloque un email valido',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
        esValido = false;
    }
    //Validar Contraseña (Longitud y Coincidencia)
    if (password.length < 8) {
        Swal.fire({
                title: '¡Aviso de password invalido!',
                text: 'coloque un password de al menos 8 digitos',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
        esValido = false;
    }
    if (password !== repassword) {
        Swal.fire({
                title: '¡Aviso de passwords!',
                text: 'las contraseñas no coinciden.',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
        esValido = false;
    }
    // Validar Fecha de Nacimiento    
    if (fechaNacimiento) {
        const fechaIngresada = new Date(fechaNacimiento);
        // valida que la fecha ingresada no sea posterior al dia de la fecha
        const hoy = new Date();
        if (fechaIngresada > hoy) {
            Swal.fire({
                title: '¡Aviso de fecha invalido!',
                text: 'coloque una fecha anterior al dia actual',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
            esValido = false;
        }
    } else {
        // cuando el formato de fecha no es valido
        Swal.fire({
                title: '¡Aviso de fecha de nacimiento vacia!',
                text: 'coloque una fecha valida.',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
        esValido = false;
    }
    if (esValido == true) {      
            Swal.fire({
                title: '¡Registro Completado!',
                text: 'aguarde por favor.',
                icon: 'success',
                confirmButtonText: 'continuar'});
        // establezco 4 segundos antes que me redirija con setTimeout
        setTimeout(()=>{window.location.replace('login.html')}, 4000);        
    }
        }
// funcion flecha para validar login
const validarLogin = (e) =>{
    // coloco un prevent default para evitar que se envie el formulario
    e.preventDefault();    
    let esValido = true;
    /*Obtener los valores o values (propiedad especifica) de los campos, se le aplica el metodo trim, para remover espacios antes y 
    despues del string  */
    const emailUsuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value.trim();
    sessionStorage.setItem('usuario', emailUsuario)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailUsuario.length < 10){
        Swal.fire({
                title: '¡Aviso de email invalido!',
                text: 'coloque un email mayor a 10 caracteres.',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
        esValido = false;
    }
    // Validar el usuario que coincide con su Email (Formato) con expresion regular y sea superior a 5 digitos
    if (!emailPattern.test(emailUsuario)) {
        Swal.fire({
                title: '¡Aviso de Usuario invalido!',
                text: 'coloque un email de usuario valido.',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
        esValido = false;
    }
    // validar un email de usuario menor a 100 digitos    
    if (emailUsuario.length > 100){        
        Swal.fire({
                title: '¡Aviso de Email!',
                text: 'coloque un email menos extenso.',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
        esValido = false;
    }
    
    //Validar Contraseña (Longitud y Coincidencia) por el minimo de 8 caracteres del string
    if (password.length < 8) {
         Swal.fire({
                title: '¡Aviso de password!',
                text: 'coloque una contraseña valida al menos con 8 digitos.',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
        esValido = false; }            

    if (esValido) {                              
        Swal.fire({
                title: '¡Login Completado!',
                text: 'aguarde por favor.',
                icon: 'success',
                confirmButtonText: 'continuar'});                
                // establezco 4 segundos antes que me redirija con setTimeout
                setTimeout(()=>{window.location.replace('redireccion.html')}, 4000);
                
        }
}
// funcion flecha para validar el envio de consultas de potenciales clientes
const validarConsulta = (event) => {
    // coloco un prevent default para evitar que se envie el formulario
    event.preventDefault();
    /* Obtener los valores o values (propiedad especifica) de los campos, se le aplica el metodo trim, para remover espacios antes y 
    despues del string  */     
    const consulta = {
        email : document.getElementById('exampleFormControlInput1').value.trim(),
        infoConsulta : document.getElementById('exampleFormControlTextarea1').value.trim(),
    }       
    let esValido = true
    //Validar el Email remitente(Formato) con expresion regular
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!expresion.test(consulta.email)) {
        Swal.fire({
                title: '¡Aviso de email invalido!',
                text: 'coloque un email valido',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
        esValido = false;
    }

    //Validar Contraseña (Longitud y Coincidencia) por el minimo de 8 caracteres del string
    if (consulta.infoConsulta.length < 50 || consulta.infoConsulta.length > 250) {
        Swal.fire({
                title: '¡Consulta Invalida!',
                text: 'coloque una consulta con un cuerpo entre 50 y 250 caracteres.',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
        esValido = false;
    }
    //si paso a este punto es que todos los inputs son en principios validos
    if (esValido) {
        // declaro la variable para la url de la api
        const urlconEmail = `https://formsubmit.co/ajax/${consulta.email}`;
        //BLOQUE DE IMPLEMENTACION DE SMTP, adentro de este if ya todos los inputs son VALIDOS
        esValido = reutilizarFetch(urlconEmail, consulta)
        console.log(`el valor devuelto del fetch es: ${esValido}`)
        if(!esValido){
             Swal.fire({
                title: '¡Fallo la operacion!',
                text: 'reintente mas tarde.',
                icon: 'error',
                confirmButtonText: 'continuar'});
        } 
        if(esValido){
        // este bloque se ejecuta si el metodo fetch tuvo exito o no con la url de prueba
         Swal.fire({
                title: '¡Consulta Completada!',
                text: 'aguarde por favor.',
                icon: 'success',
                confirmButtonText: 'continuar'}); 
        }                     
    }
    if (esValido){
        // voy a redireccionar a galeria de fotos luego de 4 segundos
        setTimeout(()=>{window.location.replace('galeria.html')}, 4000);
    }
}

// jugando con el dom y la carga de variables de sessionStorage
// esta funcion se ejecuta con el evento onload del html, no es llamado por ningun submit o button onclick
window.onload = () => {
    const emailGuardado = sessionStorage.getItem('usuario'); // recupero el mail de la sesion local
    let idBienvenido = document.getElementById('bienvenido'); // tomo el elemento con este id

    if (emailGuardado && idBienvenido) {
        idBienvenido.textContent = `¡Bienvenido/a, ${emailGuardado}!`;        
        // Eliminar la variable después de usarla
        sessionStorage.removeItem('usuario');
    }
    if (idBienvenido && emailGuardado == null || emailGuardado == ""){
        idBienvenido.textContent = "Bienvenido/a. Por favor, inicie sesión.";
    }
}



/*preparando desarrollo de footer*/