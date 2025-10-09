/* a continuacion se desarrollan las arrow funciones para validar distintos formularios */
// esta funcion unicamente
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

    /*Obtener los valores o values (propiedad especifica) de los campos,
    se le aplica el metodo trim, para remover espacios antes y despues del string
    */
    const emailUsuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value.trim();
       
    
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
    let esValido = true;

    /*Obtener los valores o values (propiedad especifica) de los campos,
    se le aplica el metodo trim, para remover espacios antes y despues del string
    */
    const emailRemitente = document.getElementById('exampleFormControlInput1').value.trim();
    const consulta = document.getElementById('exampleFormControlTextarea1').value.trim();
       
    
    //Validar el Email remitente(Formato) con expresion regular
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!expresion.test(emailRemitente)) {
        Swal.fire({
                title: '¡Aviso de email invalido!',
                text: 'coloque un email valido',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
        esValido = false;
    }

    //Validar Contraseña (Longitud y Coincidencia) por el minimo de 8 caracteres del string
    if (consulta.length < 50 || consulta.length > 250) {
        Swal.fire({
                title: '¡Consulta Invalida!',
                text: 'coloque una consulta con un cuerpo entre 50 y 250 caracteres.',
                icon: 'warning',
                confirmButtonText: 'Reintentar'});
        esValido = false;
    }
    if (esValido == true) {
        Swal.fire({
                title: '¡Consulta Completada!',
                text: 'aguarde por favor.',
                icon: 'success',
                confirmButtonText: 'continuar'});
                // voy a redireccionar a galeria de fotos luego de 4 segundos
                setTimeout(()=>{window.location.replace('galeria.html')}, 4000);
                               
        }
}

