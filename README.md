# meowrhino linktree

Colección de herramientas web de meowrhino.studio, presentadas en un linktree minimalista y elegante.

## Características

- **Estética meowrhino**: Diseño limpio y minimalista inspirado en imgToWeb
- **Estructura modular**: Todos los links se gestionan desde `data.json`
- **Desplegables animados**: Grupos expandibles con transiciones suaves
- **Estados visuales**: Los links muestran su estado (wip, beta, test, finished)
- **Responsive**: Adaptado para todos los dispositivos

## Estructura del proyecto

```
linktree/
├── index.html      # Estructura HTML principal
├── styles.css      # Estilos con la estética meowrhino
├── script.js       # Lógica para cargar y renderizar links
├── data.json       # Configuración de todos los grupos y links
├── manus/          # Archivos de proceso y documentación
└── README.md       # Este archivo
```

## Configuración de data.json

El archivo `data.json` contiene un array de grupos. Cada grupo tiene:

- `name`: Nombre del grupo
- `isDropdown`: Boolean que indica si es un desplegable
- `items`: Array de links con:
  - `name`: Texto del link
  - `url`: URL de destino
  - `status`: Estado del link (finished, wip, beta, test)

### Ejemplo de grupo normal:

```json
{
  "name": "conversores",
  "isDropdown": false,
  "items": [
    {
      "name": "imgToWeb",
      "url": "https://meowrhino.github.io/imgToWeb/",
      "status": "finished"
    }
  ]
}
```

### Ejemplo de grupo desplegable:

```json
{
  "name": "formateadores",
  "isDropdown": true,
  "items": [
    {
      "name": "jaume",
      "url": "https://jaumeclotet.com/formateador.html",
      "status": "finished"
    }
  ]
}
```

## Estados de los links

- **finished**: Link completamente funcional (estilo normal)
- **wip**: Work in progress (apagado, badge naranja)
- **beta**: En fase beta (apagado, badge azul)
- **test**: En fase de testing (apagado, badge morado)

## Tecnologías

- HTML5
- CSS3 (vanilla, sin frameworks)
- JavaScript vanilla (sin dependencias)

## Créditos

Desarrollado por [meowrhino.studio](https://meowrhino.studio)
