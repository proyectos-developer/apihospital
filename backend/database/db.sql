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

/**Suscripción página**/
CREATE TABLE suscripcion(
    id INT(11) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE suscripcion
    ADD PRIMARY KEY(id);

ALTER TABLE suscripcion
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE suscripcion;

/**Tipo Proyecto **/
CREATE TABLE tipo_proyecto(
    id INT(11) NOT NULL,
    nombre VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE tipo_proyecto
    ADD PRIMARY KEY(id);

ALTER TABLE tipo_proyecto
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE tipo_proyecto;

/**Proyectos **/
CREATE TABLE proyectos(
    id INT(11) NOT NULL,
    tipo_proyecto VARCHAR (100) NOT NULL,
    nombre_proyecto VARCHAR (100) NOT NULL,
    cliente VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    url_imagen VARCHAR (100) NOT NULL,
    url_contenido VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE proyectos
    ADD PRIMARY KEY(id);

ALTER TABLE proyectos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE proyectos;

/**Clientes página**/
CREATE TABLE clientes(
    id INT(11) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    password VARCHAR (60) NOT NULL,
    usuario VARCHAR (100) NOT NULL
);

ALTER TABLE clientes
    ADD PRIMARY KEY(id);

ALTER TABLE clientes
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE clientes;

/**Info cliente página**/
CREATE TABLE info_clientes(
    id INT(11) NOT NULL,
    nombres VARCHAR (100) NOT NULL,
    apellidos VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    usuario VARCHAR (100) NOT NULL
);

ALTER TABLE info_clientes
    ADD PRIMARY KEY(id);

ALTER TABLE info_clientes
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE info_clientes;

/**cotizacion**/
CREATE TABLE cotizacion(
    id INT(11) NOT NULL,
    nro_cotizacion INT (11) NOT NULL,

    cotizacion_domhost TINYINT (1) NOT NULL,
    cotizacion_web TINYINT (1) NOT NULL,
    cotizacion_app TINYINT (1) NOT NULL,
    cotizacion_marketing TINYINT (1) NOT NULL,
    cotizacion_software TINYINT (1) NOT NULL,
    cotizacion_cloud TINYINT (1) NOT NULL,

    tipo_negocio VARCHAR (100) NOT NULL,
    nombres VARCHAR (100) NOT NULL,
    rubro VARCHAR (100) NOT NULL,
    nro_ruc VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nombre_contacto VARCHAR (100) NOT NULL,

    tipo_dominio VARCHAR (100) NOT NULL,
    tipo_hosting VARCHAR (100) NOT NULL,
    informacion_domhost VARCHAR (1000) NOT NULL,

    tipo_web VARCHAR (100) NOT NULL,
    pestania_nosotros TINYINT (1) NOT NULL,
    pestania_servicios TINYINT (1) NOT NULL,
    pestania_productos TINYINT (1) NOT NULL,
    pestania_fotos TINYINT (1) NOT NULL,
    pestania_videos TINYINT (1) NOT NULL,
    pestania_contacto TINYINT (1) NOT NULL,
    pestania_cotizacion TINYINT (1) NOT NULL,
    pestania_tienda TINYINT (1) NOT NULL,
    pestania_carrito TINYINT (1) NOT NULL,
    pestania_pago TINYINT (1) NOT NULL,
    pestania_seguimiento TINYINT (1) NOT NULL,
    pestania_registro TINYINT (1) NOT NULL,
    pestania_login TINYINT (1) NOT NULL,
    pestania_perfil TINYINT (1) NOT NULL,
    pestania_favoritos TINYINT (1) NOT NULL,
    pestania_compras TINYINT (1) NOT NULL,
    pestania_administracion TINYINT (1) NOT NULL,
    informacion_web VARCHAR (1000) NOT NULL,

    tipo_aplicacion VARCHAR (100) NOT NULL,
    pantalla_login TINYINT (1) NOT NULL,
    pantalla_registro TINYINT (1) NOT NULL,
    pantalla_presentacion TINYINT (1) NOT NULL,
    pantalla_perfil TINYINT (1) NOT NULL,
    pantalla_productos TINYINT (1) NOT NULL,
    pantalla_carrito TINYINT (1) NOT NULL,
    pantalla_pago TINYINT (1) NOT NULL,
    pantalla_ubicacion TINYINT (1) NOT NULL,
    pantalla_localizacion TINYINT (1) NOT NULL,
    pantalla_categorias TINYINT (1) NOT NULL,
    pantalla_comentarios TINYINT (1) NOT NULL,
    pantalla_galeria TINYINT (1) NOT NULL,
    pantalla_chat TINYINT (1) NOT NULL,
    pantalla_estadisticas TINYINT (1) NOT NULL,
    pantalla_anuncios TINYINT (1) NOT NULL,
    pantalla_informativa TINYINT (1) NOT NULL,
    pantalla_calendario TINYINT (1) NOT NULL,
    pantalla_agenda TINYINT (1) NOT NULL,
    pantalla_favoritos TINYINT (1) NOT NULL,
    pantalla_otro TINYINT (1) NOT NULL,
    informacion_aplicacion VARCHAR (1000) NOT NULL,
    
    tipo_marketing VARCHAR (100) NOT NULL,
    informacion_marketing VARCHAR (1000) NOT NULL,
    
    tipo_software VARCHAR (100) NOT NULL,
    informacion_software VARCHAR (1000) NOT NULL,
    
    tipo_cloud VARCHAR (100) NOT NULL,
    informacion_cloud VARCHAR (1000) NOT NULL,

    usuario VARCHAR (100) NOT NULL
);

ALTER TABLE cotizacion
    ADD PRIMARY KEY(id);

ALTER TABLE cotizacion
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE cotizacion;

/**Productos**/
CREATE TABLE producto(
    id INT(11) NOT NULL,
    producto VARCHAR (100) NOT NULL,
    descripcion VARCHAR (100) NOT NULL,
    caracteristica_1 VARCHAR (100) NOT NULL,
    caracteristica_2 VARCHAR (100) NOT NULL,
    caracteristica_3 VARCHAR (100) NOT NULL,
    caracteristica_4 VARCHAR (100) NOT NULL,
    caracteristica_5 VARCHAR (100) NOT NULL,
    caracteristica_6 VARCHAR (100) NOT NULL,
    caracteristica_7 VARCHAR (100) NOT NULL,
    caracteristica_8 VARCHAR (100) NOT NULL,
    caracteristica_9 VARCHAR (100) NOT NULL,
    caracteristica_10 VARCHAR (100) NOT NULL,
    caracteristica_11 VARCHAR (100) NOT NULL,
    caracteristica_12 VARCHAR (100) NOT NULL,
    caracteristica_13 VARCHAR (100) NOT NULL,
    caracteristica_14 VARCHAR (100) NOT NULL,
    caracteristica_15 VARCHAR (100) NOT NULL,
    caracteristica_16 VARCHAR (100) NOT NULL,
    caracteristica_17 VARCHAR (100) NOT NULL,
    caracteristica_18 VARCHAR (100) NOT NULL,
    caracteristica_19 VARCHAR (100) NOT NULL,
    caracteristica_20 VARCHAR (100) NOT NULL,
    id_categoria INT (11) NOT NULL,
    categoria VARCHAR (100) NOT NULL,
    servicio VARCHAR (100) NOT NULL,
    foto TEXT NOT NULL,
    precio DOUBLE NOT NULL,
    oferta DOUBLE NOT NULL,
    precio_mensual DOUBLE NOT NULL,
    precio_anual DOUBLE NOT NULL,
    comentarios VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE producto
    ADD PRIMARY KEY(id);

ALTER TABLE producto
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE producto;

/**Categorías**/
CREATE TABLE categorias(
    id INT(11) NOT NULL,
    categoria VARCHAR (100) NOT NULL,
    descripcion VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE categorias
    ADD PRIMARY KEY(id);

ALTER TABLE categorias
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE categorias;

/**Carrito compras**/
CREATE TABLE carrito(
    id INT(11) NOT NULL,
    id_producto INT(11) NOT NULL,
    producto VARCHAR (100) NOT NULL,
    usuario VARCHAR (100) NOT NULL,
    shop_id VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE carrito
    ADD PRIMARY KEY(id);

ALTER TABLE carrito
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE carrito;