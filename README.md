
# SERVIDORBEACONS

Este es el repositorio del backend para la aplicación **SERVIDORBEACONS**, un servidor construido con Express.js y MySQL. Este backend está preparado para ejecutarse en un contenedor Docker para facilitar su despliegue.

## Estructura del proyecto

El código fuente está organizado de la siguiente manera:


``` bash
├── node_modules/ # Módulos de Node.js 
├── src/ # Carpeta principal del código fuente 
│ └── index.js # Punto de entrada principal del servidor 
├── WebBeacons/ # Carpeta con el frontend
├── .dockerignore # Archivos y carpetas a ignorar por Docker 
├── .env # Variables de entorno 
├── .gitignore # Archivos y carpetas a ignorar por Git 
├── docker-compose.yaml # Archivo para definir y ejecutar aplicaciones Docker multi-contenedor 
├── Dockerfile # Archivo para crear la imagen Docker 
├── package.json # Dependencias del proyecto y scripts de npm 
├── package-lock.json # Información detallada de las dependencias 
└── README.md # Documento de introducción y guía (este archivo)
```

## Instalación y uso

Sigue los pasos a continuación para configurar y ejecutar el proyecto en tu entorno local:

### 1. Clona el repositorio

```bash
git clone <https://github.com/JorgeHelados/ServidorBeacons>
cd ServidorBeacons
```

### 2. Instala las dependencias

Ejecuta el siguiente comando para instalar todas las dependencias de Node.js necesarias para el proyecto:

```bash
npm install
```

### 3. Configura las variables de entorno
Crea un archivo .env en la raíz del proyecto con el siguiente contenido, ajustando los valores según sea necesario:

```bash
MYSQLDB_HOST=tu_host
MYSQLDB_ROOT_PASSWORD=tu_contraseña
MYSQLDB_DATABASE=tu_base_de_datos

MYSQLDB_LOCAL_PORT=3307
MYSQLDB_DOCKER_PORT=3306

NODE_LOCAL_PORT=4000
NODE_DOCKER_PORT=4000

WEB_LOCAL_PORT=3000
WEB_DOCKER_PORT=3000
WEB_NAME=tu_web
```

### 4. Ejecuta la aplicación en Docker

Para iniciar la aplicación en Docker, sigue estos pasos:

1. Construye la imagen Docker
```bash
docker-compose up --build
```

2. Si realizas algún cambio en los archivos, vuelve a construir la imagen:

```bash
docker-compose up --build
```

3. Si no se realiza ningun cambio y se quiere abrir el servidor:

```bash
docker-compose up
```

4. Para detener los contenedores sin borrar la base de datos, usa:

```bash
docker-compose stop
```

Nota: No uses docker-compose down ya que esto borrará la base de datos.

5. Acceso a la aplicación
La web se puede ver en http://localhost:3000.
Los endpoints están disponibles en http://localhost:4000.

## Pruebas

Este proyecto está configurado para usar **Jest** para realizar pruebas unitarias. Para ejecutar las pruebas, usa el siguiente comando:

```bash
npm test
```

## Autor

Desarrollado por **Jorge Satorres Pardo**.