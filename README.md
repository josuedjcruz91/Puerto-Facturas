# PUERTO FACTURA · TechStore

Proyecto React + Vite para registrar facturas, consultar clientes en Hacienda, exportar PDF/XML y analizar ventas. No incluye un backend fiscal: `json-server` simula la persistencia en `db.json`; los archivos PDF/XML se generan en el navegador.

## Ejecutar

Requiere Node 22.12+ o Node 24 y npm. Desde la carpeta que contiene `package.json`:

```bash
npm install
npm run dev:all
```

Abre la URL indicada por Vite (normalmente http://localhost:5173; si está ocupado usa otro puerto). json-server escucha en http://localhost:3001/invoices.

Alternativa en dos terminales: `npm run server` y `npm run dev`. `Ctrl+C` detiene los procesos. json-server actualiza `db.json`; no se necesita base de datos real.

```bash
npm test
npm run lint
npm run build
npm run preview
```

## Crear una factura con cliente verificado

1. Abre **Crear factura**, revisa emisor, número editable y fecha.
2. Selecciona cédula física, jurídica, NITE o DIMEX e introduce la identificación.
3. Tras 700 ms sin escribir, si el formato es válido, se consulta automáticamente Hacienda. No se consulta en cada tecla ni se reintenta en bucle.
4. Se autocompletan nombre/razón social, tipo reportado, régimen, situación tributaria y actividades disponibles. El nombre verificado es de solo lectura. **Correo y dirección se ingresan manualmente**: ese endpoint no los proporciona.
5. Si Hacienda confirma ausencia (404 o registro vacío), aparece **USUARIO NO REGISTRADO** en rojo debajo de la casilla de identificación, asociada con `aria-describedby`. No se puede guardar ni terminar la factura.
6. Un formato incompleto/incorrecto, HTTP 400, límite 429, caída de red o respuesta malformada tienen mensajes distintos. No se presenta una caída como si la persona no existiera. El guardado permanece bloqueado hasta conseguir una verificación positiva. **Reintentar** permite una nueva consulta manual tras el error.
7. Cambiar identificación o tipo invalida inmediatamente la verificación y limpia los datos del cliente, incluyendo contacto, para no reutilizar los de otra persona. Se cancelan y descartan consultas anteriores.
8. Agrega los productos/servicios con cantidad y precio positivos y pulsa **Guardar factura**. Tanto el formulario como la página comprueban la verificación de la cédula actual antes del POST. Se conserva el resultado consultado junto al registro.
9. El detalle permite preparar y descargar PDF y XML del mismo documento, además de imprimir.

La verificación de cliente es una regla de este proyecto, no una declaración de obligación fiscal. Se aplica a nuevas facturas del formulario. Las facturas precargadas y las importaciones marcadas como simulación no hacen consultas reales ni necesitan una identidad fiscal real.

## Consulta de Hacienda y proxy

Se utiliza `GET https://api.hacienda.go.cr/fe/ae?identificacion=...`, según la [documentación oficial](https://api.hacienda.go.cr/docs).

- Física: elimina guiones/espacios y un cero inicial cuando hay 10 dígitos; exige 9 finales.
- Jurídica/NITE: acepta 10 dígitos, o 12 incluyendo verificadores finales que se eliminan, conforme a las reglas solicitadas para este proyecto.
- DIMEX: conserva 11 o 12 dígitos; no se trunca como una cédula jurídica.
- Caché en memoria por tipo/identificación: respuestas positivas durante 10 minutos y ausencia confirmada durante 1 minuto. La caché desaparece al recargar.
- Timeout de 12 segundos y cancelación de solicitudes obsoletas. No se cachean errores de conexión ni respuestas inválidas.
- `contribuyentes` en `db.json` queda reservada para persistencia futura de la caché.

`vite.config.js` incluye el proxy `/hacienda` → `https://api.hacienda.go.cr`, con `changeOrigin` y eliminación del prefijo. Funciona al iniciar Vite, evita CORS en desarrollo y no evita caídas/límites de Hacienda.

Copia `.env.example` a `.env.local` para cambiar `VITE_API_URL` o `VITE_HACIENDA_URL`; reinicia Vite. En producción/`vite preview` no funciona el proxy de desarrollo: se usa la URL pública. Si CORS impide la consulta, configura un proxy del despliegue e indica su URL antes de compilar.

El identificador público `2100042005` del ejemplo oficial permite verificar la respuesta `ESTADO-MINISTERIO DE HACIENDA`. No es un cliente ficticio para emitir comprobantes: solo se usa en pruebas de lectura.

## Archivar PDF, XML e imprimir

En el detalle:

- **Preparar PDF** genera `factura-{numero}.pdf`.
- **Preparar XML** genera `factura-{numero}.xml`.
- Ambos enlaces permanecen disponibles simultáneamente; pulsa cada enlace para guardar el archivo en tu equipo.
- No se inicia ninguna descarga al abrir una factura ni en efectos de React. La preparación está bloqueada mientras hay otra en curso y no se repite para un formato ya preparado. Las URL temporales se liberan al salir del detalle.
- **Imprimir** abre el diálogo del navegador. Selecciona A4 y, si lo deseas, desactiva encabezados/pies del navegador. `src/print.css` oculta navegación, mensajes y botones.

PDF usa html2canvas + jsPDF cargados bajo demanda para capturar el mismo componente de pantalla con ancho fijo y paginar procurando no cortar filas/bloques. Es rasterizado (texto no seleccionable); documentos enormes quedan sujetos a los límites de canvas. No repite encabezados de tabla en el PDF; la impresión HTML sí permite repetirlos.

XML utiliza el formato propio `FacturaInterna`, con emisor, cliente (incluyendo contacto ingresado), partidas, condiciones e importes derivados. Los textos se escapan correctamente. **Son documentos de archivo del proyecto; no son XML firmados/autorizados por Hacienda y no se envían a ningún servicio fiscal.** No hacen falta credenciales fiscales, certificados ni backend de emisión para este alcance.

## Panel y temas

`/resumen` muestra ventas sin impuestos, total facturado, impuestos, cantidad y promedio por factura. Gráficas por semana/mes/año con selección de métrica y origen (manual/simulación); tabla ordenable por fecha, ventas o cantidad.

Semanas de lunes a domingo. En un año seleccionado solo cuentan las fechas de ese año, aunque la semana cruce un límite anual. El modo anual compara todos los años; los meses/semanas sin ventas muestran cero. Importes separados por moneda (USD/CRC); no se equiparan ventas con cobros o utilidad.

El selector superior permite **Faro (rojo oscuro)**, **Océano (azul claro)** o **Marea (verde y blanco)** y conserva la elección en localStorage cuando está disponible. El documento conserva papel blanco legible.

## Archivo anual simulado

En `/simulacion` descarga [simulacion-facturas-2025.md](public/simulacion-facturas-2025.md): **119 facturas ficticias de 2025**, USD 23.243,00 sin impuestos y USD 26.264,59 con impuestos.

Selecciona el `.md`, revisa la vista previa y pulsa **Importar facturas simuladas**. No se importa automáticamente. Se marca su origen como simulación y nunca se consulta Hacienda para estos registros.

Formato: un bloque JSON con `schema: "factura-demo-v1"`, `simulation: true`, `year` e `invoices`. Máximo 2 MB y 2000 facturas. Valida fechas reales del año, moneda USD, identificaciones, partidas e importes; solo copia campos permitidos. No ejecuta HTML/JavaScript ni instrucciones Markdown. Omite números existentes y permite reintentar una importación parcial sin duplicarlos. El servicio impide dos importaciones simultáneas dentro de la misma sesión.

## Estructura y decisiones

- `src/app`, `src/routes`: layout, router y rutas.
- `src/pages`: orquestación; `src/components`: componentes reutilizables y documento puro `Invoice` por props.
- `src/services`: persistencia HTTP, consulta fiscal, lectura/importación de archivo y generación PDF.
- `src/hooks`: estado de facturas y consulta automática; `src/utils`: cálculos, formatos, validación, estadísticas, parser y XML puros.
- `invoiceService`: `getAll`, `getById`, `create`, `remove`, `markPaid`; configurable para migrar a una API real.
- `src/constants/tax.js`: catálogo de IVA por código, con 13% predeterminado y selección por línea. Las tarifas se conservan en cada factura.
- Redondeo por partida a centavos e impuesto por línea en nuevas facturas (los documentos anteriores conservan el cálculo sobre subtotal); no se guardan totales independientes que puedan desincronizarse.
- `db.json` incluye FAC-0001: TechStore S.A. → Juan Pérez; Teclado 2 × $25, Monitor 1 × $180, Mouse 3 × $12; subtotal $266, impuesto $34.58, total $300.58. Datos personales ficticios.

## Límites del proyecto

json-server simula persistencia, sin autenticación ni unicidad atómica. Las validaciones del cliente son para la demostración y una API real deberá aplicarlas de nuevo. No se incluye emisión fiscal, firma XML ni consulta de aceptación. PDF/XML se guardan explícitamente en el equipo; `db.json` conserva el registro de la factura, no los archivos binarios generados.

## Información tributaria ampliada

La consulta automática muestra un panel reutilizado en el formulario y en el detalle de la factura:

- Registro encontrado y **estado de inscripción exacto** devuelto por Hacienda.
- **Moroso** y **Omiso**, con advertencia visible cuando la respuesta indica `SI`/`SÍ`. `NO` se muestra como «No»; un campo ausente o desconocido no se convierte en «No».
- Tipo de identificación, régimen (código y descripción), administración tributaria y actividades con código, descripción, estado y tipo tal como se reciben.
- Un desplegable con **toda la respuesta original** para consultar cualquier campo adicional.

Encontrar un registro y estar al día son condiciones distintas. La morosidad/omisión son advertencias informativas, sin bloqueo adicional del guardado. Se mantiene el bloqueo de identidad no encontrada o no verificada. No se infiere una deuda, su monto ni otras obligaciones a partir de los indicadores; el panel presenta lo devuelto por el endpoint.

La fecha corresponde a cuando se obtuvo la respuesta de Hacienda, incluso si se reutiliza desde la caché de 10 minutos. El detalle muestra una copia histórica guardada con la factura y no hace nuevas consultas automáticamente. Los registros anteriores o simulados que no tengan consulta guardada lo indican expresamente.

El PDF incluye un resumen histórico de inscripción, morosidad, omisión, régimen y administración. El XML interno incluye `ConsultaHacienda` con la fecha, indicadores y `RespuestaOriginal` (JSON escapado), conservando todos los campos recibidos. No implica emisión ni aceptación fiscal de la factura.

## Tipo de cambio GoMeta: USD ↔ CRC

El formulario consulta [el endpoint solicitado de GoMeta](https://apis.gometa.org/tdc/tdc.json) por **HTTPS**. Se verificó una respuesta real con `compra`, `venta`, `compra_date` y `venta_date`; no se utilizan tasas hardcodeadas.

- Selecciona **USD · Dólares** o **CRC · Colones** en **Moneda y tipo de cambio**.
- **Venta** es la selección inicial del proyecto. Puedes elegir **Compra** antes de la primera conversión; cada una conserva su fecha específica.
- Al cambiar de moneda se convierten los precios unitarios: USD → CRC multiplica por la tasa; CRC → USD divide. Se redondea cada precio a dos decimales y luego se recalculan subtotal, impuesto y total. Cambios repetidos de moneda pueden introducir diferencias de centavos por ese redondeo.
- Tras la primera conversión, la tasa y su tipo quedan fijados para esa factura. Los siguientes cambios usan esa misma tasa; no se modifica silenciosamente una conversión ya realizada.
- Se muestra un equivalente del total en la otra moneda. Es una referencia; la moneda elegida es la que corresponde a los ítems y totales de la factura.
- El registro conserva `exchangeRate` con tasa, tipo, fecha, fuente y momento de consulta. PDF y XML incluyen esta información y el equivalente; al abrir una factura histórica no se vuelve a consultar el cambio actual.
- Caché de 5 minutos, timeout de 12 segundos y reintento manual ante fallos. No se inventa una tasa. Si no hay tasa, se pueden ingresar importes en la moneda seleccionada; no se pueden convertir precios existentes. Puedes elegir la moneda de un formulario con todos los precios vacíos aun sin conexión.
- Una fecha de tasa diferente de hoy genera un aviso visible y se conserva tal como la devuelve la fuente. No se promete que una tasa antigua sea del día actual.
- El listado separa importes facturados en USD y CRC. Las gráficas tienen filtro de moneda y no suman colones y dólares entre sí. El archivo de simulación anual sigue siendo USD.

`src/services/exchangeRateService.js` hace I/O; `src/hooks/useExchangeRate.js` maneja carga/error; `src/utils/currency.js` valida la respuesta y realiza conversiones puras. `vite.config.js` añade `/tipo-cambio` → `https://apis.gometa.org`. Vite reinicia al cambiar esta configuración. En despliegue se usa directamente HTTPS o la URL completa configurada en `VITE_EXCHANGE_URL`; el proxy de desarrollo no se incluye en el build.


## Dashboard administrativo y demostración del reto

Selecciona **Administrador** en «Perfil de demostración» y abre `/admin`. El perfil Empleado puede crear/consultar facturas; las rutas `/admin`, `/resumen` y `/simulacion` están protegidas por `AdminOnly` y su navegación está oculta para empleados. El selector y el rol en localStorage son una **simulación**, sin contraseña: para producción se necesita autenticación y autorización en una API real. json-server sigue siendo público en el entorno local.

En el dashboard pulsa **Cargar reto de 8 facturas**. Se agregan por POST a `db.json`, sin borrar las facturas existentes ni duplicar los números del reto al reintentar. Se selecciona automáticamente su filtro. Después de recargar puedes volver a elegir «Reto administrativo · 8 facturas». Los gráficos consumen los registros recuperados por `invoiceService`, nunca el dataset directamente.

La [captura del dashboard](docs/dashboard-administrativo.png) muestra el reto cargado desde json-server con la factura atípica y dos vencidas.

Resultado inicial del reto:

| Métrica | Resultado |
| --- | --- |
| Total con IVA | USD 3.825,00 |
| Facturas | 8 |
| Ticket promedio | USD 478,13 |
| Atípicas | 1: ADMIN-DEMO-004, USD 2.450,00 |
| Pagadas / pendientes / vencidas | 5 / 1 / 2 |
| Primer cliente | Comercial Horizonte S.A., USD 2.640,00 |
| Proyección del siguiente mes | USD 1.275,00 estimados |

Las fechas de la carga inicial se generan respecto de la fecha de Costa Rica; al menos dos vencen antes de hoy, una vence siete días después y cinco tienen `paidAt`. Una vez guardadas, las fechas y pagos se conservan: con el paso de los días o al registrar pagos los conteos cambiarán correctamente. Los importes del reto usan tratamiento exento de simulación para coincidir exactamente con los ocho totales solicitados.

### Cálculos derivados

`src/utils/adminAnalytics.js` contiene JavaScript puro. `AdminDashboardPage` lo invoca con `useMemo`, dependiente del arreglo de facturas, la moneda, el origen y la fecha actual. La aplicación recarga al cambiar facturas, volver a enfocar la ventana, cada 30 segundos y al pulsar Actualizar; la fecha de Costa Rica se comprueba cada minuto.

- Total: suma de `calculateTotals(items, taxRate).total`; ticket = total / cantidad. Vacío produce 0.
- Ranking: agrupa por tipo e identificación normalizada, suma importes y ordena de mayor a menor; empates por nombre. Muestra los tres primeros. Identificaciones iguales representan al mismo cliente, aunque se hayan escrito nombres distintos en la simulación antigua.
- Desviación estándar **poblacional**: `σ = sqrt(sum((total − promedio)²) / N)`. Es atípica si `abs(total − promedio) > 1.5 × σ`. Si no hay registros o σ = 0 no hay atípicas. La señal es estadística, no una afirmación de fraude.
- Recharts proporciona un gráfico de barras mensual y un gráfico de anillo por cliente. El gráfico mensual cubre los últimos doce meses hasta el actual; el ranking y la distribución consideran todo el historial filtrado. Los cinco mayores clientes se muestran individualmente en el anillo y el resto se agrupa en «Otros clientes». Hay tabla desplegable para los valores mensuales y leyenda con montos.
- USD y CRC se analizan separadamente. Todos estos montos incluyen IVA y representan facturación, no utilidad ni cobro efectivo.

### Proyección de ingresos

Se estima el **mes siguiente** mediante el promedio móvil de los **tres meses completos anteriores al mes actual**. Se excluyen el mes actual parcial y fechas futuras; se incluyen meses intermedios sin facturas como cero. Si el historial comenzó hace menos de tres meses se usan los meses completos disponibles desde la primera factura. Sin meses anteriores se muestra «Sin historial suficiente».

Ejemplo del reto cargado en septiembre de 2026: junio USD 2.835, julio USD 620 y agosto USD 370; `(2835 + 620 + 370) / 3 = 1275` para octubre. El panel muestra los meses base y la etiqueta «Estimación · No es un ingreso real». Es un promedio sin tendencia ni estacionalidad y puede verse influido por facturas atípicas, que no se eliminan del historial.

### Vencimiento y pago

El formulario exige fecha de vencimiento igual o posterior a la emisión; comienza con 30 días de plazo. `invoiceService` normaliza facturas históricas sin ese campo a emisión + 30 días, sin inventar pagos. Las nuevas facturas y simulaciones guardan `dueDate`; XML y PDF lo incluyen.

Estado derivado: si existe fecha de pago válida `paidAt`, **Pagada**; si no, vencimiento anterior a hoy → **Vencida**, y hoy o posterior → **Pendiente**. **Marcar como pagada** en el detalle hace PATCH de `paidAt`; no hay selector manual de Pendiente/Vencida. Las alertas enlazan al documento. El XML archiva la fecha de pago sin congelar un estado que cambiaría con el tiempo.

## Identidad visual y selección de IVA

Logo propio vectorial: [puerto-factura-logo.svg](public/puerto-factura-logo.svg) e [icono](public/puerto-factura-icon.svg), disponibles sin conexión y descargables desde la barra lateral. Diseño adaptable con menú móvil, sombras, foco de teclado y respeto de `prefers-reduced-motion`. Los tres temas conservan sus preferencias anteriores; el documento imprimible siempre usa papel blanco.

En Productos y servicios, el selector general cambia **todas las líneas existentes** y la tarifa inicial de las nuevas. Cada ítem permite elegir otra tarifa. Se soportan 13%, 4%, 2%, 1%, 0,5% y tratamientos diferenciados de 0% (crédito pleno, exento y sin derecho a crédito). Se guardan código, tarifa y etiqueta; PDF/XML muestran el desglose. La tarifa depende del producto/servicio y tratamiento aplicable; no se deduce únicamente del cliente.

Catálogo basado en la nota 8.1 de los [anexos oficiales de comprobantes electrónicos v4.4](https://www.hacienda.go.cr/docs/ANEXOS_Y_ESTRUCTURAS_V4.4.pdf). Se omiten tarifas transitorias reservadas a notas de crédito/débito. Esto no convierte el XML interno en un comprobante fiscal.

Validación: `npm test` incluye el reto exacto, estados en límites de fecha, desviación cero, historial vacío, proyección con meses sin ventas y exclusión de meses parciales/futuros, IVA mixto y compatibilidad del redondeo histórico. `npm run lint` y `npm run build` verifican integración; el dashboard se carga bajo demanda para separar Recharts del flujo de facturación.


### Alertas en el listado de facturas

`/facturas` también muestra Atípica (fila resaltada) o Dentro del rango, además del estado de pago, la fecha de vencimiento y el origen simulado. Reutiliza `analyzeInvoices` con `useMemo` para todo el historial de cada moneda, sin mezclar USD y CRC. Los filtros de estado, Solo atípicas y búsqueda se aplican después del cálculo: buscar una sola factura no altera su clasificación. El dashboard coincide al seleccionar Todas las facturas y la misma moneda; al seleccionar otro origen su población estadística puede cambiar. Una factura puede ser pagada y atípica simultáneamente.
