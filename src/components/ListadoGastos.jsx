import React from 'react'
import Gasto from './Gasto'


const ListadoGastos = ({ gastos, setGastoEditar, gastoEliminar, filtro, gastosFiltrados }) => {
    return (
        <div className='listado-gastos contenedor'>
            {
                filtro ? (
                    <>
                        <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay gastos'}</h2>
                        {
                            gastosFiltrados.map(gasto => (
                                <Gasto
                                    key={gasto.id}
                                    gasto={gasto}
                                    setGastoEditar={setGastoEditar}
                                    gastoEliminar={gastoEliminar}
                                />
                            ))
                        }
                    </>
                ) : (
                    <>
                        <h2>{gastos.length ? 'Gastos' : 'No hay gastos'}</h2>
                        {
                            gastos.map((gasto) => (
                                <Gasto
                                    key={gasto.id}
                                    gasto={gasto}
                                    setGastoEditar={setGastoEditar}
                                    gastoEliminar={gastoEliminar}
                                />
                            ))
                        }
                    </>
                )
            }
        </div>
    )
}

export default ListadoGastos