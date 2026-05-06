# FishiFishi - Alternativa 2: Ecommerce B2B Simplificado

## Concepto

FishiFishi como ecommerce B2B mayorista mas simple, enfocado en capturar bien los datos del cliente, mostrar productos, recibir solicitudes u ordenes grandes y permitir que el equipo interno determine los costos finales de mercancia, envio, impuestos y entrega.

En esta alternativa, la plataforma no intenta automatizar toda la operacion internacional. El sistema ayuda a ordenar la informacion del comprador y de la compra, pero FishiFishi conserva el control comercial y logistico de cada cotizacion.

El punto principal sigue siendo asegurar el pago. Aunque esta version sea mas simple, no debe depender de notas de credito ni de promesas de pago. La plataforma debe confirmar pagos con tarjeta, cripto/stablecoins o WeChat Pay antes de liberar mercancia o programar entrega.

## Objetivo

Crear una plataforma mas rapida y economica de lanzar, donde los compradores empresariales puedan registrarse, ver productos, solicitar volumenes, indicar destino y recibir una cotizacion personalizada del equipo FishiFishi.

## Perfil De Usuario

- Empresas compradoras.
- Distribuidores.
- Restaurantes.
- Hoteles.
- Supermercados.
- Compradores recurrentes.
- Clientes que necesitan precio por volumen antes de pagar.

## Diferencia Principal Contra La Alternativa 1

La plataforma recopila los datos necesarios del cliente y de la orden, pero los calculos complejos no se hacen completamente automaticos desde el inicio.

FishiFishi ya sabe como colocar la mercancia, calcular condiciones reales, negociar transporte y definir costos finales. Por eso, el sistema funciona como una herramienta comercial ordenada y no como una plataforma automatizada de comercio internacional completo.

## Modulos Principales

### 1. Registro De Clientes Empresariales

Datos del cliente:

- Razon social.
- Pais.
- Ciudad.
- Direccion fiscal.
- Direccion de entrega.
- Tax ID, RFC o VAT.
- Nombre del comprador.
- Correo.
- Telefono.
- WhatsApp o WeChat.
- Tipo de empresa.
- Productos de interes.
- Volumen estimado mensual.
- Moneda preferida.
- Idioma preferido.
- Metodo de pago preferido.
- Contacto autorizado para pagar.
- Contacto autorizado para confirmar recibido.

Estos datos ayudan al equipo FishiFishi a definir costos, condiciones, impuestos estimados y forma de entrega.

### 2. Catalogo Mayorista

Catalogo claro y comercial:

- Producto.
- Fotografia.
- Presentacion.
- Unidad de venta.
- Volumen minimo.
- Temporada.
- Disponibilidad general.
- Descripcion.
- Ficha basica.
- Boton para solicitar cotizacion.

El precio puede mostrarse como:

- "Desde..."
- "Precio por cotizacion"
- "Precio segun volumen y destino"
- "Contactar para precio mayorista"

### 3. Solicitud De Cotizacion

Formulario simple:

- Producto.
- Cantidad.
- Unidad.
- Fecha deseada.
- Pais de destino.
- Ciudad o puerto.
- Tipo de entrega.
- Comentarios.
- Documentos requeridos, si aplica.

Despues de enviar, el estado queda como:

- Solicitud recibida.
- En revision.
- Cotizacion enviada.
- Aprobada por cliente.
- Pagada.
- En preparacion.
- Enviada.
- Completada.
- Cancelada.

### 4. Pago Asegurado Simple

Regla principal:

No se libera mercancia sin pago confirmado.

Metodos prioritarios:

- Tarjeta de credito o debito.
- WeChat Pay.
- Cripto/stablecoins.

Metodos secundarios:

- PayPal, solo si el pago queda confirmado.
- Alipay, si aplica para compradores asiaticos.

No recomendado como base del modelo:

- Nota de credito.
- Credito abierto.
- Pago despues de recibir.
- Promesa de transferencia sin validacion.

Flujo:

1. FishiFishi envia cotizacion.
2. El cliente acepta.
3. El sistema genera link de pago.
4. El cliente paga con tarjeta, cripto/stablecoin o WeChat Pay.
5. FishiFishi confirma el pago.
6. La orden pasa a preparacion.

### 5. Orden Simple

Ejemplo:

"Quiero 1,000 kg de pescado".

Flujo:

1. Cliente selecciona producto.
2. Indica cantidad y destino.
3. Envia solicitud.
4. FishiFishi revisa costos reales.
5. FishiFishi manda cotizacion.
6. Cliente acepta.
7. Cliente paga el monto requerido.
8. El sistema confirma el pago.
9. FishiFishi prepara y envia.

### 6. Compra Programada Simple

Ejemplo:

"Quiero 6,000 toneladas de jaiba de enero a junio".

En esta alternativa no se automatiza todo el contrato desde el inicio. Se usa un formulario de solicitud programada.

Campos:

- Producto.
- Volumen total.
- Fecha de inicio.
- Fecha de fin.
- Frecuencia de entrega.
- Cantidad por entrega.
- Destino.
- Metodo de pago preferido.
- Comentarios.

El equipo FishiFishi convierte esa solicitud en una cotizacion o contrato manual. La regla comercial debe ser clara: cada entrega se prepara solo cuando el pago de esa entrega esta confirmado o cuando existe una garantia previamente capturada.

### 7. Seguimiento Y Confirmacion Tipo DiDi

Aunque la version sea simple, debe tener una experiencia de seguimiento parecida a una app de entrega.

Estados:

- Cotizacion enviada.
- Pago pendiente.
- Pago confirmado.
- En preparacion.
- Enviado.
- Entregado pendiente de confirmacion.
- Recibido confirmado.
- Cerrado.
- Incidencia reportada.

Permisos del comprador:

- Ver estado de la orden.
- Recibir notificaciones.
- Confirmar recibido.
- Reportar problema.
- Subir foto o comentario de incidencia.

Permisos del administrador:

- Cambiar estado de la orden.
- Subir comprobantes.
- Subir factura o documentos.
- Marcar pago confirmado.
- Solicitar confirmacion de recibido.
- Cerrar orden.

### 8. Pagos

Primera etapa:

- Stripe.
- WeChat Pay.
- Cripto/stablecoins.
- Pago manual registrado por administrador solo si representa un pago confirmado.
- PayPal, si se decide usarlo como pago confirmado.

Segunda etapa:

- Alipay.
- Pagos programados.
- Garantias.

### 9. Panel Administrativo

Debe permitir:

- Ver clientes.
- Aprobar clientes.
- Ver solicitudes.
- Crear cotizaciones.
- Cambiar estados.
- Subir facturas o documentos.
- Registrar pagos.
- Ver pagos pendientes.
- Ver pagos fallidos.
- Ver pagos confirmados.
- Solicitar confirmacion de recibido.
- Gestionar incidencias.
- Administrar productos.
- Ver historial de compras.

### 10. Estadisticas Basicas

Por cliente:

- Numero de solicitudes.
- Productos solicitados.
- Volumen total solicitado.
- Volumen comprado.
- Pais.
- Ultima compra.
- Estatus comercial.
- Pagos fallidos.
- Ordenes recibidas confirmadas.
- Incidencias.

Por producto:

- Solicitudes recibidas.
- Volumen solicitado.
- Clientes interesados.
- Temporada con mas demanda.

## Ventajas

- Mucho mas rapido de desarrollar.
- Menor costo inicial.
- Menos dependencia de integraciones externas.
- Permite validar mercado.
- Mantiene control humano sobre precios y logistica.
- Mantiene la regla de pago asegurado desde el inicio.
- Permite confirmar recibido sin construir una logistica compleja.
- Ideal para iniciar operaciones sin automatizar todo.

## Desventajas

- Menos automatizacion.
- Mas trabajo manual interno.
- No escala tan bien si hay demasiadas solicitudes.
- Los calculos no son instantaneos.
- Los compradores grandes pueden pedir procesos mas automatizados.

## MVP Recomendado

Primera etapa:

- Registro de clientes empresariales.
- Catalogo mayorista.
- Solicitud de cotizacion.
- Solicitud de compra programada.
- Panel administrativo.
- Estados de solicitud.
- Pagos con tarjeta.
- WeChat Pay.
- Cripto/stablecoins.
- Confirmacion de recibido por comprador.
- Estados de entrega tipo DiDi.
- Multidioma espanol e ingles.

Segunda etapa:

- Chino simplificado.
- Cotizaciones generadas desde admin.
- Historial del comprador.
- Documentos descargables.
- Pagos avanzados.
- Analitica basica.

## Recomendacion

Esta alternativa es la mejor para lanzar primero si FishiFishi aun esta validando compradores, precios, rutas logisticas y demanda internacional.

Permite vender y aprender rapido sin construir desde el inicio una infraestructura compleja de pagos, impuestos, aduanas y contratos automatizados.
