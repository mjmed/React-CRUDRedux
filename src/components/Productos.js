import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { obtenerProductosAction } from '../actions/productosActions';
import Producto from './Producto';
import Spinner from './Spinner';


const Productos = () => {

    const dispatch = useDispatch();

    const productos = useSelector(state => state.productos.productos);
    const error = useSelector(state => state.productos.error);
    const cargando = useSelector(state => state.productos.loading);
    
    useEffect(() => {
        
        const cargarProductos = () => dispatch( obtenerProductosAction() );
        
        cargarProductos();

        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <h2 className="text-center my-5">Listado de Productos</h2>

            {
                (error)
                    ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p>
                    : null
            }

            {
                (cargando)
                    ? <Spinner />
                    : (
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead className="bg-primary table-dark">
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col" style={{ textAlign: 'center' }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (productos.length === 0) ? 'No hay productos' : (
                                            productos.map( producto => (
                                                <Producto
                                                    key={ producto.id }
                                                    producto={ producto }
                                                />
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
            }

        </Fragment>
    )
}

export default Productos;
