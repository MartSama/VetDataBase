CREATE TABLE Personal (
  Identificador NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  Tipo_empleado VARCHAR2(50),
  Nombre_completo VARCHAR2(100),
  Fecha_nacimiento DATE,
  Fecha_ingreso DATE,
  Numero_telefonico VARCHAR2(20),
  Direccion VARCHAR2(100),
  Turno VARCHAR2(10),
  Horario VARCHAR2(50),
  RFC VARCHAR2(20),
  Cedula_profesional VARCHAR2(20)
  );
  
CREATE TABLE Nomina (
  ID NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  Identificador_empleado NUMBER(10),
  Horas_trabajadas NUMBER(5),
  Horas_extras NUMBER(5),
  Retardos NUMBER(5),
  Faltas NUMBER(5),
  Empleado_del_mes CHAR(1),
  Fecha_pago DATE,
  Tipo_pago VARCHAR2(20),
  CONSTRAINT fk_nomina_personal FOREIGN KEY (Identificador_empleado) REFERENCES Personal (Identificador)
  );
  
CREATE TABLE Mascota (
  ID NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ID_propietario NUMBER(10),
  Nombre_mascota VARCHAR2(50),
  Edad NUMBER(3),
  Sexo VARCHAR2(10),
  Raza VARCHAR2(50),
  Peso NUMBER(5, 2),
  Color VARCHAR2(50)
  );
  
CREATE TABLE Propietario (
  ID NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ID_mascota NUMBER(10),
  Nombre VARCHAR2(50),
  Apellido VARCHAR2(50),
  Telefono VARCHAR2(20),
  Direccion VARCHAR2(100),
  Correo_electronico VARCHAR2(100),
  CONSTRAINT fk_propietario_mascota FOREIGN KEY (ID_mascota) REFERENCES Mascota (ID)
  );


  CREATE TABLE Expediente (
  ID NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ID_mascota NUMBER(10),
  ID_dueño NUMBER(10),
  Tratamientos VARCHAR2(200),
  Fecha_ingreso DATE,
  Fecha_salida DATE,
  CONSTRAINT fk_expediente_mascota FOREIGN KEY (ID_mascota) REFERENCES Mascota (ID),
  CONSTRAINT fk_expediente_propietario FOREIGN KEY (ID_dueño) REFERENCES Propietario (ID)
  );
  
CREATE TABLE Receta (
  ID NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ID_expediente NUMBER(10),
  ID_personal NUMBER(10),
  ID_propietario NUMBER(10),
  Medicamentos_recetados VARCHAR2(200),
  Indicaciones_generales VARCHAR2(200),
  Fecha DATE,
  CONSTRAINT fk_receta_expediente FOREIGN KEY (ID_expediente) REFERENCES Expediente (ID),
  CONSTRAINT fk_receta_personal FOREIGN KEY (ID_personal) REFERENCES Personal (Identificador),
  CONSTRAINT fk_receta_propietario FOREIGN KEY (ID_propietario) REFERENCES Propietario (ID)
  );
  
CREATE TABLE Venta (
  ID NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ID_empleado NUMBER(10),
  ID_cliente NUMBER(10),
  ID_expediente NUMBER(10),
  Precio_total NUMBER(10, 2),
  Productos_vendidos VARCHAR2(200),
  Consultas NUMBER(5),
  Esteticas NUMBER(5),
  Descuento_aplicado NUMBER(10, 2),
  Fecha_venta DATE,
  CONSTRAINT fk_venta_empleado FOREIGN KEY (ID_empleado) REFERENCES Personal (Identificador),
  CONSTRAINT fk_venta_cliente FOREIGN KEY (ID_cliente) REFERENCES Propietario (ID),
  CONSTRAINT fk_venta_expediente FOREIGN KEY (ID_expediente) REFERENCES Expediente (ID)
  );
  
CREATE TABLE Inventario (
  ID NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  Nombre_producto VARCHAR2(50),
  Descripcion VARCHAR2(200),
  Area VARCHAR2(50),
  Precio_unitario NUMBER(10, 2),
  Cantidad_bodega NUMBER(10),
  Cantidad_exhibicion NUMBER(10),
  Cantidad_total AS (Cantidad_bodega + Cantidad_exhibicion),
  Fecha_caducidad DATE,
  Productos_descuento VARCHAR2(200),
  Marca_producto VARCHAR2(50)
  );
  
CREATE TABLE Proveedor (
  ID NUMBER(10) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  Nombre VARCHAR2(50),
  Direccion VARCHAR2(100),
  Telefono VARCHAR2(20),
  Articulos_proveidos VARCHAR2(200)
  );
