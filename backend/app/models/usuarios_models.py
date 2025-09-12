# este modulo es para insertar nuevos usuarios o verificar los pre existentes
from app.database.config_db import DB_ConexionMysql as conexion
from pydantic import BaseModel
from typing import Optional


class NuevoUsuario(BaseModel):
    nombre: str
    apellido: str
    email: str
    contraseña: str
    telefono: Optional[str] = None

    def validar_usuario(self):
        error = "sin errores en la validacion de campos"
        if len(self.nombre) < 3 or len(self.nombre) > 30:
            error = f"campo recibido: el Nombre ingresado: '{self.nombre}' es inferior a 3 o superior a 30 caracteres"
            return False, error
        if len(self.apellido) < 2 or len(self.apellido) > 30:
            error = f"campo recibido: el apellido ingresado: '{self.apellido}' es inferior a 2 o superior a 30 caracteres"
            return False, error
        if len(self.email) < 6 or len(self.email) > 40:
            error = f"campo recibido: el email ingresado: '{self.email}' es inferior a 6 o superior a 40 caracteres"
            return False, error
        if len(self.contraseña) < 10 or len(self.contraseña) > 50:
            error = f"campo recibido: la contraseña ingresada es inferior a 10 o superior a 50 caracteres"
            return False, error
        return True, error

class ServiciosUsuario:
    # Esta Clase es para la lógica de negocio relacionada con usuarios. Maneja las operaciones C.R.U.D.
    def __init__(self):
        # Instancia la clase de conexión para usarla en los métodos
        self.db_manager = conexion()

    def registrar_usuario(self, usuario: NuevoUsuario ):        
        try:
            if not conexion:
                print("No se estableció conexión con la DB.")
                return False

            cursor = self.db_manager.get_cursor()
            
            # Verifica la existencia del usuario y email
            cursor.execute("SELECT 1 FROM usuarios_login WHERE email = %s", (usuario.email,))
            if cursor.fetchone():
            # si devuelve true es que encontro 1 resultado (usuario existente)
                return False, (f"El usuario o email: {usuario.email} ya existen.")
            # Inserta el nuevo usuario, si el return es false puedo insertar el nuevo usuario
            print(f"El usuario o email: {usuario.email} no existe y puede ser insertado.")
            # preparo consulta de insert usuario
            cursor.execute("INSERT INTO usuarios_login (nombre, apellido, email, password, telefono) VALUES (%s, %s, %s, %s, %s)",
               (usuario.nombre, usuario.apellido, usuario.email, usuario.contraseña, usuario.telefono))
            self.db_manager.connection.commit()           
            return True, f"Registro exitoso para el usuario: {usuario.email}"
        except Exception as e:            
            return False, print(f"""Error al insertar el usuario:{usuario.email}, 
            el Error es: {e}""")
        

    