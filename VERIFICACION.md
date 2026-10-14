# Verificación

- Ocho pruebas automáticas de errores y validación: aprobadas el 14 de octubre de 2026.
- Error real de la implementación inicial de la IA: faltaba el código meteorológico 97. Se comprobó en la documentación oficial, se añadió a las tormentas y se agregó una prueba de regresión. Lo detectó el asistente durante la revisión, no el estudiante.
- Consulta real: el primer intento falló por DNS en el entorno restringido. Al repetir con acceso autorizado a la red, geocodificación y pronóstico respondieron correctamente, con datos actuales y cuatro días.
- Las pruebas automáticas simulan respuestas; no sustituyen una prueba del flujo completo en navegador.
- No se simularon pruebas realizadas por el estudiante, autoría de código ni commits históricos.

Prueba manual pendiente del estudiante: buscar una ciudad, seleccionarla, comprobar datos, buscar otra, probar nombre inexistente, desconexión, navegación con teclado y pantalla móvil. Registrar el resultado observado.
