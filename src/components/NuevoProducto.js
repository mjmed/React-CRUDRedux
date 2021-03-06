import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { crearNuevoProductoAction } from '../actions/productosActions';
import { mostrarAlertaAction, ocultarAlertaAction } from '../actions/alertaActions';
import Spinner from './Spinner';


const NuevoProducto = ({ history }) => {
    
    // state de componente
    const [ nombre, guardarNombre ] = useState('');
    const [ precio, guardarPrecio ] = useState('');

    const dispatch = useDispatch();

    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);

    const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto) );

    const handleSubmit = e => {

        e.preventDefault();

        if ( nombre.trim() === '' || precio <= 0 || precio === '' ) {
            
            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch( mostrarAlertaAction( alerta ) );

            return;
        }

        dispatch( ocultarAlertaAction() );

        agregarProducto({
            nombre,
            precio
        });

        history.push('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        {
                            (alerta)
                                ? <p className={ alerta.classes }>{ alerta.msg }</p>
                                : null
                        }

                        <form onSubmit={ handleSubmit }>
                            <div className="form-group">
                                <label>Nombre producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre producto"
                                    name="nombre"
                                    value={ nombre }
                                    onChange={ e => guardarNombre(e.target.value) }
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio producto"
                                    name="precio"
                                    value={ precio }
                                    onChange={ e => guardarPrecio( Number(e.target.value) ) }
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Agregar
                            </button>
                        </form>

                        { (cargando) ? <Spinner /> : null }
                        { (error) ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NuevoProducto;
