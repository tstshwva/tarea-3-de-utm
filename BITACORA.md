# Bitácora de programación con IA

**Proyecto:** Clima Claro · **Fecha:** 14 de octubre de 2026 · **Herramienta:** ChatGPT mediante Codex.

## Registro comprobable de esta sesión

**Prompt real del usuario:** «lo de github ya lo hice haz todo lo que pide porfa».

**Respuesta y resultado:** la IA leyó la tarea, eligió una aplicación del clima con Open-Meteo y generó la aplicación, pruebas y documentación. Las siete pruebas automáticas pasaron. La consulta real desde la terminal falló por resolución de nombres de la red del entorno; eso no comprueba una falla de Open-Meteo. La verificación de extremo a extremo se debe registrar por separado.

**Ajustes:** se añadieron validación de respuestas incompletas, cancelación a los 12 segundos, selección entre ciudades con nombres parecidos y tratamiento de errores HTTP 429. Se evitaron resultados anteriores visibles cuando una nueva consulta falla.

## Cinco prompts para continuar y registrar resultados reales

Estos textos fueron redactados por la IA en esta sesión. No representan cinco consultas anteriores del estudiante. Para cumplir el requisito de la tarea deben utilizarse y registrarse la respuesta, si funcionó a la primera y los ajustes efectivamente realizados.

1. «Explícame el flujo de Clima Claro desde que envío el formulario hasta que se muestra el pronóstico. Usa las funciones reales de app.js y api.js y hazme tres preguntas para comprobar que lo entendí».
2. «Revisa requestJSON en api.js. Explica cómo maneja falta de conexión, HTTP 429, JSON inválido y tiempo de espera. Señala un caso que falte y propón cómo probarlo».
3. «Ayúdame a probar Clima Claro manualmente con una ciudad válida, una inexistente y sin conexión. Dame pasos y resultados esperados; yo te diré qué observé antes de concluir si pasó».
4. «Revisa la accesibilidad y la vista móvil de index.html y styles.css. Propón un cambio pequeño, explícalo y ayúdame a comprobarlo con teclado».
5. «Revisa mis resultados de pruebas y mis cambios. Ayúdame a redactar una reflexión basada solo en lo que hice y un resumen del error real que encontré, sin inventar experiencias».

Para cada consulta registra: **respuesta recibida / funcionó a la primera / corrección realizada / resultado de la nueva prueba**.

## Error de IA y reflexión

En la primera implementación generada por la IA faltaba el código WMO 97 (tormenta intensa). La revisión del asistente contra la documentación oficial de Open-Meteo detectó la omisión: antes habría mostrado “Condición no disponible”. Se añadió 97 al grupo de tormentas y una prueba de regresión. Esto es un error real del código generado, detectado por el asistente; no se atribuye su detección al estudiante. El estudiante debe revisar y explicar el caso para incorporarlo a su reflexión. Un problema de red del entorno no debe presentarse como error de IA.

Puntos para la reflexión personal: qué aprendiste sobre `fetch`, respuestas JSON y manejo de errores; qué parte puedes explicar sin ayuda; y qué instrucciones más precisas darías a la IA la próxima vez. Redacta estas conclusiones después de probar y estudiar la app. Este registro no acredita por sí solo los cinco prompts ni sustituye la reflexión personal exigida.
