**Revisión final focalizada — Reading Is Unnatural**

Se corrigió la cobertura de etiquetas por controles, se mejoró la presentación de nombres y años, y se añadieron señales visuales de interacción. **El tamaño mínimo legible a cualquier zoom sigue pendiente**: los mecanismos actuales escalan el texto con el mapa. Las restricciones no permiten introducir la compensación de escala o la redistribución necesarias para garantizarlo.

El estado de partida ya incluía el resumen del perfil oculto y el borde LED morado. Ambos se verificaron durante esta revisión. El [informe anterior](historial-segunda-revision.md) se conserva como registro histórico de sus propias mediciones; las siguientes evidencias corresponden a esta revisión final.

**Problemas, cambios y estado comprobado**

| Aspecto / regla | Problema y componente | Corrección de presentación aplicada | Evidencia | Estado y pendiente |
|---|---|---|---|---|
| **Legibilidad de mapas — regla 2** | Etiquetas de 12–13 px que se reducían a unos 6 px. Nombres largos del perfil extendidos en una sola línea. | Nombres del perfil a **16 px**, con anchura acotada y saltos de línea; nombres, títulos y años de exploración/artículos a **14 px**. Se conservaron porcentajes y nombres simulados. | [Perfil móvil](evidencia/final-mapas/after-profile-320-initial.png), [exploración a escala intermedia](evidencia/final-mapas/after-hierarchy-320-middle.png), [mediciones de zoom](evidencia/final-mapas/mediciones-zoom.json). | **Parcial.** A escala intermedia se leen etiquetas de 14,52–16,59 px en React. Al alejar quedan etiquetas de **7–8 px**; el SVG independiente llega a **3,9 px**. No se considera satisfecho el objetivo de lectura en todos los niveles. |
| **Solapamientos y recortes — reglas 3 y 4** | Los controles y el minimapa tapaban nombres. Los años de artículos sobresalían del área medida del nodo; las líneas pasaban detrás de nombres. | Controles y minimapa en una franja separada del dibujo. Fondos oscuros sólidos en etiquetas. Años en el flujo visual del nodo; tarjetas de artículos ajustadas para conservar separación. En el HTML, leyenda/buscador y ayuda ocupan filas propias; el texto SVG tiene un contorno oscuro. | [Perfil antes](evidencia/final-mapas/before-profile-320-initial.png) / [después](evidencia/final-mapas/after-profile-320-initial.png), [artículos móviles](evidencia/final-mapas/after-articles-320-initial.png), [SVG en escritorio](evidencia/final-mapas/after-standalone-1440-initial.png). | **Cobertura con controles corregida en la muestra; regla global parcial.** Cero intersecciones visibles entre texto y controles en 64 casos. Cero cruces de cajas de texto entre nodos distintos en los 48 casos React. Persisten colisiones del SVG y recortes en límites del lienzo al ampliar/desplazar o cuando la vista no puede abarcar todas las ramas. |
| **Acceso a información — reglas 1 y 4** | Resultaba difícil reconocer qué círculos eran interactivos y cómo abrir sus opciones. | Cursor de interacción, contornos de hover y foco, títulos nativos con el nombre completo e indicación de clic/clic derecho. El botón + y el acceso a artículos tienen ayudas específicas. Instrucciones visibles coherentes con los eventos existentes. | [Interacción y foco](evidencia/final-mapas/interaccion-y-textos.json): hover de 1 px, foco visible de 2 px en morado y apertura del menú con clic derecho real en 320 y 1440 px. | **Parcial.** Se mejoraron las señales. No se añadió ningún botón, evento, gesto táctil ni atajo para abrir el menú. La disponibilidad del menú contextual en móvil continúa dependiendo del comportamiento existente del navegador; los títulos al pasar el puntero no resuelven el acceso táctil. |
| **Terminología — regla 1** | «Tópico» no resultaba claro para el primer uso. Otros términos proceden de datos/simulaciones. | La ayuda explica «Tópico significa tema de investigación». Las ayudas de los nodos hablan de detalles, opciones y alternativas de ejemplo. | [Explorador en escritorio](evidencia/final-mapas/after-hierarchy-1440-initial.png), [diff final](evidencia/final-mapas/cambios-finales.diff). | **Parcial.** No se alteraron «Machine Learning», «RLHF / DPO», «grafo», «papers» ni otros términos incorporados a datos o respuestas simuladas. |
| **Redundancia — regla 5** | El detalle del perfil repetía su categoría, ya visible en el encabezado. La instrucción vacía del explorador repetía parte de la ayuda. | El detalle explica únicamente «Las conexiones indican etiquetas compartidas» (**5 palabras**, frente a 12 en la presentación anterior). Se acortó el estado vacío y se concentró la guía de interacción. | [Diff final](evidencia/final-mapas/cambios-finales.diff); comprobación de selección y detalle en [pruebas adicionales](evidencia/final-mapas/interaccion-y-textos.json). | **Corregido en esos textos de presentación; cumplimiento global parcial.** No se simplificó el contenido de las simulaciones. |

**Verificación en escritorio, móvil y distintos niveles de zoom**

Se comprobaron cuatro mapas —perfil, exploración con ramas desplegadas, artículos y HTML independiente— en **320 × 844, 390 × 844, 1024 × 900 y 1440 × 900 píxeles CSS**. Para cada uno se registraron vista inicial, alejamiento, escala intermedia y acercamiento: **64 combinaciones**. Los niveles se alcanzaron mediante los controles existentes, esperando las transiciones; no se inyectaron transformaciones ni se modificó el estado interno de la aplicación.

Los siguientes valores corresponden a **nombres y títulos**, no a porcentajes, estrellas o iconos. Son tamaños efectivos en pantalla: fuente CSS multiplicada por la transformación medida del mapa.

| Mapa a 320 px | Vista inicial | Alejado | Escala intermedia | Cercano |
|---|---:|---:|---:|---:|
| Perfil | 9,87 px (zoom 0,61710) | 8 px (0,5) | 16,59 px (1,0368) | 32 px (2) |
| Exploración | 7 px (0,5) | 7 px (0,5) | 14,52 px (1,0368) | 28 px (2) |
| Artículos | 7 px (0,5) | 7 px (0,5) | 14,52 px (1,0368) | 28 px (2) |
| HTML/SVG | 13 px (1) | 3,9 px (0,3) | 18,82 px (1,44804) | 39 px (3) |

El incremento de la fuente nominal **no demuestra por sí mismo una mejora equivalente en la vista inicial**: el ajuste automático existente vuelve a calcular el encuadre a partir del espacio y las dimensiones de los nodos. Por ejemplo, el perfil móvil mantiene un tamaño efectivo próximo al anterior en su vista inicial, aunque mejora la distribución y tiene fondos de lectura más claros. No se declara resuelto ese problema.

Resultados de las comprobaciones:

- **0 errores de ejecución** y **0 desbordamientos horizontales de página** en los 64 casos. Esto no implica que todos los nodos entren en el lienzo a cualquier zoom.
- **0 coberturas visibles de texto por controles/minimapa** en la muestra. El cálculo considera el área realmente visible del dibujo: el texto que queda fuera de ella se registra como recortado, no como superposición con la franja de herramientas.
- **0 cruces entre cajas de texto de nodos distintos en los 48 casos React**. El SVG conserva candidatos a colisión de etiquetas, por ejemplo entre «Visión por Computadora» y «Modelos de Difusión». No se garantiza ausencia de colisiones para cualquier cantidad de nodos o distribución futura.
- **10 comprobaciones adicionales**, a 320 y 1440 px: texto dentro de límites de los nodos, separación de herramientas, contraste en los mapas React, hover, foco, selección, apertura contextual y conservación del estado visual previo. No se detectaron recortes internos del texto en las seis muestras de mapas React de esta comprobación.
- En esas muestras React, el menor contraste medido fue **8,9539:1**. Un buen contraste no convierte una etiqueta de 7 px en texto legible. No se certifica la conformidad WCAG completa de la aplicación. El criterio de contraste de texto normal utiliza 4,5:1. [WCAG 2.2, explicación de 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- El resumen del perfil continuó oculto y el feedback del campo conservó su animación `input-led-glow` y borde de 2 px.

**Límites que requieren cambios de funcionamiento**

1. **Tamaño mínimo independiente del zoom.** El texto forma parte del contenedor transformado por React Flow o del grupo SVG transformado por D3. Una garantía robusta requeriría compensar la escala mediante código o cambiar el mecanismo de representación. No se añadieron hooks, lecturas de estado, callbacks de zoom ni selectores frágiles que dependan del texto de una transformación.
2. **Colisiones de etiquetas en el SVG y distribuciones densas.** Las fuerzas consideran los círculos, no la anchura completa del texto. Resolver todas las colisiones exigiría intervenir en distribución, simulación o representación. Se conserva este pendiente.
3. **Recortes en bordes del lienzo.** Se eliminaron las obstrucciones de herramientas, pero ampliar el mapa deja información fuera del área de dibujo. En exploración móvil también puede ocurrir en la vista inicial por el límite mínimo de zoom existente. Los detalles y el desplazamiento ya implementados siguen disponibles; no se añadieron cambios de encuadre, escala, pan ni restricciones de movimiento.
4. **Acceso alternativo al menú contextual.** Una entrada explícita para toque o teclado requeriría nuevos controles o eventos. Solo se mejoraron las señales visuales de la interacción actual.
5. **Terminología y extensión de simulaciones.** Se preservaron sus cadenas y datos. No se realizaron traducciones ni simplificaciones de resultados simulados.

**Evidencia y preservación del código**

- [Mediciones finales con zoom](evidencia/final-mapas/mediciones-zoom.json): escala real, tamaños efectivos, rectángulos de texto, herramientas, colisiones y recortes por caso.
- [Mediciones iniciales](evidencia/final-mapas/mediciones-antes.json): 32 casos de referencia en los dos anchos extremos. En el SVG se conservan sus escalas reales registradas; no se presenta una comparación a escalas idénticas cuando estas difieren.
- [Comprobaciones adicionales](evidencia/final-mapas/interaccion-y-textos.json): foco, hover, títulos, menú, contraste y límites internos de los nodos.
- [Comparación del código](evidencia/final-mapas/verificacion-codigo.json) y [diff exclusivo de esta revisión](evidencia/final-mapas/cambios-finales.diff): **50 archivos comparados, 36 idénticos byte a byte y 14 modificados solo en presentación/redacción**. Los scripts del HTML independiente son idénticos byte a byte; sus identificadores, enlaces, fuentes de scripts y atributos de eventos también se conservaron.

La comparación del AST excluye atributos de presentación, texto visible y la expresión de formato redundante de categoría eliminada del párrafo de `NodeDetail`; la categoría permanece en su encabezado. Conserva las comprobaciones de funciones, eventos, condiciones, estados y propiedades funcionales. Hooks, datos, tipos, utilidades, dependencias y configuración no cambiaron. No se tocaron `fitView`, sus parámetros, límites de zoom, selección, expansión ni generación simulada. Cambiaron dimensiones de presentación y el ajuste existente responde a ellas con su comportamiento habitual.

Las capturas finales aíslan el área del mapa; las iniciales de referencia muestran la página completa. La inspección fue técnica y heurística en Chrome headless, no un estudio con usuarios ni una prueba en dispositivos físicos.

`npm run build` y `git diff --check` finalizaron correctamente.
