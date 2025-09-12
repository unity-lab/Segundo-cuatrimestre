from fastapi import Header, HTTPException, status

async def verificar_rol_admin(rol: str = Header(None)):
    # desarrollar la logica para verificar la existencia y rol del usuario que intenta acceder
    
    if rol != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acceso invalido: se requieren permisos de 'admin'"
        )
    return True