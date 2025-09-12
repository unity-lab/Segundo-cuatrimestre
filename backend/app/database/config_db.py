# este modulo contiene la clase que setea las configuracion de conexion a la database
import mysql.connector , os
from mysql.connector import Error
from dotenv import load_dotenv
load_dotenv()
class DB_ConexionMysql:
    def __init__(self):
        self.connection = None
        self.cursor = None
        self.host = os.getenv("HOST")
        self.database = os.getenv("DATABASE")
        self.user = os.getenv("MYSQLUSER")
        self.password = os.getenv("MYSQLPASSWORD")
        self.root_password = os.getenv("MYSQL_ROOT_PASSWORD")
        self.connect()

    def connect(self):
        """ Establece la conexión a la base de datos."""
        try:
            self.connection = mysql.connector.connect(
                host=self.host,
                database=self.database,
                user=self.user,
                password=self.password
            )
            # Permite que las consultas devuelvan diccionarios en lugar de tuplas
            self.cursor = self.connection.cursor(dictionary=True)
            print("Conexión a la DB establecida correctamente.")
        except Error as e:
            print(f"Error al conectar a MySQL: {e}")

    def get_connection(self):
        """ Devuelve el objeto de conexión. """
        return self.connection

    def get_cursor(self):
        """ Devuelve el objeto cursor."""
        return self.cursor

    def close(self):
        """ Cierra el cursor y la conexión. Debe ser llamado explícitamente por la clase que usa la conexión."""
        if self.cursor:
            self.cursor.close()
        if self.connection and self.connection.is_connected():
            self.connection.close()
            print("Conexión a la DB cerrada.")
 