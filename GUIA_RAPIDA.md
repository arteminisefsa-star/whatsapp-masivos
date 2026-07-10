# 🚀 GUÍA RÁPIDA - Cómo Usar WhatsApp Cobros

## 📋 Tabla de Contenidos
1. [Acceso rápido](#acceso-rápido)
2. [Primeros pasos (5 minutos)](#primeros-pasos-5-minutos)
3. [Tutoriales paso a paso](#tutoriales-paso-a-paso)
4. [Preguntas frecuentes](#preguntas-frecuentes)

---

## 🌐 Acceso Rápido

### Opción 1: Online (Recomendado)
```
https://arteminisefsa-star.github.io/whatsapp-masivos
```
✅ Sin instalación  
✅ Funciona en cualquier navegador  
✅ Acceso desde el móvil  

### Opción 2: Local
1. Descarga: https://github.com/arteminisefsa-star/whatsapp-masivos/archive/refs/heads/main.zip
2. Descomprime la carpeta
3. Abre `index.html` en tu navegador

---

## ⚡ Primeros Pasos (5 minutos)

### 1️⃣ Prepara tu lista de deudores

**Método A: Descargar ejemplo**
- En la app, haz clic en "📥 Descargar ejemplo CSV"
- Se descargará `ejemplo_deudores.csv`
- Abre con Excel y modifica con tus datos

**Método B: Crear desde cero**
- Abre Excel o Google Sheets
- Copia esta estructura:

```
numero,nombre,monto_deuda,fecha_vencimiento,tipo_deuda,dias_atraso
+573001234567,Juan Pérez,150000,2026-06-30,Factura,10
+573009876543,María García,250000,2026-06-15,Préstamo,25
```

**Importante:** 
- El número DEBE tener `+` y código de país
- Montos sin símbolos: `150000` NO `$150.000`
- Fechas en formato: `AAAA-MM-DD`

### 2️⃣ Guarda como CSV

**En Excel:**
- Archivo → Guardar como
- Tipo: "CSV (separado por comas)" 
- Nombre: `deudores.csv`

**En Google Sheets:**
- Archivo → Descargar → CSV

### 3️⃣ Carga en la app

1. Ve a: https://arteminisefsa-star.github.io/whatsapp-masivos
2. Tab "📥 Datos"
3. Selecciona tu archivo CSV
4. ¡Automáticamente se cargarán los datos!

### 4️⃣ Selecciona plantilla

1. Tab "📋 Plantillas"
2. Elige una (o personaliza)
3. Las opciones disponibles son:
   - 📢 Recordatorio Simple
   - 🔴 Recordatorio Urgente
   - 💰 Con Plan de Pago
   - ⚖️ Notificación Final
   - 😊 Mensaje de Cortesía

### 5️⃣ Revisa antes de enviar

1. Tab "👁️ Vista Previa"
2. Verifica los datos:
   - ✅ Clientes cargados
   - ✅ Deuda total
   - ✅ Clientes con atraso
3. Usa filtros si necesitas

### 6️⃣ Envía

1. Tab "🚀 Envío"
2. Botón "🚀 Comenzar envío"
3. Se abrirán ventanas de WhatsApp
4. **IMPORTANTE**: Confirma cada envío manualmente

---

## 📚 Tutoriales Paso a Paso

### Tutorial 1: Enviar a 5000 clientes

```
1. Descarga tu lista completa en CSV
2. Verifica que tenga exactamente 6 columnas:
   - numero
   - nombre
   - monto_deuda
   - fecha_vencimiento
   - tipo_deuda
   - dias_atraso

3. En la app:
   ✅ Carga el archivo
   ✅ Selecciona plantilla
   ✅ Revisa estadísticas
   ✅ Inicia envío

4. ⚠️ La app abrirá ventanas de WhatsApp
   Debes confirmar cada una manualmente
```

### Tutorial 2: Personalizar mensajes

**Ejemplo - Plantilla original:**
```
Hola {nombre}, tu {tipo_deuda} de ${monto} venció hace {dias} días.
Es urgente que realices el pago. Contáctanos si tienes dudas.
```

**Variables disponibles:**
- `{nombre}` → Nombre del cliente
- `{monto}` → Cantidad adeudada
- `{fecha}` → Fecha de vencimiento
- `{dias}` → Días de atraso
- `{tipo_deuda}` → Tipo (Factura, Préstamo, etc)

**Ejemplo personalizado:**
```
Hola {nombre}, recordamos que tu pago de ${monto} está pendiente.
Vence el {fecha}. Llama al 3001234567 para más información.
```

### Tutorial 3: Filtrar clientes

**Caso 1: Solo deudas de más de 30 días**
1. Tab "Vista Previa"
2. Filtro "Mínimo días atraso" → Selecciona "30+ días"
3. La tabla se actualiza automáticamente

**Caso 2: Solo facturas de un tipo**
1. Tab "Vista Previa"
2. Filtro "Tipo de Deuda" → Selecciona "Factura"
3. Ve solo las facturas

**Caso 3: Combinar filtros**
1. Tipo de Deuda: "Préstamo"
2. Mínimo días: "10+ días"
3. Verás solo préstamos con 10+ días de atraso

---

## ❓ Preguntas Frecuentes

### P: ¿Es seguro subir mis datos?
R: ✅ **100% seguro**. Los datos se procesan SOLO en tu navegador. Nada se envía a servidores.

### P: ¿Necesito crear cuenta?
R: ❌ **No**. Es totalmente anónimo y sin registro.

### P: ¿Puedo enviar 5000 mensajes?
R: ✅ **Sí**, pero debes confirmar cada uno manualmente en WhatsApp. Tarda aprox 40 minutos (5000 × 0.5 seg).

### P: ¿Funciona con números sin WhatsApp?
R: ❌ **No**. Solo envía a números con WhatsApp activo.

### P: ¿Puedo programar envíos?
R: ❌ **No, esta versión no**. Solo envía inmediatamente. (Mejora futura planeada)

### P: ¿Qué navegadores funcionan?
R: ✅ Chrome, Firefox, Edge, Opera  
⚠️ Safari parcial  
❌ Internet Explorer

### P: Mi CSV no carga, ¿qué hago?
R: Verifica:
1. ¿Está en formato CSV? (no .xlsx)
2. ¿Tiene 6 columnas exactas?
3. ¿El encabezado es exacto?
```
numero,nombre,monto_deuda,fecha_vencimiento,tipo_deuda,dias_atraso
```

### P: Los números salen inválidos
R: Deben tener:
- ✅ Símbolo `+` al inicio
- ✅ Código de país (57 para Colombia, 34 para España, etc)
- ✅ Mínimo 10 dígitos

Ejemplos válidos:
- +573001234567 (Colombia)
- +34912345678 (España)
- +5491234567890 (Argentina)

### P: ¿Puedo editar clientes dentro de la app?
R: ❌ **No en esta versión**. Edita el CSV y recarga.

### P: ¿Se guardan los envíos?
R: ✅ Sí, aparecen en "Registro de Envíos" al terminar.  
⚠️ Se pierden si cierras la página.

### P: ¿Cuánto tarda enviar 5000?
R: Aproximadamente:
- 500 clientes = 4-5 minutos
- 1000 clientes = 8-10 minutos
- 5000 clientes = 40-50 minutos

### P: ¿Puedo usar desde el móvil?
R: ✅ Sí, funciona en navegadores móviles.  
⚠️ Mejor experiencia en desktop.

### P: ¿Hay límite de envíos por día?
R: ❌ **No hay límite** en la app.  
⚠️ Pero WhatsApp puede restringir si detecta spam (envía mensajes reales, no bots).

---

## 🎯 Casos de Uso Comunes

### Caso 1: Cobrador Individual
```
1. Tienes 50 deudores en Excel
2. Los exportas como CSV
3. Cargas en la app
4. Haces envío masivo en 5 minutos
5. Esperas respuestas en WhatsApp
```

### Caso 2: Agencia de Cobros
```
1. Importas 2000 deudores
2. Filtras por tipo y días de atraso
3. Aplicas plantilla específica
4. Haces envío a lotes
5. Registras en el historial
```

### Caso 3: Empresa con Múltiples Sucursales
```
1. Creas CSV por sucursal
2. Carga cada uno por separado
3. Personaliza mensaje por región
4. Envía a cada grupo
5. Genera reportes de envío
```

---

## 📞 Soporte

¿Problemas? Opciones:

1. **Consulta el README.md** - Solución de problemas extendida
2. **Abre un Issue en GitHub** - https://github.com/arteminisefsa-star/whatsapp-masivos/issues
3. **Comparte un ejemplo** - Envía tu CSV de prueba para diagnóstico

---

## 🔄 Flujo Completo (Resumen)

```
┌─────────────────┐
│  Prepara CSV    │ ← Creas lista de deudores
└────────┬────────┘
         │
┌────────▼────────┐
│  Carga archivo  │ ← Tab "Datos" → Selecciona CSV
└────────┬────────┘
         │
┌────────▼────────┐
│ Elige plantilla │ ← Tab "Plantillas" → Selecciona o personaliza
└────────┬────────┘
         │
┌────────▼────────┐
│ Revisa datos    │ ← Tab "Vista Previa" → Verifica estadísticas
└────────┬────────┘
         │
┌────────▼────────┐
│  Envía mensajes │ ← Tab "Envío" → Click en botón
└────────┬────────┘
         │
┌────────▼────────┐
│ Confirma en WA  │ ← Confirma cada envío manualmente
└────────┬────────┘
         │
┌────────▼────────┐
│   ¡Completado!  │ ← Ves registro de envíos
└─────────────────┘
```

---

## ✅ Checklist Antes de Enviar

- [ ] CSV tiene 6 columnas exactas
- [ ] Números tienen formato +XXXXXXXXXXX
- [ ] Montos son números sin símbolos
- [ ] Fechas son AAAA-MM-DD
- [ ] Seleccioné plantilla
- [ ] Verifiqué estadísticas
- [ ] Tengo WhatsApp abierto en otra pestaña
- [ ] Mi navegador permite ventanas emergentes

---

**¿Listo para empezar?** 🚀

👉 Ir a: https://arteminisefsa-star.github.io/whatsapp-masivos

---

**Versión:** 1.0  
**Última actualización:** Julio 2026