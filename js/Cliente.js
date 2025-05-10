class Cliente {
    constructor(id, nombre, apellido, pais, ciudad, email, telefono, username, foto = 'default.jpg') {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.pais = pais;
        this.ciudad = ciudad;
        this.email = email;
        this.telefono = telefono;
        this.username = username;
        this.foto = foto;
    }

    obtenerInformacion() {
        return `Nombre: ${this.nombre} ${this.apellido}, País: ${this.pais}, Ciudad: ${this.ciudad}`;
    }

    cambiarEmail(nuevoEmail) {
        this.email = nuevoEmail;
        return `El email se ha actualizado a: ${this.email}`;
    }
};

// Array de clientes
const clientes = [];

// cargo la informacion de data.js
function cargarClientes() {
    if (typeof clientesData !== 'undefined' && Array.isArray(clientesData)) {
        clientesData.forEach(data => {
            const cliente = new Cliente(
                data.login.uuid,
                data.name.first, 
                data.name.last,  
                data.location.country, 
                data.location.city,    
                data.email, 
                data.phone, 
                data.login.username, 
                data.picture.thumbnail 
            );
            clientes.push(cliente);
        });
    }
}

// Función para mostrar clientes
function mostrarClientes() {
    const tbody = document.getElementById('tablaClientes').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    clientes.forEach(cliente => {
        const fila = tbody.insertRow();

        fila.insertCell().textContent = cliente.id;
        fila.insertCell().textContent = `${cliente.nombre} ${cliente.apellido}`;
        fila.insertCell().textContent = `${cliente.pais}, ${cliente.ciudad}`;
        fila.insertCell().textContent = cliente.email;
        fila.insertCell().textContent = cliente.telefono;
        fila.insertCell().textContent = cliente.username;

        const imgCell = fila.insertCell();
        const img = document.createElement('img');
        img.src = cliente.foto;
        img.alt = `Foto de ${cliente.nombre}`;
        img.className = 'thumbnail';
        img.width = 50;
        imgCell.appendChild(img);

        const btnCell = fila.insertCell();
        const btn = document.createElement('button');
        btn.textContent = 'Borrar';
        btn.onclick = () => borrarCliente(cliente.id);
        btnCell.appendChild(btn);
    });
}

function addClient() {
    const idInput = document.getElementById('identificacion');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const paisInput = document.getElementById('pais');
    const ciudadInput = document.getElementById('ciudad');
    const emailInput = document.getElementById('correo');
    const telefonoInput = document.getElementById('telefono');
    const usernameInput = document.getElementById('username');
    const fotoInput = document.getElementById('foto');

    if (!idInput || !nombreInput || !emailInput) {
        console.error('Faltan elementos necesarios en el formulario.');
        return;
    }

    const id = idInput.value;
    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const pais = paisInput.value;
    const ciudad = ciudadInput.value;
    const email = emailInput.value;
    const telefono = telefonoInput.value;
    const username = usernameInput.value;
    const foto = fotoInput.files[0] ? URL.createObjectURL(fotoInput.files[0]) : 'default.jpg';

    const nuevoCliente = new Cliente(id, nombre, apellido, pais, ciudad, email, telefono, username, foto);
    clientes.push(nuevoCliente);
    mostrarClientes();

    document.getElementById('clienteForm').reset();
}

function borrarCliente(id) {
    const confirmacion = prompt('¿Estás seguro de que quieres eliminar este cliente? Escribe "si" para confirmar.');

    if (confirmacion && confirmacion.toLowerCase() === 'si') {
        const index = clientes.findIndex(cliente => cliente.id === id);
        if (index !== -1) {
            clientes.splice(index, 1);
            mostrarClientes();
        }
    }
}

document.getElementById('clienteForm').addEventListener('submit', (event) => {
    event.preventDefault();
    addClient();
});


cargarClientes();
mostrarClientes();