// Variables globales
let clientes = [];
let enviados = 0;
let enProceso = false;

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
            clientes = parsearCSV(contenido);
            
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

// Parsear archivo CSV
function parsearCSV(contenido) {
    const lineas = contenido.trim().split('\n');
    const clientesParsados = [];
    
    // Saltar encabezado
    for (let i = 1; i < lineas.length; i++) {
        const linea = lineas[i].trim();
        
        if (!linea) continue;
        
        // Separar por comas
        const partes = linea.split(',');
        
        if (partes.length < 2) continue;
        
        const numero = partes[0].trim();
        const nombre = partes[1].trim();
        
        // Validar número
        const esValido = validarNumeroWhatsApp(numero);
        
        clientesParsados.push({
            numero: numero,
            nombre: nombre,
            valido: esValido
        });
    }
    
    return clientesParsados;
}

// Validar número de WhatsApp
function validarNumeroWhatsApp(numero) {
    // Debe tener + y al menos 10 dígitos
    const regex = /^\+\d{10,}$/;
    return regex.test(numero);
}

// Mostrar previa de clientes
function mostrarPrevia() {
    const seccionPrevia = document.getElementById('seccionPrevia');
    const seccionMensaje = document.getElementById('seccionMensaje');
    const seccionEnvio = document.getElementById('seccionEnvio');
    
    seccionPrevia.style.display = 'block';
    seccionMensaje.style.display = 'block';
    seccionEnvio.style.display = 'block';
    
    // Calcular estadísticas
    const validos = clientes.filter(c => c.valido).length;
    const invalidos = clientes.length - validos;
    
    document.getElementById('totalClientes').textContent = clientes.length;
    document.getElementById('clientesValidos').textContent = validos;
    document.getElementById('clientesInvalidos').textContent = invalidos;
    
    // Mostrar tabla (primeros 20)
    const tbody = document.getElementById('tablaClientes');
    tbody.innerHTML = '';
    
    const clientesAMostrar = clientes.slice(0, 20);
    
    clientesAMostrar.forEach((cliente, idx) => {
        const tr = document.createElement('tr');
        const estado = cliente.valido ? '✅ Válido' : '❌ Inválido';
        const colorEstado = cliente.valido ? '#28a745' : '#dc3545';
        
        tr.innerHTML = `
            <td>${idx + 1}</td>
            <td><code>${cliente.numero}</code></td>
            <td>${cliente.nombre}</td>
            <td style="color: ${colorEstado}; font-weight: bold;">${estado}</td>
        `;
        
        tbody.appendChild(tr);
    });
    
    // Si hay más de 20
    if (clientes.length > 20) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="4" style="text-align: center; color: #999;">... y ${clientes.length - 20} más</td>`;
        tbody.appendChild(tr);
    }
}

// Limpiar lista de clientes
function limpiarClientes() {
    if (confirm('¿Deseas limpiar la lista de clientes?')) {
        clientes = [];
        document.getElementById('archivo').value = '';
        document.getElementById('seccionPrevia').style.display = 'none';
        document.getElementById('seccionMensaje').style.display = 'none';
        document.getElementById('seccionEnvio').style.display = 'none';
        document.getElementById('resultado').style.display = 'none';
        mostrarResultado('🗑️ Lista limpiada', 'info');
    }
}

// Contador de caracteres
document.getElementById('mensaje').addEventListener('input', function() {
    const cantidad = this.value.length;
    document.getElementById('contadorMensaje').textContent = cantidad + '/1000 caracteres';
    
    if (cantidad > 1000) {
        this.value = this.value.substring(0, 1000);
    }
});

// Descargar ejemplo CSV
function descargarEjemploCSV() {
    const contenido = `numero,nombre
+573001234567,Juan Pérez
+573009876543,María García
+573015678901,Carlos López
+573024567890,Ana Martínez
+573033456789,Pedro Rodríguez`;
    
    const blob = new Blob([contenido], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ejemplo_clientes.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    mostrarResultado('📥 Descargado: ejemplo_clientes.csv', 'success');
}

// Iniciar envío
function iniciarEnvio() {
    const mensaje = document.getElementById('mensaje').value.trim();
    
    if (!mensaje) {
        mostrarResultado('❌ Escribe un mensaje para enviar', 'error');
        return;
    }
    
    if (clientes.length === 0) {
        mostrarResultado('❌ Carga clientes primero', 'error');
        return;
    }
    
    // Filtrar solo clientes válidos
    const clientesValidos = clientes.filter(c => c.valido);
    
    if (clientesValidos.length === 0) {
        mostrarResultado('❌ No hay clientes con números válidos', 'error');
        return;
    }
    
    if (confirm(`¿Enviar mensaje a ${clientesValidos.length} clientes?\n\nNOTA: Se abrirán ventanas de WhatsApp. Debes confirmar cada envío manualmente.`)) {
        enviarMasivos(clientesValidos, mensaje);
    }
}

// Enviar mensajes masivos
function enviarMasivos(clientesValidos, mensaje) {
    enProceso = true;
    const boton = event.target;
    boton.disabled = true;
    
    const progreso = document.getElementById('progreso');
    const progresoBarra = document.getElementById('progresoBarra');
    progreso.style.display = 'block';
    
    enviados = 0;
    let clienteActual = 0;
    const total = clientesValidos.length;
    
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
                enProceso = false;
            }, 500);
            
            return;
        }
        
        const cliente = clientesValidos[clienteActual];
        const numeroLimpio = cliente.numero.replace('+', '');
        
        // Personalizar mensaje
        let mensajePersonalizado = mensaje.replace('{nombre}', cliente.nombre);
        
        // Crear URL de WhatsApp
        const url = `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensajePersonalizado)}`;
        
        // Abrir en nueva ventana
        window.open(url, `_blank_${clienteActual}`);
        
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

// Mostrar mensaje de bienvenida
window.addEventListener('load', function() {
    mostrarResultado('👋 Bienvenido a WhatsApp Masivos. Comienza cargando tu archivo CSV', 'info');
});