# Publicación con GitHub Pages

El proyecto incluye `.github/workflows/pages.yml` para probar y publicar `dist/` en cada cambio a `main`. No requiere claves ni instalar paquetes. Los archivos de documentación no se publican como parte de la página.

En el repositorio de destino, activa Settings → Pages → Build and deployment → Source → GitHub Actions. Después sube los archivos manteniendo las carpetas y revisa Actions → Publicar Clima Claro. La ejecución aprobada muestra la URL final en el entorno `github-pages`.

La URL y el repositorio de destino no se han configurado aún. Se requiere acceso a la cuenta y el enlace real para completar la publicación. Si la rama principal tiene otro nombre, debe ajustarse `branches` en el flujo.

Documentación oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
