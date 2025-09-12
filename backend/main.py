from fastapi import FastAPI
from app.enrutador.usuarios import users
from app.models.tablas import Manejar_tablas

def check(resultado):
    if resultado == False:
        print("revise la conexion con db / verifique la query")
    else:
        print("Se estableció conexión y se verificó la tabla.")

app = FastAPI()

app.include_router(users)

tabla = Manejar_tablas()

resultado = tabla.script_tablas()
check(resultado)






