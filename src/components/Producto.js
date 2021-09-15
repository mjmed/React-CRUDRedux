import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { borrarProductoAction, obtenerProductoEditar } from '../actions/productosActions';


const Producto = ({ producto }) => {

    const { nombre, precio, id } = producto;

    const dispatch = useDispatch();
    const history = useHistory();

    const confirmarEliminarProducto = id => {

        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto que se elimina no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#78c2ad',
            cancelButtonColor: '#f3969a',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                dispatch( borrarProductoAction(id) );
            }
        });
    }

    // función que redirige de forma programada
    const redireccionarEdicion = producto => {
        
        dispatch( obtenerProductoEditar(producto) );
        history.push(`/productos/editar/${ producto.id }`);
    }
    

    return (
        <tr>
            <td>{ nombre }</td>
            <td><span className="font-weight-bold">$ { precio }</span></td>
            <td className="acciones">
                <button
                    type="button"
                    className="btn btn-primary mr-2"
                    onClick={ () => redireccionarEdicion(producto) }
                >
                    Editar
                </button>

                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={ () => confirmarEliminarProducto(id) }
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}

export default Producto;