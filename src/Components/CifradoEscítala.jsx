import React, { useState } from 'react';
import ManejoErrores from './ManejoErrores'; // Componente para manejar y mostrar errores
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Asegúrate de instalar Font Awesome
import { faClipboard } from '@fortawesome/free-solid-svg-icons'; // Ícono de portapapeles
import Slider from "react-slick"; // Importa react-slick

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


function CifradoEscítala() {
    const [mensaje, setMensaje] = useState('');
    const [columnas, setColumnas] = useState(0);
    const [mensajeCifrado, setMensajeCifrado] = useState('');
    const [error, setError] = useState('');
    const [tooltip, setTooltip] = useState('');
    const [tooltipPos, setTooltipPos] = useState({ left: 0, top: 0 });
    const [modalInfoVisible, setModalInfoVisible] = useState(false);
    const [modalAyudaVisible, setModalAyudaVisible] = useState(false);

    const manejarCifrar = (texto, cols) => {
        if (!texto || cols <= 0) {
            setError('Por favor, ingrese un mensaje y el número correcto de columnas.');
            return '';
        }
        setError('');

        let cifrado = '';
        const mensajeLimpio = texto.replace(/\s+/g, '');

        for (let i = 0; i < cols; i++) {
            for (let j = i; j < mensajeLimpio.length; j += cols) {
                cifrado += mensajeLimpio[j];
            }
        }

        return cifrado;
    };

    const manejarDescifrar = (texto, cols) => {
        if (!texto || cols <= 0) {
            setError('Por favor, ingrese un mensaje cifrado y el número correcto de columnas.');
            return '';
        }
        setError('');

        let descifrado = new Array(texto.length).fill('');
        let posicion = 0;

        for (let i = 0; i < cols; i++) {
            for (let j = i; j < texto.length && posicion < texto.length; j += cols) {
                descifrado[j] = texto[posicion];
                posicion++;
            }
        }

        return descifrado.join('');
    };

    const manejarCambioMensaje = (e) => {
        const texto = e.target.value;
        setMensaje(texto);
        const cifrado = manejarCifrar(texto, columnas);
        setMensajeCifrado(cifrado);
    };

    const manejarCambioColumnas = (e) => {
        const valor = Number(e.target.value);
        setColumnas(valor);
        if (mensaje) {
            const cifrado = manejarCifrar(mensaje, valor);
            setMensajeCifrado(cifrado);
        } else {
            const descifrado = manejarDescifrar(mensajeCifrado, valor);
            setMensaje(descifrado);
        }
    };

    const manejarCambioMensajeCifrado = (e) => {
        const textoCifrado = e.target.value;
        setMensajeCifrado(textoCifrado);
        const descifrado = manejarDescifrar(textoCifrado, columnas);
        setMensaje(descifrado);
    };

    const mostrarTooltip = (e, texto) => {
        const { clientX, clientY } = e;
        setTooltip(texto);
        if (clientX + 150 > window.innerWidth) {
            setTooltipPos({ left: clientX - 150, top: clientY });
        } else {
            setTooltipPos({ left: clientX, top: clientY });
        }
    };

    const abrirModalInfo = () => {
        setModalInfoVisible(true);
    };

    const cerrarModalInfo = () => {
        setModalInfoVisible(false);
    };

    const abrirModalAyuda = () => {
        setModalAyudaVisible(true);
    };

    const cerrarModalAyuda = () => {
        setModalAyudaVisible(false);
    };

    // Función para cerrar modal haciendo clic en cualquier parte de la pantalla
    const cerrarModalFondo = (e) => {
        if (e.target.className === 'modal') {
            setModalInfoVisible(false);
            setModalAyudaVisible(false);
        }
    };

    const copiarTexto = (texto) => {
        if (texto) {
            navigator.clipboard.writeText(texto)
                .then(() => {
                    setError('Texto copiado al portapapeles.');
                })
                .catch(() => {
                    setError('Error al copiar el texto.');
                });
        } else {
            console.error('No hay texto para copiar.');
        }
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
                    onMouseEnter={(e) => mostrarTooltip(e, 'Información sobre el Cifrado Escítala')}
                    onMouseLeave={() => setTooltip('')}
                    onClick={abrirModalInfo}
                >
                    <img src="/imagenes/expediente.png" alt="Información" className="imagen-info" />
                </div>
                <div
                    className="tooltip-container"
                    onMouseEnter={(e) => mostrarTooltip(e, 'Cómo usar')}
                    onMouseLeave={() => setTooltip('')}
                    onClick={abrirModalAyuda}
                >
                    <img src="/imagenes/buscando.png" alt="Cómo usar" className="imagen-uso" />
                </div>
            </div>

            <h2>Cifrado Escítala</h2>
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
                        <button onClick={() => copiarTexto(mensaje || mensajeCifrado)} className="boton-copiar">
                            <FontAwesomeIcon icon={faClipboard} />
                        </button>
                    </div>
                </div>
                <div className="campo">
                    <label htmlFor="numeroColumnas">Número de Columnas</label>
                    <input
                        id="numeroColumnas"
                        className="numeroDesplazamiento"
                        type="number"
                        placeholder="Número de columnas"
                        value={columnas}
                        onChange={manejarCambioColumnas}
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
                        <button onClick={() => copiarTexto(mensaje || mensajeCifrado)} className="boton-copiar">
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

            {/* Modales */}
            {modalInfoVisible && (
                <div className="modal" onClick={cerrarModalFondo}>
                    <div className="contenido-modal">
                        <span className="cerrar-modal" onClick={cerrarModalInfo}>&times;</span>
                        <div>
                        <h3>Información del Cifrado Escítala</h3>
                            <h4>Funcionamiento del Cifrado Escítala</h4>
                            <p>
                                El Cifrado Escítala es un método de cifrado antiguo que utiliza una tira de papel enrollada en un cilindro para cifrar un mensaje. El mensaje se escribe en la tira, y cuando se desenrolla, el texto queda desordenado y se vuelve ilegible sin el cilindro adecuado.
                            </p>

                            <h4>Proceso de Cifrado</h4>
                            <ol>
                                <li>
                                    <strong>Concepto Básico:</strong>
                                    Se selecciona un cilindro de un tamaño específico (el diámetro determina el ancho de la tira).
                                </li>
                                <li>
                                    <strong>Escritura:</strong>
                                    La tira se enrolla alrededor del cilindro, y el mensaje se escribe a lo largo de la tira.
                                </li>
                                <li>
                                    <strong>Desenrollado:</strong>
                                    Al desenrollar la tira, las letras aparecen en una secuencia diferente, volviéndose ininteligibles.
                                </li>
                                <li>
                                    <strong>Cifrado:</strong>
                                    El emisor y el receptor deben tener cilindros del mismo tamaño para poder descifrar el mensaje.
                                </li>
                            </ol>

                            <h4>Proceso de Descifrado</h4>
                            <p>
                                Para recuperar el mensaje original, se vuelve a enrollar la tira en el cilindro. Al hacerlo, las letras se alinean en el orden correcto, revelando el mensaje original.
                            </p>

                            <h4>Ventajas y Desventajas</h4>
                            <h5>Ventajas:</h5>
                            <ul>
                                <li>Es un método simple y efectivo para cifrar mensajes en la antigüedad.</li>
                                <li>Permite una comunicación secreta sin necesidad de herramientas complicadas.</li>
                            </ul>

                            <h5>Desventajas:</h5>
                            <ul>
                                <li>Es susceptible a la interceptación, ya que una vez que se conoce el método, el cifrado puede ser descifrado fácilmente.</li>
                                <li>La longitud del mensaje debe ser un múltiplo de la longitud de la tira para que el cifrado funcione correctamente.</li>
                            </ul>

                            <h4>Uso Histórico</h4>
                            <p>
                                El Cifrado Escítala se utilizó en la antigua Grecia, especialmente por los soldados espartanos. Aunque hoy en día no se considera seguro para proteger información sensible, sigue siendo un interesante ejemplo de técnicas de cifrado en la historia.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {modalAyudaVisible && (
                <div className="modal" onClick={cerrarModalFondo}>
                    <div className="contenido-modal">
                        <span className="cerrar-modal" onClick={cerrarModalAyuda}>&times;</span>
                        <h2>Ayuda</h2>
                        
                            <div>
                                <img src="/imagenes/Leel.png" alt="Ayuda 1" className="imagenayuda"/>
                            </div>
                            
                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default CifradoEscítala;
