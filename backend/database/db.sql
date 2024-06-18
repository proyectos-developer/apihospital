CREATE DATABASE developer_ideas;

USE developer_ideas;

CREATE DATABASE developer_ideas;

USE developer_ideas;

/**Usuarios página**/
CREATE TABLE users(
    id INT(11) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    password VARCHAR (60) NOT NULL,
    usuario VARCHAR (100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY(id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;

/**Doctores página**/
CREATE TABLE user_doctores(
    id INT(11) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    password VARCHAR (60) NOT NULL,
    usuario VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE user_doctores
    ADD PRIMARY KEY(id);

ALTER TABLE user_doctores
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE user_doctores;

/**Info doctores**/
CREATE TABLE info_doctores(
    id INT(11) NOT NULL,
    nombres VARCHAR (100) NOT NULL,
    apellidos VARCHAR (100) NOT NULL,
    fecha_nacimiento VARCHAR(100) NOT NULL,
    genero VARCHAR (100) NOT NULL, 
    especialidad VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    usuario VARCHAR (100) NOT NULL,
    titulo_grado VARCHAR (100) NOT NULL,
    direccion VARCHAR (500) NOT NULL,
    pais VARCHAR (100) NOT NULL,
    provincia VARCHAR (100) NOT NULL,
    distrito VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE info_doctores
    ADD PRIMARY KEY(id);

ALTER TABLE info_doctores
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE info_doctores;

/**Info redes sociales doctores**/
CREATE TABLE redes_doctores(
    id INT(11) NOT NULL,
    url_facebook VARCHAR (100) NOT NULL,
    url_twitter VARCHAR (100) NOT NULL,
    url_instagram VARCHAR(100) NOT NULL,
    url_linkedin VARCHAR (100) NOT NULL, 
    usuario VARCHAR (100) NOT NULL,,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE redes_doctores
    ADD PRIMARY KEY(id);

ALTER TABLE redes_doctores
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE redes_doctores;

/**Calificación doctores**/
CREATE TABLE calificacion_doctores(
    id INT(11) NOT NULL,
    usuario_doctor VARCHAR (100) NOT NULL,
    calificacion VARCHAR (100) NOT NULL,
    usuario_paciente VARCHAR(100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE calificacion_doctores
    ADD PRIMARY KEY(id);

ALTER TABLE calificacion_doctores
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE calificacion_doctores;

/**Info pacientes**/
CREATE TABLE info_pacientes(
    id INT(11) NOT NULL,
    nombres VARCHAR (100) NOT NULL,
    apellidos VARCHAR (100) NOT NULL,
    fecha_nacimiento VARCHAR(100) NOT NULL,
    edad VARCHAR (20) NOT NULL,
    genero VARCHAR (100) NOT NULL, 
    correo VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    doctor VARCHAR (100) NOT NULL,
    personal VARCHAR (100) NOT NULL,
    pabellon VARCHAR (100) NOT NULL,
    fecha_ingreso VARCHAR  (100) NOT NULL,
    direccion VARCHAR (200) NOT NULL,
    usuario_paciente VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE info_pacientes
    ADD PRIMARY KEY(id);

ALTER TABLE info_pacientes
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE info_pacientes;

/**Info estado paciente**/
CREATE TABLE valores_paciente(
    id INT(11) NOT NULL,
    usuario_paciente VARCHAR (100) NOT NULL,
    down_cluster VARCHAR (100) NOT NULL,
    down_fiber VARCHAR(100) NOT NULL,
    waterfowl_feathers VARCHAR (20) NOT NULL,
    quill VARCHAR (100) NOT NULL, 
    landfowl VARCHAR (100) NOT NULL,
    blood_preasure VARCHAR (100) NOT NULL,
    heart_beat VARCHAR (500) NOT NULL,
    haemoglobin VARCHAR (100) NOT NULL,
    sugar VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE valores_paciente
    ADD PRIMARY KEY(id);

ALTER TABLE valores_paciente
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE valores_paciente;

/**Info tratamiento paciente**/
CREATE TABLE tratamiento_pacientes(
    id INT(11) NOT NULL,
    usuario_paciente VARCHAR (100) NOT NULL,
    usuario_doctor VARCHAR (100) NOT NULL,
    tratamiento VARCHAR(100) NOT NULL,
    fecha VARCHAR (20) NOT NULL,
    cargo VARCHAR (100) NOT NULL, 
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE tratamiento_pacientes
    ADD PRIMARY KEY(id);

ALTER TABLE tratamiento_pacientes
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE tratamiento_pacientes;

/**Info facturas paciente**/
CREATE TABLE facturas_pacientes(
    id INT(11) NOT NULL,
    numero VARCHAR (100) NOT NULL,
    usuario_paciente VARCHAR (100) NOT NULL,
    usuario_doctor VARCHAR (100) NOT NULL,
    monto VARCHAR(100) NOT NULL,
    estado VARCHAR (20) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE facturas_pacientes
    ADD PRIMARY KEY(id);

ALTER TABLE facturas_pacientes
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE facturas_pacientes;

/**Info habitaciones pacientes**/
CREATE TABLE habitaciones_pacientes(
    id INT(11) NOT NULL,
    numero VARCHAR (100) NOT NULL,
    usuario_paciente VARCHAR (100) NOT NULL,
    id_habitacion INT (11) NOT NULL,
    fecha_inicio VARCHAR (100) NOT NULL,
    fecha_cargo VARCHAR(100) NOT NULL,
    foto_paciente VARCHAR (500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE habitaciones_pacientes
    ADD PRIMARY KEY(id);

ALTER TABLE habitaciones_pacientes
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE habitaciones_pacientes;

/**Info especialidades**/
CREATE TABLE especialidades(
    id INT(11) NOT NULL,
    nombre_especialidad VARCHAR (100) NOT NULL,
    doctor_acargo VARCHAR (100) NOT NULL,
    descripcion VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE especialidades
    ADD PRIMARY KEY(id);

ALTER TABLE especialidades
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE especialidades;

/**Info pagos**/
CREATE TABLE pagos(
    id INT(11) NOT NULL,
    fecha_pago VARCHAR (100) NOT NULL,
    usuario_paciente VARCHAR (100) NOT NULL,
    usuario_doctor VARCHAR (100) NOT NULL,
    cargos VARCHAR (100) NOT NULL,
    impuesto VARCHAR (100) NOT NULL,
    descuento VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE pagos
    ADD PRIMARY KEY(id);

ALTER TABLE pagos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE pagos;

/**Info citas**/
CREATE TABLE citas(
    id INT(11) NOT NULL,
    nombre_paciente VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    fecha VARCHAR (100) NOT NULL,
    hora VARCHAR (100) NOT NULL,
    usuario_doctor VARCHAR (100) NOT NULL,
    condicion_medica VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE citas
    ADD PRIMARY KEY(id);

ALTER TABLE citas
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE citas;

/**Info tareas**/
CREATE TABLE tareas(
    id INT(11) NOT NULL,
    nombre_tarea VARCHAR (100) NOT NULL,
    usuario_paciente VARCHAR (100) NOT NULL,
    detalles_tarea VARCHAR (500) NOT NULL,
    equipo_acargo VARCHAR (100) NOT NULL,
    hora VARCHAR (100) NOT NULL,
    fecha VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE tareas
    ADD PRIMARY KEY(id);

ALTER TABLE tareas
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE tareas;

/**Info tipo habitación**/
CREATE TABLE tipo_habitacion(
    id INT(11) NOT NULL,
    nombre VARCHAR (100) NOT NULL,
    departamento VARCHAR (100) NOT NULL,
    cantidad VARCHAR (100) NOT NULL,
    disponibles VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE tipo_habitacion
    ADD PRIMARY KEY(id);

ALTER TABLE tipo_habitacion
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE tipo_habitacion;

/**Info notas**/
CREATE TABLE notas(
    id INT(11) NOT NULL,
    nombre VARCHAR (100) NOT NULL,
    usuario_doctor VARCHAR (100) NOT NULL,
    star VARCHAR (100) NOT NULL,
    nota VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE notas
    ADD PRIMARY KEY(id);

ALTER TABLE notas
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE notas;

/**Info personal**/
CREATE TABLE personal(
    id INT(11) NOT NULL,
    nombre VARCHAR (100) NOT NULL,
    apellidos VARCHAR (100) NOT NULL,
    genero VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    direccion VARCHAR (500) NOT NULL,
    designacion VARCHAR (100) NOT NULL,
    especialidad VARCHAR (100) NOT NULL,
    fecha_ingreso VARCHAR(100) NOT NULL,
    fecha_nacimiento VARCHAR(100) NOT NULL,
    tipo_documento VARCHAR (100) NOT NULL,
    nro_documento VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE personal
    ADD PRIMARY KEY(id);

ALTER TABLE personal
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE personal;

/**Info contactos**/
CREATE TABLE contactos(
    id INT(11) NOT NULL,
    nombre VARCHAR (100) NOT NULL,
    apellidos VARCHAR (100) NOT NULL,
    genero VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    especialidad VARCHAR (100) NOT NULL,
    fecha_nacimiento VARCHAR(100) NOT NULL,
    tipo_documento VARCHAR (100) NOT NULL,
    nro_documento VARCHAR (100) NOT NULL,
    facebook VARCHAR (100) NOT NULL,
    instagram VARCHAR (100) NOT NULL,
    twitter VARCHAR (100) NOT NULL,
    linkedin VARCHAR (100) NOT NULL,
    tiktok VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE contactos
    ADD PRIMARY KEY(id);

ALTER TABLE contactos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE contactos;