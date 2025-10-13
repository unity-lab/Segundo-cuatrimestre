# from fastapi import FastAPI
# from app.enrutador.usuarios import users
from app.models.tablas import Manejar_tablas
from app.console_defs import productos as p
# recordar ejecutar docker y tener el archivo .env completo , el entorno virtual levantado y listo previo a ejecutar python
def check(booleano):
    if booleano:
        print("Se estableció conexión y se verificó la tabla.")
    else:        
        print("revise la conexion con db / verifique la query")

"""app = FastAPI()

app.include_router(users)"""

tabla = Manejar_tablas()
tabla.script_tablas()
check(tabla.exito)

def menu_principal():    
    while True:
        # 1. Mostrar el menú de opciones
        print("\n===========================")
        print("        MENÚ PRINCIPAL     ")
        print("===========================")
        print("1. Ver todos los productos")
        print("2. Salir")
        print("---------------------------")
        
        opcion = input("Ingrese su opción (1 o 2): ").strip()
        
        if opcion == '1':
            p.mostrar_productos()
        elif opcion == '2':
            print("\n👋 ¡Gracias por usar el sistema! Saliendo...")
            break  
        else:
            print("\n⚠️ Opción no válida. Por favor, ingrese '1' o '2'.")

# Ejecutar el menú
if __name__ == "__main__":
    menu_principal()






