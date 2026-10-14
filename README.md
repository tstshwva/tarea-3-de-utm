# Clima Claro

Aplicación web académica para consultar el clima actual y el pronóstico de los próximos tres días. Busca una ciudad, elige entre los resultados y consulta temperatura, sensación térmica, humedad y viento.

## Ejecutar

No requiere instalar paquetes ni configurar claves. Necesitas un navegador moderno, Internet y Python 3.

Desde la carpeta del proyecto ejecuta:

```sh
python -m http.server 8000 --directory dist
```

En Windows también puedes usar `py -m http.server 8000 --directory dist`. Abre http://localhost:8000 y busca una ciudad. El servidor debe permanecer abierto mientras utilizas la aplicación. No abras el HTML directamente como archivo: utiliza el servidor para cargar los módulos de JavaScript.

## API externa y seguridad

Se utiliza [Open-Meteo](https://open-meteo.com/) con dos servicios: [geocodificación](https://open-meteo.com/en/docs/geocoding-api) y [pronóstico](https://open-meteo.com/en/docs). El primero convierte nombres de ciudades en coordenadas; el segundo consulta el clima con esas coordenadas. Las condiciones actuales proceden de modelos meteorológicos. No se utiliza un modelo de IA dentro de la app; la IA se utilizó durante su desarrollo, modalidad permitida por la tarea.

Esta implementación usa los endpoints públicos sin clave para uso académico no comercial. No contiene credenciales. `.gitignore` excluye `.env` y archivos de entorno por si se agregan secretos posteriormente. El texto recibido se muestra con `textContent`, sin interpretarlo como HTML.

## Manejo de errores

- Sin conexión: mensaje para revisar la conexión y volver a intentar.
- Ciudad inexistente o respuesta vacía: aviso sin mostrar resultados anteriores.
- HTTP 429: aviso de límite de peticiones.
- Fallo del servicio, JSON inválido o datos incompletos: mensaje de error.
- Espera superior a 12 segundos: cancela la petición.
- Mientras hay una consulta activa se bloquean consultas simultáneas.

## Estructura y explicación

- `dist/index.html`: formulario, estados y contenedores de resultados.
- `dist/styles.css`: diseño adaptable a móvil y escritorio.
- `dist/app.js`: controla la búsqueda, selección de ciudad y presentación.
- `dist/api.js`: peticiones, validación de datos y traducción de códigos meteorológicos.
- `tests/api.test.js`: pruebas automáticas con respuestas simuladas.
- `BITACORA.md`: registro y preguntas para completar la evidencia real.
- `DEMOSTRACION.md`: guion de menos de tres minutos y explicación del código.

Flujo: formulario → API de ciudades → elección → API meteorológica → validación → pantalla. `async/await` espera las respuestas; `try/catch` permite mostrar errores; `AbortController` cancela peticiones lentas. `URLSearchParams` codifica los parámetros. Los pronósticos usan fecha a mediodía para evitar cambiar al día anterior por diferencias horarias.

## Declaración de uso de IA

Se utilizó **ChatGPT mediante Codex** para interpretar los requisitos, proponer la app, generar HTML/CSS/JavaScript, preparar pruebas y redactar la documentación. Sites se utilizó como herramienta de publicación, no como modelo de IA. No se atribuye al estudiante la escritura manual del código generado.

El estudiante indicó que ya completó la parte de GitHub. No hay evidencia en esta sesión de qué partes del código realizó sin ayuda de IA. Debe completar esa declaración con actividades realmente realizadas, por ejemplo pruebas manuales, cambios propios o explicación del código, solo después de hacerlas.

## Pruebas

Con Node.js 18 o superior:

```sh
node --test tests/api.test.js
```

Las ocho pruebas verifican límite de peticiones, falta de conexión, respuesta vacía, JSON inválido, cancelación, datos incompletos, código desconocido y tormenta WMO 97. No hacen llamadas reales. Consulta `VERIFICACION.md` para los límites de la verificación.

## Publicación en GitHub

Repositorio: https://github.com/tstshwva/tarea-3-de-utm

Aplicación: https://tstshwva.github.io/tarea-3-de-utm/

GitHub Pages publica la carpeta dist/ mediante .github/workflows/pages.yml después de ejecutar las pruebas. Cada cambio en main inicia una nueva publicación. Las rutas de los recursos son relativas para funcionar dentro del subdirectorio del repositorio.

Los commits de esta sesión son cambios reales realizados con asistencia de IA y usando la identidad verificada de la cuenta. No acreditan un historial previo de desarrollo ni escritura manual del código por el estudiante.
