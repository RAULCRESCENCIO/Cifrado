import React, { useEffect } from 'react';

function ManejoErrores({ error, setError }) {
    // Al montar el componente, agregamos un detector de clics para cerrar el mensaje
    useEffect(() => {
        if (error) {
            const cerrarMensaje = (e) => {
                // Para evitar que se cierre si clicamos directamente sobre el mensaje de error
                if (!e.target.closest('.mensaje-error2')) {
                    setError(''); // Limpiamos el mensaje de error cuando el usuario hace clic fuera del mensaje
                }
            };

            // Agregamos el listener al hacer clic en cualquier parte
            window.addEventListener('click', cerrarMensaje);

            // Limpiar el listener cuando el componente se desmonte o el error cambie
            return () => {
                window.removeEventListener('click', cerrarMensaje);
            };
        }
    }, [error, setError]);

    // Si hay un error, se muestra el mensaje de error; si no, no se muestra nada
    return error ? <div className="mensaje-error2">{error}</div> : null;
}

export default ManejoErrores;

