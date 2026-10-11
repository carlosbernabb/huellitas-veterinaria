# Huellitas Clínica Veterinaria

Sitio web de una clínica veterinaria ficticia ubicada en el centro de Querétaro. Es el proyecto final de la materia de desarrollo web y junta todo lo que vimos en el curso, HTML5, CSS3, JavaScript, jQuery y el plugin bxSlider.

## Páginas

| Página | Archivo | Qué tiene |
|---|---|---|
| Inicio | `index.html` | Slider con bxSlider, tarjetas, contadores animados y calculadora de edad de mascotas |
| Nosotros | `nosotros.html` | Historia, misión, visión, valores, equipo y testimonios con bxSlider |
| Servicios | `servicios.html` | Buscador, filtros por categoría y preguntas frecuentes en acordeón |
| Contacto | `contacto.html` | Formulario validado con JavaScript y mapa interactivo con Leaflet |

## Funcionalidades

**JavaScript**
- Fecha y hora actual en la barra superior, se actualiza cada segundo
- Validación del formulario de contacto con nombre, correo, asunto y mensaje
- Botón para ir arriba
- Tema oscuro que se guarda en el navegador
- Calculadora de edad de perros y gatos en años humanos

**jQuery**
- Eventos con `on`, `click`, `input`, `submit` y `scroll`
- Efectos con `slideToggle`, `slideUp`, `slideDown`, `fadeIn`, `fadeOut` y `animate`
- Manipulación del DOM con `html`, `text`, `addClass`, `removeClass` y `css`

**Plugins y librerías**
- bxSlider 4.2.15 para el carrusel de inicio y los testimonios
- Leaflet 1.9.4 con OpenStreetMap para el mapa
- Font Awesome 6.5.2 para los íconos

## Estructura

```
huellitas-veterinaria/
├── index.html
├── nosotros.html
├── servicios.html
├── contacto.html
├── css/
│   └── estilos.css
├── js/
│   ├── principal.js   fecha y hora, tema, menú y botón ir arriba
│   ├── inicio.js      bxSlider, contadores y calculadora
│   ├── nosotros.js    testimonios y tarjetas del equipo
│   ├── servicios.js   buscador, filtros y acordeón
│   └── contacto.js    validación del formulario y mapa
└── img/
```

## Cómo verlo

Descarga o clona el repositorio y abre `index.html` en el navegador. jQuery, bxSlider, Leaflet y Font Awesome se cargan por CDN, así que se necesita internet.

## Autor

Carlos Bernabé Becerra Zúñiga · 00519126 · Universidad Anáhuac Querétaro
