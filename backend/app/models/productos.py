from app.database.config_db import DB_ConexionMysql as conexion

class Producto:
    def __init__(self):
        self.db_manager = conexion()
    def ver_productos_join(self):        
        try:
            if not conexion:
                print("No se estableció conexión con la DB.")
                return False
            cursor = self.db_manager.get_cursor()            
            cursor.execute("""SELECT 
                           productos.nombre AS nombre_producto, 
                           productos.precio, 
                           productos.stock, 
                           categorias.nombre_categoria 
                           FROM 
                           productos 
                           JOIN categorias ON productos.id_categoria = categorias.id_categoria;""")
            # tengo que parsear lo resultados a lenguage nativo en una lista
            lista_productos_sql = cursor.fetchall()
            productos = []
            for i in lista_productos_sql:
                producto_dict = {
                "nombre": i['nombre_producto'],
                "precio": float(i['precio']),
                "stock": int(i['stock']),
                "categoria": i['nombre_categoria']
                }
                productos.append(producto_dict)         
            return productos
        
        except Exception as e:
            print(f"Error al obtener todos los productos: {e}")
            return None        
        