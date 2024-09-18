class Libro {
    constructor(título, autor) {
        this.título = título;
        this.autor = autor;
        this.disponible = true;
    }
}

class Biblioteca {
    constructor() {
        this.libros = [];
    }

    agregarLibro(libro) {
        this.libros.push(libro);
        this.mostrarMensaje(`Libro "${libro.título}" agregado a la biblioteca.`);
    }

    prestarLibro(título) {
        const libro = this.libros.find(libro => libro.título === título);
        if (libro) {
            if (libro.disponible) {
                libro.disponible = false;
                this.mostrarMensaje(`Libro "${título}" ha sido prestado.`);
            } else {
                this.mostrarMensaje(`El libro "${título}" no está disponible.`);
            }
        } else {
            this.mostrarMensaje(`El libro "${título}" no fue encontrado.`);
        }
    }

    devolverLibro(título) {
        const libro = this.libros.find(libro => libro.título === título);
        if (libro) {
            if (!libro.disponible) {
                libro.disponible = true;
                this.mostrarMensaje(`Libro "${título}" ha sido devuelto.`);
            } else {
                this.mostrarMensaje(`El libro "${título}" ya estaba disponible.`);
            }
        } else {
            this.mostrarMensaje(`El libro "${título}" no fue encontrado.`);
        }
    }

    buscarLibros(consulta) {
        const resultados = this.libros.filter(libro => 
            libro.título.toLowerCase().includes(consulta.toLowerCase()) ||
            libro.autor.toLowerCase().includes(consulta.toLowerCase())
        );

        const resultadosElement = document.getElementById('resultados');
        resultadosElement.innerHTML = '';

        if (resultados.length > 0) {
            resultados.forEach(libro => {
                const estado = libro.disponible ? 'Disponible' : 'Prestado';
                resultadosElement.innerHTML += `<li>${libro.título} por ${libro.autor} - ${estado}</li>`;
            });
        } else {
            this.mostrarMensaje("No se encontraron libros que coincidan con la búsqueda.");
        }
    }

    mostrarMensaje(mensaje) {
        document.getElementById('mensaje').innerText = mensaje;
    }
}

const biblioteca = new Biblioteca();

function agregarLibro() {
    const título = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;

    if (título && autor) {
        const libro = new Libro(título, autor);
        biblioteca.agregarLibro(libro);
    } else {
        biblioteca.mostrarMensaje("Por favor, complete los campos de título y autor.");
    }
}

function prestarLibro() {
    const título = document.getElementById('prestamo').value;
    biblioteca.prestarLibro(título);
}

function devolverLibro() {
    const título = document.getElementById('devolucion').value;
    biblioteca.devolverLibro(título);
}

function buscarLibros() {
    const consulta = document.getElementById('buscar').value;
    biblioteca.buscarLibros(consulta);
}
