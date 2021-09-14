import Swal from 'sweetalert2';

import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
} from '../types';
import clienteAxios from '../config/axios';


// crear nuevos productos
export function crearNuevoProductoAction( producto ) {
    return async(dispatch) => {

        dispatch( agregarProducto() );

        try {

            await clienteAxios.post('/productos', producto);

            dispatch( agregarProductoExito(producto) );

            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            );

        } catch (error) {
            console.log(error);

            dispatch( agregarProductoError(true) );

            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            });
        }
    }
}

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO
});

const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});


// descarga los productos de la base de datos
export function obtenerProductosAction() {
    return async (dispatch) => {

        dispatch( descargarProductos() );

        try {

            const respuesta = await clienteAxios.get('/productos');
            
            dispatch( descargaProductosExitosa(respuesta.data) );

        } catch (error) {

            console.log(error);
            dispatch( descargaProductosError() );
        }
    }
};

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});


// selecciona y elimina el producto
export function borrarProductoAction(id) {
    return async (dispatch) => {

        dispatch( obtenerProductoEliminar(id) );

        try {
            
            await clienteAxios.delete(`/productos/${ id }`);
            
            dispatch( eliminarProductoExito() );

            Swal.fire(
                'Eliminado',
                'El producto se eliminó correctamente',
                'success'
            );

        } catch (error) {

            console.log(error);
            dispatch( eliminarProductoError() );
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type:PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type:PRODUCTO_ELIMINADO_ERROR,
    payload: true
});