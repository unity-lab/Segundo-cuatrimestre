
from app.database.config_db import DB_ConexionMysql as conexion
import mysql.connector


class Manejar_tablas:
    def __init__(self):
        # Instancia la clase de conexión para usarla en los métodos
        self.db_manager = conexion()
        self.exito = True

    def verificar_tabla_consultas_clientes(self, tabla="inquietudes"):
        try:
            # Ahora usamos los métodos de la clase DB_Conexionmysql
            conexion = self.db_manager.get_connection()
            if not conexion or not conexion.is_connected():
                print("No se estableció conexión con la DB.")
                return False

            cursor = self.db_manager.get_cursor()
            
            # preparo la consulta de creacion de tabla
            estructura_tabla = f""" CREATE TABLE IF NOT EXISTS {tabla} (
                id INT AUTO_INCREMENT PRIMARY KEY, 
                email VARCHAR(100) NOT NULL,
                consulta VARCHAR(255) NOT NULL, 
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP); """
            
            # Asegúrate de usar el cursor y la conexión devueltos
            cursor.execute(estructura_tabla)
            conexion.commit()
            
            print(f"Verificación de la tabla '{tabla}' completada. La tabla está lista.")
            return True
            
        except mysql.connector.Error as err:
            print(f"Error al verificar/crear la tabla '{tabla}': {err}")
            return False
            
        finally:
            # cerrar si o si la consulta
            self.db_manager.close()     

    def verificar_tabla_usuarios(self, tabla="usuarios_login"):
        try:
            # Ahora usamos los métodos de la clase DB_Conexionmysql
            conexion = self.db_manager.get_connection()
            if not conexion or not conexion.is_connected():
                print("No se estableció conexión con la DB.")
                return False

            cursor = self.db_manager.get_cursor()
            
            # preparo la consulta de creacion de tabla
            estructura_tabla = f""" CREATE TABLE IF NOT EXISTS {tabla} (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(50) NOT NULL,
                    apellido VARCHAR(50) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, telefono VARCHAR(20),
                    rol ENUM('estandar', 'admin') DEFAULT 'estandar' NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP); """
            
            # Asegúrate de usar el cursor y la conexión devueltos
            cursor.execute(estructura_tabla)
            conexion.commit()
            
            print(f"Verificación de la tabla '{tabla}' completada. La tabla está lista.")
            return True
            
        except mysql.connector.Error as err:
            print(f"Error al verificar/crear la tabla '{tabla}': {err}")
            return False
            
        finally:
            # cerrar si o si la consulta
            self.db_manager.close()  

    def script_tablas(self):
        try:
            # Ahora usamos los métodos de la clase DB_Conexionmysql
            conexion = self.db_manager.get_connection()
            if not conexion or not conexion.is_connected():
                print("No se estableció conexión con la DB.")
                return False

            cursor = self.db_manager.get_cursor()
            inquietudes = "inquietudes"
            estructura_tabla = f""" CREATE TABLE IF NOT EXISTS {inquietudes} (
                id INT AUTO_INCREMENT PRIMARY KEY, 
                email VARCHAR(100) NOT NULL,
                consulta VARCHAR(255) NOT NULL, 
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP); """
            cursor.execute(estructura_tabla)
            conexion.commit()            
            print(f"Verificación de la tabla '{inquietudes}' completada. La tabla está lista.")        
            
            usuarios_login = "usuarios_login"
            estructura_tabla = f""" CREATE TABLE IF NOT EXISTS {usuarios_login} (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(50) NOT NULL,
                    apellido VARCHAR(50) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, telefono VARCHAR(50),
                    rol ENUM('estandar', 'admin') DEFAULT 'estandar' NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP); """
            cursor.execute(estructura_tabla)
            conexion.commit()            
            print(f"Verificación de la tabla '{usuarios_login}' completada. La tabla está lista.")
            
            categorias = "categorias"
            estructura_tabla = f""" CREATE TABLE categorias (
                                    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
                                    nombre_categoria VARCHAR(50) NOT NULL
                                );"""
            cursor.execute(estructura_tabla)
            conexion.commit()            
            print(f"Verificación de la tabla '{categorias}' completada. La tabla está lista.")

            productos = "productos"
            estructura_tabla = f"""CREATE TABLE productos (
                                id_producto INT PRIMARY KEY AUTO_INCREMENT,
                                nombre VARCHAR(100) NOT NULL,
                                precio DECIMAL(10,2) NOT NULL,
                                stock INT NOT NULL,
                                id_categoria INT,
                                FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
                            );"""
            cursor.execute(estructura_tabla)
            conexion.commit()            
            print(f"Verificación de la tabla '{productos}' completada. La tabla está lista.")
            return True
            
        except mysql.connector.Error as err:
            print(f"Error al verificar/crear la tabla con el error: {err}")
            self.exito = False
            
        finally:
            # cerrar si o si la consulta
            self.db_manager.close()        

              