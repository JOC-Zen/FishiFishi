# FishiFishi

Proyecto conceptual y tecnico para una plataforma B2B mayorista de pescados y mariscos.

## Vision

FishiFishi busca operar como una plataforma comercial para empresas compradoras de pescados y mariscos al mayoreo, con un foco central: asegurar pagos antes de liberar mercancia y dar seguimiento operativo hasta la confirmacion de recibido.

La version inicial recomendada es la version sencilla, porque permite validar mercado, compradores, productos, rutas logisticas y operacion sin construir desde el primer dia una plataforma internacional completamente automatizada.

## Prioridades Del Proyecto

1. Pago asegurado antes de liberar mercancia.
2. Sin notas de credito como modelo principal.
3. Pagos con tarjeta, cripto/stablecoins y WeChat Pay.
4. Registro completo de compradores empresariales.
5. Solicitudes de cotizacion por volumen y destino.
6. Seguimiento tipo DiDi para estados de orden.
7. Confirmacion de recibido por parte del comprador.
8. Panel administrativo para controlar cotizaciones, pagos, documentos e incidencias.

## Estructura De Carpetas

```text
FishiFishi/
  Alternativa 1 - Plataforma B2B Global/
  Alternativa 2 - Ecommerce B2B Simplificado/
  Branding - Logotipo/
  Documentacion Version Sencilla/
  Modulo IA - FishiFishi Agent/
  frontend/
```

## Contenido

### Alternativa 1 - Plataforma B2B Global

Documento conceptual de la version mas completa del proyecto.

Incluye:

- Ecommerce B2B internacional.
- Calculo de impuestos, envio y costos logisticos.
- Pagos globales.
- Contratos programados.
- Logistica y documentacion internacional.
- Analitica avanzada.

Archivo:

- `Alternativa 1 - Plataforma B2B Global/README.md`

### Alternativa 2 - Ecommerce B2B Simplificado

Documento conceptual de la version inicial recomendada.

Incluye:

- Registro de clientes empresariales.
- Catalogo mayorista.
- Solicitud de cotizacion.
- Pago asegurado simple.
- Compra programada simple.
- Seguimiento tipo DiDi.
- Confirmacion de recibido.
- Panel administrativo.

Archivo:

- `Alternativa 2 - Ecommerce B2B Simplificado/README.md`

### Documentacion Version Sencilla

Documento tecnico y funcional formal de la version sencilla.

Incluye:

- Resumen ejecutivo.
- Alcance.
- Arquitectura recomendada.
- Lenguajes y tecnologias.
- Jerarquia del proyecto.
- Modulos funcionales.
- Flujos principales.
- Requerimientos funcionales.
- Requerimientos no funcionales.
- Modelo de datos inicial.
- Roadmap.

Archivos:

- `Documentacion Version Sencilla/FishiFishi-Version-Sencilla.pdf`
- `Documentacion Version Sencilla/FishiFishi-Version-Sencilla.html`

### Branding - Logotipo

Primera propuesta visual de marca para FishiFishi.

Incluye:

- Logotipo principal.
- Icono cuadrado.
- Version solo texto.
- Preview visual en HTML.
- Guia breve de concepto y uso.

Archivos:

- `Branding - Logotipo/logo-principal.svg`
- `Branding - Logotipo/logo-icono.svg`
- `Branding - Logotipo/logo-solo-texto.svg`
- `Branding - Logotipo/preview-logo.html`
- `Branding - Logotipo/README.md`
- `Branding - Logotipo/README.pdf`

### Modulo IA - FishiFishi Agent

Documento conceptual y tecnico del modulo de inteligencia artificial.

Incluye:

- Calculos inteligentes.
- Automatizacion de procesos.
- Agente conversacional para administrador.
- Reportes y resumenes.
- Borradores y envio controlado de correos.
- Cambios de precio con confirmacion.
- Permisos por rol.
- Auditoria de acciones.
- Roadmap del modulo IA.

Archivo:

- `Modulo IA - FishiFishi Agent/README.md`

### frontend

Primera interfaz visual estatica del proyecto.

Incluye:

- Dashboard operativo.
- Modulo de pago asegurado.
- Orden activa.
- Seguimiento de entrega.
- Comprador empresarial.
- Contrato programado.
- Confirmacion de recibido.

Archivo principal:

- `frontend/index.html`

## Tecnologia Recomendada Para La Version Sencilla

### Frontend

- Next.js.
- React.
- TypeScript.
- CSS Modules, Tailwind CSS o sistema de componentes propio.

### Backend

- NestJS con TypeScript o Laravel con PHP.
- API REST como primera etapa.
- Arquitectura modular monolitica.

### Base De Datos

- PostgreSQL.

### Storage

- Amazon S3, Cloudflare R2 o compatible S3.

### Pagos

- Stripe para tarjetas.
- Integracion con WeChat Pay.
- Proveedor regulado para cripto/stablecoins.

### Notificaciones

- Email transaccional.
- WhatsApp Business API.
- WeChat para compradores chinos.

## Reglas De Negocio Clave

- Una orden no puede pasar a preparacion si el pago no esta confirmado.
- Una entrega programada no se libera si el pago de esa entrega esta fallido, pendiente o vencido.
- El comprador debe tener un contacto autorizado para confirmar recibido.
- Las incidencias deben registrarse con estado, evidencia y responsable.
- Los pagos deben validarse por webhook del proveedor, no solo por pantalla de exito.
- Los datos sensibles de tarjeta no deben almacenarse en FishiFishi.
- Las acciones del agente IA que afecten precios, pagos, clientes o entregas deben requerir confirmacion y auditoria.

## Siguiente Paso Recomendado

Convertir la interfaz estatica en una aplicacion frontend real con rutas principales:

- `/login`
- `/dashboard`
- `/buyers`
- `/products`
- `/quotes`
- `/orders`
- `/payments`
- `/deliveries`
- `/admin`

Despues, definir el modelo de base de datos y construir el backend con los modulos `buyers`, `products`, `quotes`, `orders`, `payments`, `deliveries`, `documents` y `notifications`.

El modulo `FishiFishi Agent` debe agregarse como capa transversal despues de tener los primeros datos operativos, empezando por reportes, resumenes y alertas antes de permitir acciones automaticas sensibles.
