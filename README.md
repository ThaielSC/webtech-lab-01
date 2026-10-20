# WebTech Lab 01 - Personal Page

**Estudiante:** Thaiel Mauricio Santiago Coba  
**Carrera:** Ingeniería en Ciencias de la Computación  
**Año de Ingreso:** 2022  

## Sitio Publicado (GitHub Pages)
🔗 **URL del sitio:** [https://ThaielSC.github.io/webtech-lab-01/](https://ThaielSC.github.io/webtech-lab-01/)

## Repositorio
🔗 **Repositorio GitHub:** [https://github.com/ThaielSC/webtech-lab-01](https://github.com/ThaielSC/webtech-lab-01)

## Wheelhouse (Lab 10)

La sección Wheelhouse obtiene servicios desde `http://localhost:3000/api/v1`
con `fetch`. Inicia la API en el puerto **3000**, siguiendo el
[README de Wheelhouse](https://github.com/ThaielSC/webtech-wheelhouse).
Los precios se muestran en USD con dos decimales.

Para desarrollar la página, desde este directorio ejecuta:

```bash
python3 -m http.server 5500 --bind localhost
```

Abre `http://localhost:5500`; no abras `index.html` desde el sistema de archivos.
La API permite únicamente ese origen y `https://thaielsc.github.io` para las
consultas públicas de servicios. La página nunca envía un token.

En GitHub Pages, publica la rama con estos cambios desde `/ (root)`.
