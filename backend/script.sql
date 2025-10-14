CREATE DATABASE IF NOT EXISTS sigesa_db;
USE sigesa_db;

CREATE TABLE roles (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(50) NOT NULL
);

CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    contrasena VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

CREATE TABLE especialidades (
    id_especialidad INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE profesionales (
    id_profesional INT PRIMARY KEY AUTO_INCREMENT,
    matricula VARCHAR(50) UNIQUE NOT NULL,
    id_usuario INT UNIQUE NOT NULL,
    id_especialidad INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_especialidad) REFERENCES especialidades(id_especialidad)
);

CREATE TABLE pacientes (
    id_paciente INT PRIMARY KEY AUTO_INCREMENT,
    nro_documento VARCHAR(20) UNIQUE NOT NULL,
    obra_social VARCHAR(100),
    id_usuario INT UNIQUE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE estados_turno (
    id_estado INT PRIMARY KEY AUTO_INCREMENT,
    nombre_estado VARCHAR(50) NOT NULL
);

CREATE TABLE turnos (
    id_turno INT PRIMARY KEY AUTO_INCREMENT,
    fecha_hora DATETIME NOT NULL,
    motivo TEXT,
    id_paciente INT NOT NULL,
    id_profesional INT NOT NULL,
    id_estado INT NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente),
    FOREIGN KEY (id_profesional) REFERENCES profesionales(id_profesional),
    FOREIGN KEY (id_estado) REFERENCES estados_turno(id_estado)
);

CREATE TABLE historias_clinicas (
    id_historia INT PRIMARY KEY AUTO_INCREMENT,
    fecha_apertura DATE NOT NULL,
    id_paciente INT UNIQUE NOT NULL,
    FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente)
);

CREATE TABLE episodios (
    id_episodio INT PRIMARY KEY AUTO_INCREMENT,
    fecha_atencion DATE NOT NULL,
    diagnostico TEXT,
    tratamiento TEXT,
    id_historia INT NOT NULL,
    id_profesional INT NOT NULL,
    FOREIGN KEY (id_historia) REFERENCES historias_clinicas(id_historia) ON DELETE CASCADE,
    FOREIGN KEY (id_profesional) REFERENCES profesionales(id_profesional)
);

CREATE TABLE categorias (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(100) NOT NULL
);

CREATE TABLE productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    id_categoria INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

CREATE TABLE estados_pedido (
    id_estado_pedido INT PRIMARY KEY AUTO_INCREMENT,
    nombre_estado VARCHAR(50) NOT NULL
);

CREATE TABLE pedidos (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    fecha_pedido DATE NOT NULL,
    monto_total DECIMAL(10, 2) NOT NULL,
    id_usuario INT NOT NULL,
    id_estado_pedido INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_estado_pedido) REFERENCES estados_pedido(id_estado_pedido)
);

CREATE TABLE detalles_pedido (
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id_pedido, id_producto),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);