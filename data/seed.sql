CREATE TABLE public.empresas
(
    id bigserial primary key not null,
    nombre character(50) NOT NULL,
    telefono character(9),
    idServicio integer NOT NULL,
    email character(70)
)

INSERT INTO empresas(nombre, telefono, idServicio, email) VALUES
	('MetaCucharin', '099111111', 1, 'consulta@metacucharin.com'),
	('Cable pelado', '099231111', 3, 'consulta@cablepelado.com'),
	('TablaAstillada', '099321111', 2, 'consulta@tablaastillada.com'),
	('ClavoEnElDedo', '099421111', 2, 'consulta@clavoeneldedo.com'),
	('ChauMosquito', '099541111', 4, 'consulta@chaumosquito.com'),
	('CueritoFlojo', '099671111', 7, 'consulta@cueritoflojo.com');

/*===================================================*/


CREATE TABLE servicios
(
    id bigserial primary key not null,
    nombre character(30) NOT NULL,
    archivo character(100),
    archivoTransp character(100)
)

INSERT INTO servicios (nombre, archivo, archivoTransp) VALUES
('Albañileria', '/assets/imagesOficios/Oficio_albanil.jpg', '/assets/imagesServicios/ServiceAlbanileria_transp.png'),
('Carpinteria', '/assets/imagesOficios/Oficio_carpintero.jpg', '/assets/imagesServicios/ServiceCarpinteria_transp.png'),
('Electricidad', '/assets/imagesOficios/Oficio_electricista.jpg', '/assets/imagesServicios/ServiceElectricidad_transp.png'),
('Fumigacion', '/assets/imagesOficios/Oficio_fumigador.jpg', '/assets/imagesServicios/ServiceJardineria_transp.png'),
('Jardineria', '/assets/imagesOficios/Oficio_jardinero.jpg', '/assets/imagesServicios/ServiceJardineria_transp.png'),
('Limpieza', '/assets/imagesOficios/Oficio_limpieza.jpg', '/assets/imagesServicios/ServicePintura_transp.png'),
('Sanitaria', '/assets/imagesOficios/Oficio_sanitario.jpg', '/assets/imagesServicios/ServSanitaria_transp.png');

/*================================================*/


CREATE TABLE usuarios
(
    id bigserial primary key not null,
    nombre character(70),
    email character(80),
    clave character(20)
)

INSERT INTO usuarios(id, nombre, email, clave) VALUES
	(1, 'Daniel', 'berretta.daniel@gmail.com', '123'),
	(2, 'Gustavo', 'gustavguez@gmail.com', '124');
	
/*================================================*/


CREATE TABLE trabajos ( 
	id bigserial primary key not null,
	fechaInicio char(8),
	finalizado boolean
)

insert into trabajos (fechaInicio, finalizado) values
('20220111', true),
('20220202', false)

/*================================================*/


CREATE TABLE tareas (
	idTarea bigserial not null primary key,
	idTrabajo bigint not null,
	fecha char(8),
	descripcion char(15),
    idEmpresa bigint not null
);

insert into tareas (idtrabajo, fecha, descripcion, idempresa) values
(2, '20220107', 'prueba', 2)
(2, '20220108', 'prueba2', 2);

-- A los efectos de poder probar un insert desde la UI, cualquiera sea el servicio elegido, en todos los casos
-- considerare tareas para el codigo de trabajo 2 (idTrabajo = 2). Es el trabajo que deje como no finalizado.
