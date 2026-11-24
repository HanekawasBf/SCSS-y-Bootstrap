# StockLab · Bootstrap 5 + SCSS

Panel administrativo de inventario hecho con Bootstrap 5.3 compilado desde su código fuente SCSS, con un sistema de diseño propio, modo claro/oscuro y componentes reutilizables.

## Tecnologías

Bootstrap 5.3 (SCSS) · Sass (Dart Sass) · Vite · Stylelint (`stylelint-config-standard-scss`) · JavaScript ES modules

## Comandos

```bash
npm install        # instala dependencias
npm run dev        # servidor de desarrollo en http://localhost:5173
npm run build      # genera la carpeta dist/
npm run preview    # sirve la versión de producción
npm run lint:css   # Stylelint sobre src/scss
```

## Retos resueltos

- [x] Reto 1: función `z($layer)` con `@error`, usada en la barra superior
- [x] Reto 2: medición del CSS (tabla de abajo)
- [ ] Reto 3: sidebar compacta
- [x] Reto 4: estado "descontinuado" (solo se modificó `_tokens.scss`)
- [ ] Reto 5: tema de contraste
- [x] Reto 6: buscador con fila "Sin resultados" y KPI "Stock bajo" dinámico

## Reto 2: tamaño del CSS

| Versión | CSS sin comprimir | CSS gzip |
| --- | --- | --- |
| Bootstrap completo (todos los componentes) | 244.29 kB | 33.22 kB |
| Importación selectiva (StockLab) | 186.40 kB | 26.19 kB |
| **Ahorro** | **57.89 kB (23.7 %)** | **7.03 kB (21.2 %)** |

La diferencia viene de no compilar componentes que el panel no usa (dropdown, navbar, accordion, carousel, popover, etc.).


## Preguntas de reflexión

1. **Variables antes de `variables.scss` y `!default`:** Bootstrap declara sus variables con `!default`, que significa "asigna este valor solo si la variable aún no existe". Si defino la mía antes, Bootstrap respeta mi valor; si la defino después, ya se usó el valor por defecto y mi cambio se ignora.
2. **`@use` vs `@import`:** `@use` crea un espacio de nombres por módulo (por ejemplo `t.$brand`) y carga cada archivo una sola vez. `@import` mete todo en el ámbito global y puede repetir el CSS si se importa varias veces.
3. **Variable CSS vs variable Sass:** la variable CSS fue indispensable en `var(--bs-body-bg)` y `--kpi-color`, porque cambian con el tema en el navegador. La de Sass fue mejor en `$stock-states`, porque `@each` genera los modificadores de los badges al compilar.
4. **`@extend %pill`:** evita repetir estilos y mantiene la forma de las "pastillas" en un solo lugar, sin generar una clase extra en el CSS. Con clases normales, `@extend` reescribe selectores en muchos sitios y puede producir CSS inesperado o muy grande.
5. **Ahorro de CSS:** ahorré unos 58 kB sin comprimir (≈ 24 %) y 7 kB en gzip. El riesgo en un equipo grande es que alguien use un componente que ya no está importado y no vea sus estilos, por eso hay que documentar qué parciales están activos.
