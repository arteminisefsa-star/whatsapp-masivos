// Variables globales
let clientes = [];
let enviados = 0;
let enProceso = false;
let plantillaActual = null;

// Plantillas pre-configuradas
const plantillas = [
    {
        id: 'recordatorio_simple',
        nombre: '📢 Recordatorio Simple',
        descripcion: 'Recordatorio amigable del pago pendiente',
        mensaje: 'Hola {nombre}, queremos recordarte que tienes una deuda pendiente de ${monto} desde el {fecha}. Por favor, realiza el pago lo antes posible.'
    },
    {
        id: 'recordatorio_urgente',
        nombre: '🔴 Recordatorio Urgente',
        descripcion: 'Mensaje más directo para deudas vencidas',
        mensaje: 'Hola {nombre}, tu {tipo_deuda} de ${monto} venció hace {dias} días. Es urgente que realices el pago. Contáctanos si tienes dudas.'
    },
    {
        id: 'con_oferta',
        nombre: '💰 Con Plan de Pago',
        descripcion: 'Ofrece alternativas de pago',
        mensaje: 'Hola {nombre}, ofrecemos un plan de pago para tu deuda de ${monto}. Puedes pagar en 3 cuotas sin interés. ¿Te interesa? Responde SÍ'
    },
    {
        id: 'final',
        nombre: '⚖️ Notificación Final',
        descripcion: 'Último aviso antes de acciones legales',
        mensaje: 'Hola {nombre}, esta es nuestra ÚLTIMA notificación. Debes pagar ${monto} antes del {fecha}. Después tomaremos acciones legales.'
    },
    {
        id: 'cortesia',
        nombre: '😊 Mensaje de Cortesía',
        descripcion: 'Para clientes con pequeños atrasos',
        mensaje: 'Hola {nombre}, notamos que tu pago de ${monto} está pendiente. ¿Necesitas ayuda para completar el pago? Estamos aquí para asistirte.'
    }
];

// Inicializar cuando carga la página
window.addEventListener('load', function() {
    inicializarPlantillas();
    mostrarResultado('👋 Bienvenido a WhatsApp Cobros. Comienza cargando tu archivo CSV', 'info');
});

// Inicializar plantillas
function inicializarPlantillas() {
    const container = document.getElementById('plantillas-container');
    container.innerHTML = '';
    
    plantillas.forEach(plantilla => {
        const card = document.createElement('div');
        card.className = 'plantilla-card';
        card.onclick = () => seleccionarPlantilla(plantilla, card);
        
        card.innerHTML = `
            <h4>${plantilla.nombre}</h4>
            <p>${plantilla.descripcion}</p>
            <small style="color: #999;">Preview: ${plantilla.mensaje.substring(0, 60)}...</small>
        `;
        
        container.appendChild(card);
    });
}

// Seleccionar plantilla
function seleccionarPlantilla(plantilla, elemento) {
    plantillaActual = plantilla;
    document.getElementById('mensaje').value = plantilla.mensaje;
    actualizarContadorMensaje();
    
    // Actualizar UI
    document.querySelectorAll('.plantilla-card').forEach(card => {
        card.classList.remove('active');
    });
    elemento.classList.add('active');
    
    mostrarResultado(`✅ Plantilla "${plantilla.nombre}" seleccionada`, 'success');
}

// Cambiar entre tabs
function cambiarTab(tabName) {
    // Ocultar todos los tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Desactivar todos los botones
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar tab seleccionado
    document.getElementById(`tab-${tabName}`).classList.add('active');
    event.target.classList.add('active');
}

// Cuando el usuario selecciona un archivo CSV
document.getElementById('archivo').addEventListener('change', function(e) {
    const archivo = e.target.files[0];
    
    if (!archivo) return;
    
    // Validar que sea CSV
    if (!archivo.name.endsWith('.csv')) {
        mostrarResultado('❌ Por favor selecciona un archivo CSV', 'error');
        return;
    }
    
    const lector = new FileReader();
    
    lector.onload = function(evento) {
        try {
            const contenido = evento.target.result;
            clientes = parsearCSVConDeudas(contenido);
            
            if (clientes.length === 0) {
                mostrarResultado('❌ El archivo está vacío', 'error');
                return;
            }
            
            if (clientes.length > 5000) {
                mostrarResultado('⚠️ Máximo 5000 clientes. Tu archivo tiene ' + clientes.length, 'warning');
                clientes = clientes.slice(0, 5000);
            }
            
            mostrarPrevia();
            mostrarResultado('✅ ' + clientes.length + ' clientes cargados correctamente', 'success');
        } catch (error) {
            mostrarResultado('❌ Error al procesar el archivo: ' + error.message, 'error');
        }
    };
    
    lector.readAsText(archivo);
});

// Parsear CSV con información de deudas
function parsearCSVConDeudas(contenido) {
    const lineas = contenido.trim().split('\n');
    const clientesParsados = [];
    
    // Saltar encabezado
    for (let i = 1; i < lineas.length; i++) {
        const linea = lineas[i].trim();
        
        if (!linea) continue;
        
        const partes = linea.split(',');
        
        if (partes.length < 4) continue;
        
        const numero = partes[0].trim();
        const nombre = partes[1].trim();
        const montoDeuda = partes[2].trim();
        const fechaVencimiento = partes[3].trim();
        const tipoDeuda = partes[4] ? partes[4].trim() : 'Otro';
        const diasAtraso = partes[5] ? parseInt(partes[5].trim()) : 0;
        
        // Validar número
        const esValido = validarNumeroWhatsApp(numero);
        
        clientesParsados.push({
            numero: numero,
            nombre: nombre,
            monto_deuda: parseFloat(montoDeuda),
            fecha_vencimiento: fechaVencimiento,
            tipo_deuda: tipoDeuda,
            dias_atraso: diasAtraso,
            valido: esValido
        });
    }
    
    return clientesParsados;
}

// Validar número de WhatsApp
function validarNumeroWhatsApp(numero) {
    const regex = /^\+\d{10,}$/;
    return regex.test(numero);
}

// Mostrar previa de clientes
function mostrarPrevia() {
    const tabPreview = document.getElementById('tab-preview');
    
    if (tabPreview) {
        tabPreview.style.display = 'block';
    }
    
    // Calcular estadísticas
    const validos = clientes.filter(c => c.valido);
    const conDeuda = validos.filter(c => c.dias_atraso > 0);
    const deudaTotal = conDeuda.reduce((sum, c) => sum + c.monto_deuda, 0);
    const diasPromedio = conDeuda.length > 0 ? 
        Math.round(conDeuda.reduce((sum, c) => sum + c.dias_atraso, 0) / conDeuda.length) : 0;
    
    document.getElementById('totalClientes').textContent = clientes.length;
    document.getElementById('clientesConDeuda').textContent = conDeuda.length;
    document.getElementById('deudaTotal').textContent = '$' + deudaTotal.toLocaleString('es-CO');
    document.getElementById('diasPromedio').textContent = diasPromedio;
    
    // Mostrar tabla (primeros 20)
    actualizarTablaPrevia();
}

// Actualizar tabla de previa con filtros
function actualizarTablaPrevia() {
    const filtroTipo = document.getElementById('filtroTipo').value;
    const filtroDias = parseInt(document.getElementById('filtroDias').value);
    
    const tbody = document.getElementById('tablaClientesPrevia');
    tbody.innerHTML = '';
    
    let clientesFiltrados = clientes.filter(c => {
        if (!c.valido) return false;
        if (c.dias_atraso <= 0) return false;
        if (filtroTipo && c.tipo_deuda !== filtroTipo) return false;
        if (filtroDias > 0 && c.dias_atraso < filtroDias) return false;
        return true;
    });
    
    const clientesAMostrar = clientesFiltrados.slice(0, 20);
    
    clientesAMostrar.forEach((cliente, idx) => {
        const tr = document.createElement('tr');
        const estado = cliente.dias_atraso > 30 ? '🔴 Crítico' : 
                      cliente.dias_atraso > 10 ? '🟠 Urgente' : '🟡 Pendiente';
        
        tr.innerHTML = `
            <td>${idx + 1}</td>
            <td><strong>${cliente.nombre}</strong></td>
            <td>$${cliente.monto_deuda.toLocaleString('es-CO')}</td>
            <td>${cliente.tipo_deuda}</td>
            <td>${cliente.dias_atraso} días</td>
            <td>${estado}</td>
        `;
        
        tbody.appendChild(tr);
    });
    
    if (clientesFiltrados.length > 20) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="6" style="text-align: center; color: #999;">... y ${clientesFiltrados.length - 20} más</td>`;
        tbody.appendChild(tr);
    }
}

// Filtros dinámicos
document.addEventListener('DOMContentLoaded', function() {
    const filtroTipo = document.getElementById('filtroTipo');
    const filtroDias = document.getElementById('filtroDias');
    
    if (filtroTipo) filtroTipo.addEventListener('change', actualizarTablaPrevia);
    if (filtroDias) filtroDias.addEventListener('change', actualizarTablaPrevia);
});

// Contador de caracteres
document.getElementById('mensaje').addEventListener('input', actualizarContadorMensaje);

function actualizarContadorMensaje() {
    const cantidad = document.getElementById('mensaje').value.length;
    document.getElementById('contadorMensaje').textContent = cantidad + '/1000 caracteres';
    
    if (cantidad > 1000) {
        document.getElementById('mensaje').value = document.getElementById('mensaje').value.substring(0, 1000);
    }
}

// Limpiar lista de clientes
function limpiarClientes() {
    if (confirm('¿Deseas limpiar la lista de clientes?')) {
        clientes = [];
        document.getElementById('archivo').value = '';
        document.getElementById('resultado').style.display = 'none';
        mostrarResultado('🗑️ Lista limpiada', 'info');
    }
}

// Descargar ejemplo CSV
function descargarEjemploCSV() {
    const contenido = `numero,nombre,monto_deuda,fecha_vencimiento,tipo_deuda,dias_atraso
+573001234567,Juan Pérez,150000,2026-06-30,Factura,10
+573009876543,María García,250000,2026-06-15,Préstamo,25
+573015678901,Carlos López,100000,2026-07-05,Servicios,5
+573024567890,Ana Martínez,500000,2026-05-30,Factura,40
+573033456789,Pedro Rodríguez,75000,2026-07-08,Otro,2`;
    
    descargarArchivo(contenido, 'ejemplo_deudores.csv', 'text/csv');
    mostrarResultado('📥 Descargado: ejemplo_deudores.csv', 'success');
}

// Descargar plantilla Excel
function descargarPlantillaExcel() {
    const contenido = `numero,nombre,monto_deuda,fecha_vencimiento,tipo_deuda,dias_atraso
+57,Nombre Cliente,0,AAAA-MM-DD,Tipo,0
+573001234567,Juan Pérez,150000,2026-06-30,Factura,10
+573009876543,María García,250000,2026-06-15,Préstamo,25
+573015678901,Carlos López,100000,2026-07-05,Servicios,5
+573024567890,Ana Martínez,500000,2026-05-30,Factura,40
+573033456789,Pedro Rodríguez,75000,2026-07-08,Otro,2`;
    
    descargarArchivo(contenido, 'plantilla_deudores.csv', 'text/csv');
    mostrarResultado('📊 Descargada: plantilla_deudores.csv', 'success');
}

// Función auxiliar para descargar
function descargarArchivo(contenido, nombre, tipo) {
    const blob = new Blob([contenido], { type: tipo });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Iniciar envío
function iniciarEnvio() {
    const mensaje = document.getElementById('mensaje').value.trim();
    
    if (!mensaje) {
        mostrarResultado('❌ Selecciona una plantilla o escribe un mensaje', 'error');
        return;
    }
    
    if (clientes.length === 0) {
        mostrarResultado('❌ Carga clientes primero', 'error');
        return;
    }
    
    // Filtrar clientes con deuda
    const clientesConDeuda = clientes.filter(c => c.valido && c.dias_atraso > 0);
    
    if (clientesConDeuda.length === 0) {
        mostrarResultado('❌ No hay clientes con deuda', 'error');
        return;
    }
    
    if (confirm(`¿Enviar mensaje a ${clientesConDeuda.length} clientes con deuda?\n\nNOTA: Se abrirán ventanas de WhatsApp. Debes confirmar cada envío manualmente.`)) {
        cambiarTab('envio');
        setTimeout(() => {
            enviarMasivos(clientesConDeuda, mensaje);
        }, 100);
    }
}

// Enviar mensajes masivos
function enviarMasivos(clientesConDeuda, mensaje) {
    enProceso = true;
    const boton = event.target;
    boton.disabled = true;
    
    const progreso = document.getElementById('progreso');
    const progresoBarra = document.getElementById('progresoBarra');
    progreso.style.display = 'block';
    
    enviados = 0;
    let clienteActual = 0;
    const total = clientesConDeuda.length;
    const registroEnvios = [];
    
    function enviarSiguiente() {
        if (clienteActual >= total) {
            // Fin del envío
            progresoBarra.style.width = '100%';
            progresoBarra.textContent = '100%';
            
            setTimeout(() => {
                boton.disabled = false;
                mostrarResultado(
                    `✅ Proceso completado<br>
                    Se abrieron ${enviados} chats de WhatsApp<br>
                    <small style="color: #666;">Recuerda confirmar el envío en cada ventana abierta</small>`,
                    'success'
                );
                
                // Mostrar registro de envíos
                mostrarRegistroEnvios(registroEnvios);
                enProceso = false;
            }, 500);
            
            return;
        }
        
        const cliente = clientesConDeuda[clienteActual];
        const numeroLimpio = cliente.numero.replace('+', '');
        
        // Personalizar mensaje
        let mensajePersonalizado = mensaje
            .replace(/{nombre}/g, cliente.nombre)
            .replace(/{monto}/g, cliente.monto_deuda.toLocaleString('es-CO'))
            .replace(/{fecha}/g, cliente.fecha_vencimiento)
            .replace(/{dias}/g, cliente.dias_atraso)
            .replace(/{tipo_deuda}/g, cliente.tipo_deuda);
        
        // Crear URL de WhatsApp
        const url = `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensajePersonalizado)}`;
        
        // Abrir en nueva ventana
        window.open(url, `_blank_${clienteActual}`);
        
        // Registrar envío
        registroEnvios.push({
            nombre: cliente.nombre,
            monto: cliente.monto_deuda,
            hora: new Date().toLocaleTimeString('es-CO')
        });
        
        enviados++;
        clienteActual++;
        
        // Actualizar progreso
        const porcentaje = Math.round((clienteActual / total) * 100);
        progresoBarra.style.width = porcentaje + '%';
        progresoBarra.textContent = porcentaje + '%';
        
        // Delay de 300ms entre cada apertura
        setTimeout(enviarSiguiente, 300);
    }
    
    // Iniciar envío
    enviarSiguiente();
}

// Mostrar registro de envíos
function mostrarRegistroEnvios(registroEnvios) {
    const registroDiv = document.getElementById('registroEnvios');
    const tbody = document.getElementById('tablaRegistroEnvios');
    
    tbody.innerHTML = '';
    
    registroEnvios.forEach((registro, idx) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${registro.nombre}</td>
            <td>$${registro.monto.toLocaleString('es-CO')}</td>
            <td>${registro.hora}</td>
            <td style="color: #28a745; font-weight: bold;">✅ Enviado</td>
        `;
        tbody.appendChild(tr);
    });
    
    registroDiv.style.display = 'block';
}

// Mostrar resultado
function mostrarResultado(mensaje, tipo) {
    const div = document.getElementById('resultado');
    div.className = `resultado ${tipo}`;
    div.innerHTML = mensaje;
    div.style.display = 'block';
    
    // Auto-ocultar si es info
    if (tipo === 'info') {
        setTimeout(() => {
            div.style.display = 'none';
        }, 3000);
    }
    
    // Scroll hacia el resultado
    div.scrollIntoView({ behavior: 'smooth' });
}