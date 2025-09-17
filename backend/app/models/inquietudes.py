# este model o servicio solo tiene por tarea insertar las inquietudes de clientes en general

from app.database.config_db import DB_ConexionMysql as conexion

class ServiciosUsuario:
   
    def insertar_inquietudes(self, email, inquietud):
        try:
            with conexion:
                if not db:
                    return False                

                # Inserta inquietud
                query = "INSERT INTO inquietudes (email, consulta) VALUES (%s,%s)"
                conexion.cursor.execute(query, (email, inquietud))
                conexion.connection.commit()
                
                print(f"Registro exitoso para la consulta del cliente: {email}")
                return True
        except Exception as e:
            print(f"Error al insertar la consulta: {e}")
            return False

   
        try:
            with DB_ConexionMysql() as db:
                if not db:
                    return None

                query = "SELECT id_usuario, rol, usuario FROM usuarios_login WHERE email = %s AND password_usuario = %s"
                db.cursor.execute(query, (email, password))
                user_data = db.cursor.fetchone()
                
                if user_data:
                    return {
                        "id": user_data['id_usuario'],
                        "rol": user_data['rol'],
                        "usuario": user_data['usuario']
                    }
                else:
                    return None
        except Exception as e:
            print(f"Error al consultar usuario por email y password: {e}")
            return None