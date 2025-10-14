from app.models.productos import Producto

def mostrar_productos():
    p = Producto()
      
    print("--- Consultando la base de datos... ---")
    # colocar la consulta a db aca
    listado = p.ver_productos_join()
    # visualizar los productos:   
    
    if listado:
        print("\nLista de Productos:")
        print("|           Nombre   |     Precio    |    Categoria")
        print("-----------------------------------------------------")
        for i in listado:
            print(f"{i['nombre']:<12} | {i['precio']:<6} | ${i['stock']:>6.2f} | {i['categoria']:<8}")
            print("----------------------------------------------------")
        print("******************************************************")
    else:
        print("No se encontraron productos.")