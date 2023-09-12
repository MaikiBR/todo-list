# todo-list
This repository belongs to Miguel Ángel Bermea Rodríguez

# Objetivo

Sistema de Gestión de Tareas (To-Do List): Crea una aplicación web o móvil que permita a los usuarios crear, editar y eliminar tareas, así como establecer fechas de vencimiento. Utiliza tecnologías web como HTML, CSS y JavaScript, y opcionalmente, una base de datos para almacenar las tareas.

# Descripción

 Se creó una aplicación web que brinda la funcionalidad de crear, editar y eliminar tareas. A la hora de crear una tarea le estableces: tarea, descripción y fecha de vencimiento.
 Se realizó la conexión a una Cloud Firestore (no relacional) de Firebase para almacenar las tareas.

# Tecnologías utilizadas

- HTML
- CSS Modules
- Javascript
- React
- Material UI
- Firebase/Firestore

# Instalación de dependencias

Utiliza el comando `npm install` para instalar la dependencias necesarias para la ejecución del proyecto.

# Ejecución

Utiliza el comando `npm start` para ejecutar el proyecto de manera local (Por lo general será en localhost:3000 o el puerto libre que tengas establecido, la terminal te avisará en que ruta se esta ejecutando el proyecto). 
Importante que para ejecutar este comando debes estar posicionado en el 'todo-list' folder (en el cual veas el folder de src y public)

# Posibles mejoras al proyecto

En el roadmap de desarrollo que establecí llegue a mapear ciertas funcionalidades adicionales que quedaron fuera pero me gustaría mencionar (no eran requerimientos como tal):

- Base de datos relacional para gestión de usuarios y sus tareas propias. Para el entregable solicitado solo se cubrio el punto opcional de una base de datos para almacenar las tareas.
- Funcionalidad de tareas con categorias (personal, académico, laboral, entretenimiento, etc)
- Funcionalidad de atraso en tareas
- Funcionalidad de completar tarea
