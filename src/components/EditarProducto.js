import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { editarProductoAction } from '../actions/productosActions';
import Spinner from './Spinner';


const EditarProducto = () => {

    const [ producto, guardarProducto ] = useState({
        nombre: '',
        precio: ''
    });
    const { nombre, precio } = producto;

    const dispatch = useDispatch();
    const history = useHistory();

    const productoEditar = useSelector(state => state.productos.productoEditar);
    const cargando = useSelector(state => state.productos.loading);
    
    useEffect(() => {
        
        guardarProducto(productoEditar);
        
    }, [ productoEditar ]);

    const handleInputChange = ({ target }) => {

        guardarProducto({
            ...producto,
            [target.name]: target.value
        });
    }
    
    const handleSubmit = e => {
        
        e.preventDefault();

        dispatch( editarProductoAction(producto) );

        history.push('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>

                        <form onSubmit={ handleSubmit }>
                            <div className="form-group">
                                <label>Nombre producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre producto"
                                    name="nombre"
                                    value={ nombre}
                                    onChange={ handleInputChange }
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
                                    onChange={ handleInputChange }
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Guardar cambios
                            </button>
                        </form>

                        { (cargando) ? <Spinner /> : null }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarProducto;
