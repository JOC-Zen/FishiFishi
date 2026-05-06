# Modulo IA - FishiFishi Agent

## Concepto

FishiFishi Agent es el modulo de inteligencia artificial de la plataforma. Su objetivo es ayudar al equipo administrador a operar mas rapido, reducir errores, automatizar calculos repetitivos y convertir datos comerciales en decisiones utiles.

El agente no reemplaza al administrador. Funciona como asistente operativo con permisos, reglas y aprobaciones. Puede analizar informacion, preparar acciones y ejecutar tareas autorizadas dentro de la plataforma.

## Objetivos Del Modulo

1. Automatizar calculos comerciales y operativos.
2. Ayudar al administrador con reportes, resumenes y consultas.
3. Detectar riesgos de pago, entrega, precio o cliente.
4. Sugerir precios y condiciones de cotizacion.
5. Enviar notificaciones y correos autorizados.
6. Cambiar precios, estados o datos solo cuando tenga permisos claros.
7. Crear una capa inteligente que pueda crecer con el negocio.

## Alcance Inicial

El modulo IA debe iniciar con funciones practicas y controladas:

- Resumen de ventas.
- Reporte de pagos confirmados, pendientes y fallidos.
- Resumen de compradores.
- Alertas de ordenes sin pago.
- Alertas de entregas pendientes de confirmacion.
- Sugerencia de precio segun volumen, producto, temporada y destino.
- Generacion de borradores de correos.
- Envio de correos previa autorizacion o bajo reglas permitidas.
- Cambio de precio con confirmacion del administrador.
- Busqueda de informacion dentro del sistema.

## Principio De Seguridad

FishiFishi Agent debe tener permisos por nivel. No debe ejecutar acciones sensibles sin autorizacion.

Acciones que requieren confirmacion:

- Cambiar precios.
- Enviar correos externos.
- Cancelar una orden.
- Marcar pago como confirmado manualmente.
- Liberar mercancia.
- Cerrar una incidencia.
- Reembolsar o ajustar pagos.
- Cambiar datos fiscales de un cliente.

Acciones que puede hacer sin confirmacion:

- Generar resumenes.
- Preparar reportes.
- Detectar anomalias.
- Crear borradores.
- Consultar datos.
- Explicar estados.
- Recomendar acciones.

## Capacidades Principales

### 1. Calculos Inteligentes

El agente puede ayudar con calculos comerciales usando datos internos:

- Precio sugerido por volumen.
- Descuento sugerido.
- Margen estimado.
- Costo estimado de empaque.
- Costo logistico estimado.
- Tipo de cambio aplicado.
- Comparacion contra historico de ventas.
- Rentabilidad por comprador.
- Rentabilidad por producto.
- Riesgo de cotizacion baja.
- Simulacion de escenarios.

Ejemplos:

- "Calcula el precio recomendado para 1,000 kg de jaiba a Shanghai."
- "Compara esta cotizacion contra las ultimas ventas a China."
- "Dime si esta orden tiene margen suficiente."
- "Sugiere descuento para un cliente que compra 10 toneladas mensuales."

### 2. Automatizacion De Procesos

El agente puede ejecutar o preparar tareas repetitivas:

- Crear cotizacion preliminar.
- Generar resumen de orden.
- Preparar link de pago.
- Solicitar confirmacion de recibido.
- Notificar pago pendiente.
- Recordar al administrador entregas bloqueadas por pago.
- Cambiar estado de orden cuando un webhook confirma pago.
- Crear alerta si una entrega no fue confirmada.
- Preparar reporte semanal.

### 3. Agente Para Administrador

El administrador puede conversar con FishiFishi Agent desde el panel administrativo.

Ejemplos de comandos:

- "Dame un resumen de ventas de esta semana."
- "Que clientes tienen pagos pendientes?"
- "Que ordenes no se han confirmado como recibidas?"
- "Envia correo a Pacific Dragon Foods recordando confirmar recibido."
- "Sube 5% el precio de la jaiba para cotizaciones nuevas."
- "Crea reporte de productos mas solicitados en China."
- "Resume las incidencias abiertas."
- "Prepara una cotizacion para 2,000 kg de camaron a Hong Kong."
- "Que compradores tienen mas riesgo por pagos fallidos?"

## Modulos Internos

### AI Assistant Interface

Interfaz conversacional dentro del panel admin.

Funciones:

- Chat con historial.
- Respuestas con datos del sistema.
- Botones de accion.
- Confirmaciones antes de ejecutar.
- Vista de fuentes usadas.
- Registro de acciones ejecutadas.

### AI Orchestrator

Capa que interpreta la solicitud del administrador y decide que herramienta usar.

Responsabilidades:

- Entender intencion.
- Consultar datos.
- Llamar herramientas internas.
- Pedir confirmacion si la accion es sensible.
- Devolver respuesta clara.
- Guardar auditoria.

### Tool Layer

Conjunto de herramientas internas que el agente puede usar.

Herramientas sugeridas:

- `search_buyers`
- `get_buyer_summary`
- `search_orders`
- `get_order_status`
- `get_payment_status`
- `create_quote_draft`
- `update_product_price`
- `send_notification_email`
- `create_admin_report`
- `get_delivery_alerts`
- `get_sales_summary`
- `get_incident_summary`

### Policy And Permissions Layer

Capa de reglas para evitar acciones no autorizadas.

Ejemplos:

- Un usuario con rol `viewer` solo puede consultar.
- Un usuario con rol `sales_admin` puede crear cotizaciones.
- Un usuario con rol `finance_admin` puede revisar pagos.
- Un usuario con rol `super_admin` puede aprobar cambios de precio.
- Ningun agente puede guardar tarjeta ni ver datos sensibles completos.

### Audit Log

Registro obligatorio de actividad del agente.

Debe guardar:

- Usuario que pidio la accion.
- Fecha y hora.
- Prompt o instruccion.
- Herramienta usada.
- Datos consultados.
- Accion propuesta.
- Confirmacion del usuario.
- Resultado.
- Error, si existe.

## Arquitectura Recomendada

```text
Admin Panel
  |
  |-- FishiFishi Agent Chat
        |
        |-- AI Orchestrator
              |
              |-- Policy And Permissions Layer
              |-- Business Tools
              |-- Database
              |-- Payment Provider APIs
              |-- Email/Notification Provider
              |-- Audit Log
```

## Tecnologias Sugeridas

### Frontend

- Next.js.
- React.
- TypeScript.
- Chat UI dentro del panel administrativo.
- Componentes para confirmacion de acciones.

### Backend

- NestJS o Laravel.
- API interna para herramientas del agente.
- Jobs/queues para tareas asincronas.
- Webhooks para pagos.

### IA

- Modelo de lenguaje conectado al backend.
- Tool calling o function calling para ejecutar acciones controladas.
- Retrieval interno para consultar documentos, cotizaciones, ordenes y compradores.
- Prompts de sistema con reglas de negocio.
- Auditoria de entradas y salidas.

### Base De Datos

- PostgreSQL.
- Tablas para conversaciones, mensajes, acciones, auditoria y herramientas ejecutadas.

### Notificaciones

- Email transaccional.
- WhatsApp Business API.
- WeChat, si aplica para compradores chinos.

## Modelo De Datos Sugerido

### ai_conversations

- id
- admin_user_id
- title
- status
- created_at
- updated_at

### ai_messages

- id
- conversation_id
- role
- content
- metadata
- created_at

### ai_actions

- id
- conversation_id
- admin_user_id
- action_type
- status
- requires_confirmation
- confirmed_at
- executed_at
- result
- error
- created_at

### ai_tool_calls

- id
- action_id
- tool_name
- input
- output
- status
- created_at

### ai_audit_logs

- id
- admin_user_id
- event_type
- entity_type
- entity_id
- before_value
- after_value
- created_at

## Permisos Recomendados

| Accion | Viewer | Sales Admin | Finance Admin | Super Admin |
| --- | --- | --- | --- | --- |
| Consultar reportes | Si | Si | Si | Si |
| Crear borrador de cotizacion | No | Si | Si | Si |
| Enviar correo | No | Con aprobacion | Con aprobacion | Si |
| Cambiar precio | No | No | No | Con confirmacion |
| Marcar pago manual | No | No | Con confirmacion | Con confirmacion |
| Liberar orden | No | No | No | Con confirmacion |
| Cerrar incidencia | No | Si | Si | Si |

## Flujos Del Agente

### Flujo 1: Reporte De Ventas

1. Administrador escribe: "Dame reporte de ventas de esta semana".
2. El agente consulta ordenes pagadas y cerradas.
3. Calcula total vendido, productos principales y compradores principales.
4. Devuelve resumen.
5. Ofrece exportar o enviar por correo.

### Flujo 2: Cambio De Precio

1. Administrador escribe: "Sube 5% el precio de la jaiba".
2. El agente identifica producto y reglas afectadas.
3. Calcula precio anterior y precio nuevo.
4. Muestra impacto estimado.
5. Pide confirmacion.
6. Si el administrador confirma, ejecuta cambio.
7. Registra auditoria.

### Flujo 3: Notificacion De Pago Pendiente

1. Administrador escribe: "Notifica a los clientes con pagos pendientes".
2. El agente consulta ordenes con pago pendiente.
3. Genera lista de clientes.
4. Prepara borradores de correo.
5. Pide aprobacion.
6. Envia correos autorizados.
7. Guarda registro de notificacion.

### Flujo 4: Confirmacion De Recibido

1. El agente detecta ordenes entregadas sin confirmacion.
2. Prepara mensaje para comprador.
3. El administrador aprueba envio.
4. El sistema envia notificacion.
5. Si el comprador confirma, se cierra la orden.

## Requerimientos Funcionales

| ID | Requerimiento | Prioridad |
| --- | --- | --- |
| AI-01 | El administrador debe poder conversar con FishiFishi Agent desde el panel admin. | Alta |
| AI-02 | El agente debe consultar compradores, ordenes, pagos, productos e incidencias. | Alta |
| AI-03 | El agente debe generar reportes y resumenes. | Alta |
| AI-04 | El agente debe crear borradores de correos y notificaciones. | Alta |
| AI-05 | El agente debe pedir confirmacion antes de enviar correos externos. | Alta |
| AI-06 | El agente debe pedir confirmacion antes de cambiar precios. | Alta |
| AI-07 | El agente debe guardar auditoria de cada accion. | Alta |
| AI-08 | El agente debe bloquear acciones que el usuario no tenga permiso de ejecutar. | Alta |
| AI-09 | El agente debe generar cotizaciones preliminares. | Media |
| AI-10 | El agente debe detectar anomalias de pagos, precios o entregas. | Media |

## Requerimientos No Funcionales

- Respuestas en espanol, ingles y chino en fases futuras.
- Tiempo de respuesta menor a 8 segundos para consultas simples.
- Trazabilidad completa de acciones.
- Cifrado de datos sensibles.
- No exponer datos completos de tarjeta.
- Manejo de errores claro.
- Capacidad de desactivar herramientas del agente por configuracion.
- Separacion entre sugerencia y ejecucion.

## Roadmap Del Modulo IA

### Fase 1: Asistente De Consulta

- Chat admin.
- Reportes basicos.
- Resumenes de compradores.
- Resumenes de ordenes.
- Alertas de pago.

### Fase 2: Asistente Operativo

- Borradores de cotizacion.
- Borradores de correo.
- Notificaciones con aprobacion.
- Solicitud de confirmacion de recibido.

### Fase 3: Acciones Controladas

- Cambio de precios con confirmacion.
- Creacion de cotizaciones.
- Reglas automaticas para alertas.
- Auditoria avanzada.

### Fase 4: Inteligencia Comercial

- Prediccion de demanda.
- Sugerencias de precio por temporada.
- Riesgo por comprador.
- Deteccion de margen bajo.
- Recomendaciones de inventario.

## Prompt Base Del Agente

```text
Eres FishiFishi Agent, el asistente de inteligencia artificial del panel administrativo de FishiFishi.

Tu objetivo es ayudar al administrador a consultar informacion, generar reportes, preparar cotizaciones, revisar pagos, detectar riesgos, redactar notificaciones y ejecutar acciones permitidas.

Reglas:
- No liberes mercancia sin pago confirmado.
- No confirmes pagos manualmente sin permiso suficiente.
- No cambies precios sin confirmacion explicita del administrador.
- No envies correos externos sin aprobacion, salvo reglas automaticas autorizadas.
- No muestres datos sensibles completos de tarjetas o credenciales.
- Siempre explica que datos usaste para un reporte.
- Si una accion afecta dinero, precio, pago, cliente o entrega, pide confirmacion.
- Guarda auditoria de acciones ejecutadas.
```

## Resumen

FishiFishi Agent debe convertirse en el copiloto operativo del administrador. Su valor principal no es responder preguntas generales, sino ayudar a controlar el negocio: pagos asegurados, cotizaciones, precios, reportes, notificaciones, entregas e incidencias.

La IA debe implementarse con permisos, auditoria y confirmaciones para que sea util sin poner en riesgo dinero, clientes o mercancia.

