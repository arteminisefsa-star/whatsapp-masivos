# 📱 WhatsApp Cobros - Notificaciones de Deudas Masivas

Una aplicación web simple y poderosa para enviar notificaciones automáticas de deudas a tus clientes por WhatsApp. Perfecta para empresas, negocios y cobradores.

## ✨ Características

✅ **Carga masiva de clientes** - Soporta hasta 5000 deudores  
✅ **Información de deudas** - Monto, fecha vencimiento, tipo, días de atraso  
✅ **5 Plantillas pre-configuradas** - Recordatorio, Urgente, Plan de pago, Final, Cortesía  
✅ **Personalización de mensajes** - Usa {nombre}, {monto}, {fecha}, {dias}, {tipo_deuda}  
✅ **Filtros inteligentes** - Filtra por tipo de deuda y días de atraso  
✅ **Vista previa completa** - Ve todos los clientes antes de enviar  
✅ **Estadísticas en tiempo real** - Total, deuda total, días promedio  
✅ **Registro de envíos** - Historial de mensajes enviados  
✅ **Envío automático por WhatsApp** - Se abre WhatsApp Web para cada cliente  

## 🚀 Cómo Usar

### Paso 1: Acceder a la aplicación

1. Ve a: https://arteminisefsa-star.github.io/whatsapp-masivos
2. O descarga el repositorio y abre `index.html` en tu navegador

### Paso 2: Preparar archivo CSV

Crea un archivo Excel o Google Sheets con esta estructura:

```
numero,nombre,monto_deuda,fecha_vencimiento,tipo_deuda,dias_atraso
+573001234567,Juan Pérez,150000,2026-06-30,Factura,10
+573009876543,María García,250000,2026-06-15,Préstamo,25
+573015678901,Carlos López,100000,2026-07-05,Servicios,5
+573024567890,Ana Martínez,500000,2026-05-30,Factura,40
+573033456789,Pedro Rodríguez,75000,2026-07-08,Otro,2
```

**Columnas obligatorias:**
- `numero`: Número WhatsApp con código de país (ej: +573001234567)
- `nombre`: Nombre del cliente
- `monto_deuda`: Cantidad adeudada (sin símbolo, solo números)
- `fecha_vencimiento`: Fecha de vencimiento (formato AAAA-MM-DD)
- `tipo_deuda`: Tipo de deuda (Factura, Préstamo, Servicios, Otro)
- `dias_atraso`: Días que lleva atrasado (número entero)

**Guardar como CSV:**
1. En Excel: Archivo → Guardar como → Formato CSV (separado por comas)
2. En Google Sheets: Archivo → Descargar → CSV

### Paso 3: Cargar clientes

1. Ve a la tab **"📥 Datos"**
2. Haz clic en **"Selecciona tu archivo CSV"**
3. Selecciona tu archivo descargado
4. ¡Los clientes se cargarán automáticamente!

### Paso 4: Seleccionar plantilla

1. Ve a la tab **"📋 Plantillas"**
2. Elige una de las 5 plantillas disponibles:
   - 📢 **Recordatorio Simple** - Amigable
   - 🔴 **Recordatorio Urgente** - Más directo
   - 💰 **Con Plan de Pago** - Ofrece opciones
   - ⚖️ **Notificación Final** - Último aviso
   - 😊 **Mensaje de Cortesía** - Servicial

3. O personaliza tu propio mensaje usando las variables:
   - `{nombre}` - Nombre del cliente
   - `{monto}` - Monto de la deuda
   - `{fecha}` - Fecha de vencimiento
   - `{dias}` - Días de atraso
   - `{tipo_deuda}` - Tipo de deuda

### Paso 5: Revisar clientes

1. Ve a la tab **"👁️ Vista Previa"**
2. Revisa las estadísticas:
   - Total de clientes cargados
   - Clientes con deuda
   - Deuda total
   - Días de atraso promedio

3. Usa los filtros para ver clientes específicos:
   - Por tipo de deuda (Factura, Préstamo, Servicios, Otro)
   - Por mínimo días de atraso (1+, 5+, 10+, 30+)

### Paso 6: Enviar mensajes

1. Ve a la tab **"🚀 Envío"**
2. Haz clic en **"🚀 Comenzar envío"**
3. Confirma que deseas enviar
4. Se abrirán ventanas de WhatsApp automáticamente
5. **IMPORTANTE**: Debes confirmar el envío manualmente en cada ventana

## 📊 Ejemplo de mensaje personalizado

**Plantilla:**
```
Hola {nombre}, tu {tipo_deuda} de ${monto} venció hace {dias} días. 
Es urgente que realices el pago. Contáctanos si tienes dudas.
```

**Resultado para cada cliente:**
```
Hola Juan Pérez, tu Factura de $150.000 venció hace 10 días. 
Es urgente que realices el pago. Contáctanos si tienes dudas.
```

## ⚠️ Requisitos Importantes

1. **WhatsApp Web debe estar sincronizado** en tu navegador
2. **Conexión a Internet estable** durante el envío
3. **Números válidos** con código de país (ej: +573001234567)
4. **Ventanas emergentes habilitadas** en tu navegador
5. **Aceptar términos de WhatsApp** - Los mensajes son responsabilidad tuya

## 🎯 Casos de Uso

- 💳 **Cobro de facturas** - Recordatorios automáticos
- 🏦 **Recuperación de créditos** - Notificaciones de pago
- 📞 **Agencias de cobro** - Gestión masiva de deudores
- 🏢 **Empresas B2B** - Recordatorios de pago a clientes
- 🏪 **Pequeños negocios** - Cobro de ventas a crédito
- 👔 **Profesionales independientes** - Recordatorio de honorarios

## 📝 Formatos Aceptados

### Números de WhatsApp válidos:
```
+573001234567  ✅ Correcto
+57 300 1234567  ✅ Con espacios (se ajustan automáticamente)
573001234567  ❌ Sin el +
300-1234567  ❌ Formato incorrecto
```

### Fechas válidas:
```
2026-06-30  ✅ Correcto (AAAA-MM-DD)
30/06/2026  ❌ Será rechazado
```

### Montos válidos:
```
150000  ✅ Correcto
150,000  ❌ Usa puntos o sin separador
$150000  ❌ Sin símbolo
```

## 🔒 Seguridad y Privacidad

- ✅ **Todo funciona localmente** - Los datos NO se envían a servidores
- ✅ **Sin registro requerido** - No necesitas cuenta
- ✅ **Sin cookies de rastreo** - Tu privacidad está protegida
- ✅ **Abierto y transparente** - Código disponible en GitHub

## 🐛 Solución de Problemas

### "No carga mi CSV"
- Verifica que esté en formato CSV (separado por comas)
- Asegúrate de que tenga todas las columnas requeridas
- Abre el CSV en un editor de texto para verificar el formato

### "No se abren las ventanas de WhatsApp"
- Habilita ventanas emergentes en tu navegador
- Intenta con menos clientes (empieza con 5)
- Usa Chrome o Firefox (navegadores recomendados)

### "Los números aparecen inválidos"
- Verifica el formato: debe ser +{código_país}{número}
- Ejemplo: +573001234567 (para Colombia)
- No uses espacios, guiones o caracteres especiales

### "El mensaje sale con variables sin reemplazar"
- Verifica que uses la sintaxis correcta: {nombre}, {monto}, etc.
- Las variables son sensibles a mayúsculas/minúsculas
- No uses espacios dentro de las llaves: {nombre } no funciona

## 📱 Navegadores Soportados

| Navegador | Soporte | Recomendación |
|-----------|---------|--------------|
| Chrome | ✅ Completo | ⭐ Recomendado |
| Firefox | ✅ Completo | ⭐ Recomendado |
| Safari | ✅ Parcial | ⚠️ Algunas ventanas pueden bloquearse |
| Edge | ✅ Completo | ✅ Excelente |
| Opera | ✅ Completo | ✅ Funciona bien |
| Internet Explorer | ❌ No | No usar |

## 💡 Consejos Prácticos

1. **Prueba primero con pocos clientes** - Descarga el CSV de ejemplo, prueba con 3-5 clientes
2. **Personaliza los mensajes** - Los clientes responden mejor a mensajes personalizados
3. **Horarios de envío** - Envía entre 9-20:00 (evita madrugadas)
4. **Frecuencia** - No envíes a los mismos clientes muy seguido
5. **Plantillas diferentes** - Usa diferentes plantillas según el estado de la deuda
6. **Ten WhatsApp abierto** - Abre WhatsApp Web antes de iniciar el envío

## 🚀 Mejoras Futuras

- [ ] Integración con API de WhatsApp Business (sin confirmación manual)
- [ ] Base de datos para guardar historial
- [ ] Seguimiento de entregas y lecturas
- [ ] Templates más avanzados
- [ ] Soporte multi-idioma
- [ ] Exportar reportes en PDF/Excel

## 📄 Licencia

MIT License - Usa esta aplicación libremente en tus proyectos

## 👨‍💻 Desarrollo

### Tecnologías usadas:
- HTML5
- CSS3
- JavaScript vanilla (sin dependencias)

### Estructura:
```
whatsapp-masivos/
├── index.html      # Interfaz de usuario
├── app.js          # Lógica de la aplicación
└── README.md       # Este archivo
```

## 🤝 Contribuir

¿Quieres mejorar esta aplicación? 
1. Fork el repositorio
2. Crea tu rama (`git checkout -b mejora`)
3. Commit tus cambios (`git commit -am 'Agrega mejora'`)
4. Push a la rama (`git push origin mejora`)
5. Abre un Pull Request

## ⚠️ Aviso Legal

**Responsabilidad del usuario:**
- Esta herramienta es para enviar notificaciones legales
- Asegúrate de cumplir con las leyes locales de cobro
- Respeta la privacidad y términos de WhatsApp
- El usuario es responsable del contenido de los mensajes
- No envíes spam o mensajes no autorizados

## 📧 Contacto y Soporte

- 📍 GitHub: [arteminisefsa-star/whatsapp-masivos](https://github.com/arteminisefsa-star/whatsapp-masivos)
- 💬 Issues: Reporta problemas en GitHub
- 🐛 Bugs: Abre un issue con detalles

## 🎓 Tutorial Video (recomendado)

[Aquí irá un enlace a tutorial en YouTube cuando esté disponible]

---

**Versión:** 1.0  
**Última actualización:** Julio 2026  
**Mantenedor:** arteminisefsa-star

---

### ¿Necesitas ayuda?

1. Consulta la sección de **Solución de Problemas**
2. Revisa los **Ejemplos** proporcionados
3. Abre un **Issue** en GitHub con tu pregunta
4. Comparte el **CSV de ejemplo** para diagnóstico

¡Éxito con tu gestión de cobros! 🚀