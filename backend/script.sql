CREATE DATABASE sigesa_db;
USE sigesa_db;


CREATE TABLE USUARIO (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    tipoUsuario VARCHAR(20) NOT NULL
);


CREATE TABLE PACIENTE (
    idUsuario INT PRIMARY KEY,
    fechaNacimiento DATE,
    direccion VARCHAR(200),
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)
);


CREATE TABLE ESPECIALIDAD (
    idEspecialidad INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    descripcion TEXT
);


CREATE TABLE PROFESIONAL (
    idUsuario INT PRIMARY KEY,
    matricula VARCHAR(50),
    idEspecialidad INT,
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario),
    FOREIGN KEY (idEspecialidad) REFERENCES ESPECIALIDAD(idEspecialidad)
);


CREATE TABLE ADMINISTRATIVO (
    idUsuario INT PRIMARY KEY,
    legajo VARCHAR(50),
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)
);


CREATE TABLE TURNO (
    idTurno INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    estado VARCHAR(20) DEFAULT 'Pendiente',
    observaciones TEXT,
    idPaciente INT NOT NULL,
    idProfesional INT NOT NULL,
    idAdministrativo INT,
    FOREIGN KEY (idPaciente) REFERENCES PACIENTE(idUsuario),
    FOREIGN KEY (idProfesional) REFERENCES PROFESIONAL(idUsuario),
    FOREIGN KEY (idAdministrativo) REFERENCES ADMINISTRATIVO(idUsuario)
);


CREATE TABLE HISTORIAL_CLINICO (
    idHistorial INT PRIMARY KEY AUTO_INCREMENT,
    fechaCreacion DATE,
    idPaciente INT,
    FOREIGN KEY (idPaciente) REFERENCES PACIENTE(idUsuario)
);


CREATE TABLE CONSULTA (
    idConsulta INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE,
    diagnostico TEXT,
    tratamiento TEXT,
    observaciones TEXT,
    idHistorial INT,
    idTurno INT,
    FOREIGN KEY (idHistorial) REFERENCES HISTORIAL_CLINICO(idHistorial),
    FOREIGN KEY (idTurno) REFERENCES TURNO(idTurno)
);


CREATE TABLE PRODUCTO (
    idProducto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(150),
    descripcion TEXT,
    precio DECIMAL(10,2),
    stock INT
);


CREATE TABLE CARRITO (
    idCarrito INT PRIMARY KEY AUTO_INCREMENT,
    fechaCreacion DATE,
    idPaciente INT,
    FOREIGN KEY (idPaciente) REFERENCES PACIENTE(idUsuario)
);


CREATE TABLE DETALLE_CARRITO (
    idDetalleCarrito INT PRIMARY KEY AUTO_INCREMENT,
    cantidad INT,
    precioUnitario DECIMAL(10,2),
    idCarrito INT,
    idProducto INT,
    FOREIGN KEY (idCarrito) REFERENCES CARRITO(idCarrito),
    FOREIGN KEY (idProducto) REFERENCES PRODUCTO(idProducto)
);


CREATE TABLE PEDIDO (
    idPedido INT PRIMARY KEY AUTO_INCREMENT,
    fecha DATE,
    estado VARCHAR(20),
    total DECIMAL(10,2),
    idCarrito INT,
    FOREIGN KEY (idCarrito) REFERENCES CARRITO(idCarrito)
);


CREATE TABLE DETALLE_PEDIDO (
    idDetallePedido INT PRIMARY KEY AUTO_INCREMENT,
    cantidad INT,
    precioUnitario DECIMAL(10,2),
    idPedido INT,
    idProducto INT,
    FOREIGN KEY (idPedido) REFERENCES PEDIDO(idPedido),
    FOREIGN KEY (idProducto) REFERENCES PRODUCTO(idProducto)
);


CREATE TABLE SESION (
    idSesion INT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(255) NOT NULL,
    fechaInicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    fechaExpiracion DATETIME NOT NULL,
    activa BOOLEAN DEFAULT TRUE,
    idUsuario INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)
);