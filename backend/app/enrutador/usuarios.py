from fastapi import APIRouter
from app.models.usuarios_models import NuevoUsuario, ServiciosUsuario
from app.middleware.middleware_rol import verificar_rol_admin

def ver_errores(errores):
     #el primer valor devuelvo es un bool y el segundo el mensaje
     if errores[0]:
          print(f"{errores[1]}")
     else:
          print(f"{errores[1]}")    
          
         
users = APIRouter(
    prefix="/usuarios",
    tags=["usuarios"],
)

# esta ruta esta abierta publica y disponible
@users.post("/registrarse/")
async def crear_usuario(usuario: NuevoUsuario):
      validacion = usuario.validar_usuario()
      if validacion[0]:
            print(f"paso validacion de campos: Usuario/Email= {usuario.email}")
      else:
        return validacion[1]
      u = ServiciosUsuario()
      errores = u.registrar_usuario(usuario)
      ver_errores(errores)

# esta ruta solo accesible para administradores o estandar ya registrados ( se aplica middleware)
@users.get("/datos", dependencies=[Depends(solo_registrados)])
async def editar_datos():
    # desarrollar la logica completa de todos los usuarios registrados
    return {"mensaje": "edita mis datos (admin o estandar)"}

# esta ruta solo accesible para administradores ( se aplica middleware)
@users.get("/listar-todos", dependencies=[Depends(verificar_rol)])
async def listar_usuarios():
    # desarrollar la logica completa de todos los usuarios registrados
    return {"mensaje": "Lista de todos los usuarios (solo para admin)"}

# esta ruta solo accesible para administradores ( se aplica middleware)
@users.get("/eliminar", dependencies=[Depends(verificar_rol)])
async def eliminar_usuario():
    # desarrollar la logica completa de todos los usuarios registrados
    return {"mensaje": "elimina un usuario (solo para admin)"}  

# esta ruta solo accesible para administradores ( se aplica middleware)
@users.get("/cambiorol", dependencies=[Depends(verificar_rol)])
async def editar_rol():
    # desarrollar la logica completa de todos los usuarios registrados
    return {"mensaje": "edita el rol de un usuario (solo para admin)"}              