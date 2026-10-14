# Demostración de Clima Claro · 2 minutos 40 segundos

Este guion se adapta a una demostración en clase. También sirve para grabar pantalla. Ensáyalo con la app abierta y una conexión activa.

**0:00–0:20 · Presentación.** “Clima Claro consulta el clima actual y los próximos tres días de una ciudad. La desarrollé con ayuda de ChatGPT mediante Codex y utiliza la API externa Open-Meteo”.

**0:20–0:55 · Flujo principal.** Escribe Ciudad de México, pulsa Buscar ciudad y selecciona el resultado correcto. Señala temperatura, sensación térmica, humedad, viento y pronóstico. Explica que hay una petición para encontrar las coordenadas y otra para consultar el clima.

**0:55–1:20 · Errores.** Busca `zzzzzzzzzzzz` para mostrar el caso sin resultados. Si ensayas sin conexión, desactívala y realiza una búsqueda para mostrar el aviso; vuelve a activarla antes de continuar. Explica que HTTP 429 se maneja con un mensaje de espera, sin provocar intencionalmente un exceso de peticiones.

**1:20–2:10 · Código.** Abre `dist/api.js` y explica `requestJSON`: `fetch` solicita datos; `response.ok` comprueba el estado HTTP; `response.json()` convierte la respuesta; `catch` maneja errores; `finally` limpia el temporizador. En `app.js`, muestra que `showWeather` pasa latitud y longitud a la API y escribe el resultado en la interfaz usando `textContent`.

**2:10–2:40 · IA y aprendizaje.** Explica con honestidad qué generó la IA y qué probaste o cambiaste tú. Menciona un error real únicamente si lo detectaste y puedes explicar su solución. Muestra el README y las pruebas. Cierra indicando que no se necesitan claves secretas.

## Antes de presentar

Comprueba que puedes explicar: qué es una API; por qué se hacen dos peticiones; para qué sirven `await`, `try/catch`, `AbortController` y `URLSearchParams`; por qué el código valida datos; y cómo se evita interpretar como HTML el texto de la API. La tarea exige poder explicar cualquier línea del código.
