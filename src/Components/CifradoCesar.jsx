import React, { useState } from 'react';
import ManejoErrores from './ManejoErrores'; // Componente para manejar y mostrar errores
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Asegúrate de instalar Font Awesome
import { faClipboard } from '@fortawesome/free-solid-svg-icons'; // Ícono de portapapeles
import Slider from "react-slick"; // Importa react-slick

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CifradoCesar() {
    const [mensaje, setMensaje] = useState('');
    const [mensajeCifrado, setMensajeCifrado] = useState('');
    const [desplazamiento, setDesplazamiento] = useState(0);
    const [error, setError] = useState('');
    const [modalTipo, setModalTipo] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [tooltip, setTooltip] = useState('');
    const [tooltipPos, setTooltipPos] = useState({ left: 0, top: 0 }); // Posición del tooltip

    const cifrarMensaje = (texto, despl) => {
        return texto
            .split('')
            .map(char => {
                if (char.match(/[A-Z]/)) {
                    return String.fromCharCode((char.charCodeAt(0) + despl - 65) % 26 + 65);
                } else {
                    return char;
                }
            })
            .join('');
    };

    const descifrarMensaje = (texto, despl) => {
        return texto
            .split('')
            .map(char => {
                if (char.match(/[A-Z]/)) {
                    return String.fromCharCode((char.charCodeAt(0) - despl + 26 - 65) % 26 + 65);
                } else {
                    return char;
                }
            })
            .join('');
    };

    const manejarCambioMensaje = (e) => {
        const texto = e.target.value.toUpperCase();
        setMensaje(texto);
        if (desplazamiento > 0) {
            const cifrado = cifrarMensaje(texto, parseInt(desplazamiento));
            setMensajeCifrado(cifrado);
            setError('');
        } else {
            setError('Por favor, ingrese un número de desplazamiento mayor a 0.');
        }
    };

    const manejarCambioMensajeCifrado = (e) => {
        const texto = e.target.value.toUpperCase();
        setMensajeCifrado(texto);
        if (desplazamiento > 0) {
            const descifrado = descifrarMensaje(texto, parseInt(desplazamiento));
            setMensaje(descifrado);
            setError('');
        } else {
            setError('Por favor, ingrese un número de desplazamiento mayor a 0.');
        }
    };

    const manejarCambioDesplazamiento = (e) => {
        const valor = parseInt(e.target.value);
        setDesplazamiento(valor);
        if (mensaje && valor > 0) {
            setMensajeCifrado(cifrarMensaje(mensaje, valor));
            setError('');
        } else if (mensajeCifrado && valor > 0) {
            setMensaje(descifrarMensaje(mensajeCifrado, valor));
            setError('');
        } else {
            setError('Por favor, ingrese un mensaje y un número de desplazamiento válido.');
        }
    };

    const abrirModal = (tipo) => {
        setModalTipo(tipo);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setModalTipo(null);
    };

    const mostrarTooltip = (e, texto) => {
        const tooltipWidth = 150; // Ajusta el ancho del tooltip según sea necesario
        const { clientX, clientY } = e;

        setTooltip(texto);
        // Calcula la posición del tooltip
        if (clientX + tooltipWidth > window.innerWidth) {
            setTooltipPos({ left: clientX - tooltipWidth, top: clientY });
        } else {
            setTooltipPos({ left: clientX, top: clientY });
        }
    };

    const cerrarModalFondo = (e) => {
        if (e.target.className === 'modal') {
            cerrarModal();
        }
    };

    const copiarTexto = (texto) => {
        navigator.clipboard.writeText(texto)
            .then(() => {
                setError('Texto copiado al portapapeles.');
            })
            .catch(() => {
                setError('Error al copiar el texto.');
            });
    };

    // Configuración del carrusel
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="contenedor">
            <div className="imagenes-esquinas">
                <div
                    className="tooltip-container"
                    onMouseEnter={(e) => mostrarTooltip(e, 'Información del Cifrado César')}
                    onMouseLeave={() => setTooltip('')}
                    onClick={() => abrirModal('info')}
                >
                    <img
                        src="../imagenes/expediente.png"
                        alt="Información"
                        className="imagen-info"
                    />
                </div>

                <div
                    className="tooltip-container"
                    onMouseEnter={(e) => mostrarTooltip(e, 'Cómo usar')}
                    onMouseLeave={() => setTooltip('')}
                    onClick={() => abrirModal('ayuda')}
                >
                    <img
                        src="/imagenes/buscando.png"
                        alt="Cómo usar"
                        className="imagen-uso"
                    />
                </div>
            </div>
            <h2>Cifrado César</h2>
            <ManejoErrores error={error} setError={setError} />
            <div className="formulario">
                <div className="campo">
                    <label htmlFor="mensaje">Mensaje</label>
                    <div className="input-contenedor">
                        <input
                            id="mensaje"
                            className="mensaje"
                            type="text"
                            placeholder="Mensaje"
                            value={mensaje}
                            onChange={manejarCambioMensaje}
                        />
                        <button onClick={() => copiarTexto(mensaje)} className="boton-copiar">
                            <FontAwesomeIcon icon={faClipboard} />
                        </button>
                    </div>
                </div>
                <div className="campo">
                    <label htmlFor="numeroDesplazamiento">Desplazamiento</label>
                    <input
                        id="numeroDesplazamiento"
                        className="numeroDesplazamiento"
                        type="number"
                        placeholder="Desplazamiento"
                        value={desplazamiento}
                        onChange={manejarCambioDesplazamiento}
                        min="1"
                    />
                </div>
                <div className="campo">
                    <label htmlFor="mensajeCifrado">Mensaje Cifrado</label>
                    <div className="input-contenedor">
                        <input
                            id="mensajeCifrado"
                            className="mensajeCifrado"
                            type="text"
                            placeholder="Mensaje Cifrado"
                            value={mensajeCifrado}
                            onChange={manejarCambioMensajeCifrado}
                        />
                        <button onClick={() => copiarTexto(mensajeCifrado)} className="boton-copiar">
                            <FontAwesomeIcon icon={faClipboard} />
                        </button>
                    </div>
                </div>
            </div>

            {tooltip && (
                <span className="tooltip" style={{ left: tooltipPos.left, top: tooltipPos.top }}>
                    {tooltip}
                </span>
            )}

            {modalAbierto && (
                <div className="modal" onClick={cerrarModalFondo}>
                    <div className="contenido-modal">
                        <button onClick={cerrarModal} className="cerrar-modal">X</button>
                        {modalTipo === 'info' && (
                            <div>
                                <h3>Información del Cifrado César</h3>
                                <h4>Funcionamiento del Cifrado César</h4>
                                <p>
                                    <strong>Desplazamiento:</strong> Se elige un número entero que determina cuántas posiciones se moverán las letras.
                                    Este número se conoce como "desplazamiento" o "clave". Por ejemplo, si el desplazamiento es 3,
                                    la letra A se convertirá en D, B en E, C en F, y así sucesivamente.
                                </p>
                                <p>
                                    <strong>Alfabeto Circular:</strong> El cifrado se aplica de manera circular. Por ejemplo, si el desplazamiento lleva a
                                    la letra Z, vuelve a comenzar desde A. Así, con un desplazamiento de 3, Z se convierte en C.
                                </p>
                                <h4>Cifrado:</h4>
                                <p>
                                    Para cifrar un mensaje, cada letra se reemplaza por la letra que está el número de posiciones del desplazamiento hacia
                                    adelante en el alfabeto. Los caracteres que no son letras (números, espacios, signos de puntuación) se dejan sin cambios.
                                </p>
                                <p>
                                    <strong>Descifrado:</strong> Para recuperar el texto original, se aplica el desplazamiento en sentido contrario. Si el
                                    desplazamiento fue de 3, se resta 3 para obtener el texto original.
                                </p>
                                <h4>Ejemplo</h4>
                                <p>
                                    <strong>Texto Original:</strong> "HOLA" <br />
                                    <strong>Desplazamiento:</strong> 3
                                </p>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Letra</th>
                                            <th>Cifrado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>H</td>
                                            <td>K</td>
                                        </tr>
                                        <tr>
                                            <td>O</td>
                                            <td>R</td>
                                        </tr>
                                        <tr>
                                            <td>L</td>
                                            <td>O</td>
                                        </tr>
                                        <tr>
                                            <td>A</td>
                                            <td>D</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p>
                                    <strong>Texto Cifrado:</strong> "KROD"
                                </p>
                                <h4>Seguridad</h4>
                                <p>
                                    El cifrado César es muy fácil de romper, especialmente con herramientas modernas, ya que hay solo 25 posibles
                                    desplazamientos (en el caso del alfabeto inglés) y puede ser descifrado rápidamente con un ataque de fuerza bruta.
                                </p>
                                <h4>Uso Histórico</h4>
                                <p>
                                    Este método recibe su nombre de Julio César, quien lo utilizaba para comunicarse con sus generales. Aunque hoy en
                                    día no es seguro para proteger información sensible, es una excelente manera de introducir conceptos básicos de
                                    criptografía.
                                </p>
                            </div>
                        )}
                        {modalTipo === 'ayuda' && (
                            <div>
                                <h3>Ayuda</h3>
                                
                                    <div>
                                        <img src="/imagenes/Leel.png" alt="Ayuda 1" className="imagenayuda" />
                                    </div>
                                   
                                    
                               
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CifradoCesar;
