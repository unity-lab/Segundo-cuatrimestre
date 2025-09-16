from fastapi import Header, HTTPException, status
# desarrollar la logica para verificar la existencia y rol del usuario que intenta acceder
async def only_admin(rol: str = Header(None)):
    # Admin. Para visualizar el listado de usuarios registrados, cambiar el rol de un usuario y eliminar usuarios.
    # unicamente endpoints para administrador
    if rol != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acceso invalido: se requieren permisos de 'admin' para este endpoint"
        )
    return True

async def only_estandar(rol:str = Header(None)):
    # Usuario estándar. Para acceder sólo a sus datos personales y poder editarlos.
    if rol != "estandar":
            raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acceso invalido: se requieren permisos de 'estandar' para este endpoint"
        )
    return True
