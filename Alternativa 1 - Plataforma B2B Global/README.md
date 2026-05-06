# FishiFishi - Alternativa 1: Plataforma B2B Global

## Concepto

FishiFishi como plataforma internacional B2B para venta mayorista de pescados y mariscos, orientada a empresas compradoras, importadores, distribuidores, supermercados, procesadoras y cadenas de restaurantes.

Esta alternativa busca resolver todo el ciclo comercial: registro empresarial, cotizacion, impuestos, costos logisticos, pagos internacionales asegurados, contratos de suministro por temporada, documentacion, seguimiento, confirmacion de recibido y analitica.

El punto mas importante del proyecto es asegurar el pago antes de comprometer producto, embarque o entrega. FishiFishi no debe operar con notas de credito como mecanismo principal. La plataforma debe trabajar con pagos reales y verificables: tarjetas, cripto/stablecoins y WeChat Pay, con reglas claras para liberar producto, programar entregas y cerrar cada operacion.

## Objetivo

Crear una plataforma robusta para vender grandes volumenes a compradores internacionales, calculando automaticamente condiciones comerciales segun pais, moneda, impuestos, destino, tipo de producto, volumen y metodo de entrega.

## Perfil De Usuario

- Compradores empresariales.
- Importadores.
- Distribuidores.
- Supermercados.
- Restaurantes grandes.
- Procesadoras de alimentos.
- Clientes internacionales recurrentes.

## Modulos Principales

### 1. Compradores Empresariales

Registro completo de empresas:

- Razon social.
- Pais.
- Tax ID, RFC, VAT o identificador fiscal.
- Direccion fiscal.
- Direccion de entrega.
- Contactos de compras, finanzas y logistica.
- Moneda preferida.
- Idioma preferido.
- Puertos o destinos frecuentes.
- Documentos legales.
- Historial de compras.
- Condiciones comerciales.
- Metodos de pago autorizados.
- Tarjetas guardadas o metodos de pago tokenizados.
- Wallets o cuentas autorizadas.
- Persona autorizada para confirmar recibido.

Este modulo alimenta calculos de envio, impuestos, condiciones comerciales, riesgo y estadisticas.

### 2. Catalogo Mayorista

Productos con informacion tecnica:

- Especie.
- Presentacion.
- Fresco, congelado, vivo, cocido o procesado.
- Unidad de venta.
- Volumen minimo.
- Precio por volumen.
- Temporada.
- Pais de origen.
- Certificaciones.
- Empaque.
- Temperatura requerida.
- Vida util.
- Ficha tecnica.

### 3. Cotizador Internacional

Calcula:

- Precio base.
- Descuento por volumen.
- Empaque.
- Seguro.
- Cadena fria.
- Flete nacional.
- Flete internacional.
- Impuestos estimados.
- Aranceles estimados.
- Costos aduanales.
- Tipo de cambio.
- Incoterm.
- Fecha estimada de entrega.

### 4. Motor De Pago Asegurado

Este es el modulo central de FishiFishi.

Principios:

- No liberar orden sin pago confirmado, garantia capturada o autorizacion valida.
- No operar con notas de credito como forma normal de pago.
- Aceptar tarjetas, cripto/stablecoins y WeChat Pay como metodos prioritarios.
- Guardar metodos de pago de forma tokenizada, sin almacenar datos sensibles de tarjeta en la plataforma.
- Validar riesgo, pais, moneda y metodo antes de aprobar una orden.
- Registrar evidencia completa de pago, disputa, devolucion o ajuste.

Metodos prioritarios:

- Tarjetas de credito y debito.
- WeChat Pay.
- Cripto o stablecoins mediante proveedor regulado.
- Alipay, si el mercado asiatico lo requiere.
- UnionPay, si el mercado chino lo requiere.

Para contratos programados:

- Pago total por adelantado.
- Deposito o garantia inicial.
- Autorizacion de cargos futuros.
- Cargo automatico por entrega.
- Bloqueo o preautorizacion antes de cada embarque.
- Suspension automatica de entregas si el pago falla.

### 5. Compras Directas

Ejemplo:

"Quiero 1,000 kg de pescado".

Flujo:

1. El cliente selecciona producto.
2. Indica volumen, destino y fecha.
3. La plataforma calcula costo total.
4. El cliente paga con tarjeta, cripto/stablecoin o WeChat Pay.
5. El sistema confirma el pago.
6. Se genera orden, factura y seguimiento.
7. El producto se libera para preparacion y envio.

### 6. Contratos Programados

Ejemplo:

"Quiero 6,000 toneladas de jaiba de enero a junio, 1,000 toneladas la primera semana de cada mes".

El sistema debe permitir:

- Volumen total.
- Calendario de entregas.
- Pagos parciales.
- Garantia inicial.
- Cargos programados.
- Preautorizacion antes de cada entrega.
- Suspension de entrega si el pago no esta asegurado.
- Penalizaciones.
- Estados por entrega.
- Facturacion parcial.
- Documentos por embarque.

### 7. Confirmacion De Recibido Tipo DiDi

La plataforma debe funcionar con estados operativos parecidos a una app de entrega: el comprador puede ver el avance y confirmar cuando recibe.

Flujo de estados:

1. Orden pagada.
2. En preparacion.
3. Lista para envio.
4. En transito.
5. En aduana o revision, si aplica.
6. En ruta final.
7. Entregada pendiente de confirmacion.
8. Recibido confirmado por comprador.
9. Orden cerrada.

Funciones para el comprador:

- Recibir notificaciones por correo, WhatsApp o WeChat.
- Ver documentos del embarque.
- Ver evidencia de envio.
- Confirmar recibido.
- Reportar incidencia.
- Subir fotos o comentarios si hay problema.
- Autorizar cierre de la entrega.

Funciones para FishiFishi:

- Subir evidencia de embarque.
- Subir documentos.
- Marcar estados.
- Registrar incidencias.
- Bloquear futuras entregas si hay disputa abierta.
- Cerrar la orden solo con pago confirmado y recibido validado.

### 8. Pagos Globales

Arquitectura multi-proveedor:

- Stripe.
- WeChat Pay.
- Cripto o stablecoins mediante proveedor regulado.
- Alipay.
- UnionPay.
- PayPal, solo si funciona como pago confirmado y no como credito abierto.

El sistema debe validar disponibilidad por pais, moneda y tipo de operacion.

### 9. Logistica Y Documentacion

- Calculo de envio.
- Puertos.
- Contenedores refrigerados.
- Seguro.
- Tracking.
- Factura comercial.
- Packing list.
- Certificados sanitarios.
- Certificado de origen.
- Bill of Lading o Air Waybill.
- Documentos aduanales.
- Evidencia de entrega.
- Confirmacion de recibido.

### 10. Multidioma Y Multi Moneda

Idiomas iniciales:

- Espanol.
- Ingles.
- Chino simplificado.

Monedas iniciales:

- USD.
- MXN.
- EUR.
- CNY.
- HKD.

### 11. Panel Administrativo

- Productos.
- Inventario.
- Temporadas.
- Precios.
- Compradores.
- Cotizaciones.
- Ordenes.
- Contratos.
- Pagos.
- Pagos fallidos.
- Pagos asegurados.
- Facturas.
- Documentos.
- Logistica.
- Confirmaciones de recibido.
- Incidencias.
- Reportes.

### 12. Analitica

Por comprador:

- Volumen comprado.
- Frecuencia.
- Productos favoritos.
- Margen generado.
- Pais de destino.
- Cumplimiento de pagos.
- Pagos fallidos.
- Tiempo promedio para confirmar recibido.
- Incidencias por comprador.
- Contratos activos.

Por producto:

- Demanda.
- Temporada.
- Rentabilidad.
- Precio promedio.
- Paises compradores.

## Ventajas

- Plataforma altamente diferenciada.
- Escalable internacionalmente.
- Preparada para compradores grandes.
- Permite contratos de suministro.
- Reduce riesgo de impago.
- Da trazabilidad de entrega y recibido.
- Automatiza mucha operacion.
- Genera informacion comercial valiosa.

## Desventajas

- Mayor costo inicial.
- Mayor tiempo de desarrollo.
- Requiere integraciones complejas.
- Necesita validacion legal, fiscal y logistica por pais.

## MVP Recomendado

Primera etapa:

- Registro de compradores empresariales.
- Catalogo mayorista.
- Cotizador basico.
- Compra directa.
- Solicitud de contrato programado.
- Panel administrativo.
- Pagos asegurados con tarjeta.
- WeChat Pay.
- Cripto/stablecoins.
- Estados de entrega tipo DiDi.
- Confirmacion de recibido por comprador.
- Multidioma espanol, ingles y chino.

Segunda etapa:

- Calculo avanzado de impuestos.
- Pagos programados.
- Alipay y WeChat Pay.
- Logistica integrada.
- Disputas con evidencia.
- Analitica avanzada.
