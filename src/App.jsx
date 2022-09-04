import { useState, useEffect } from 'react'

import Filtros from './components/Filtros'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'

import { generarId } from './helpers'

import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto') ?? 0))
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal,setModal] = useState(false)
  const [animarModal, SetAnimarModal] = useState(false)

  const gastosInicio = JSON.parse(localStorage.getItem('gastos')) ?? [] 
  const [gastos,setGastos] = useState(gastosInicio)

  const [gastoEditar,setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados,setGastosFiltrados] = useState([])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      handleNuevoGasto()
    }
  }, [gastoEditar])
  
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])
  
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto' ?? 0))

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos))
  }, [gastos])
  
  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])

  const handleNuevoGasto = () => {
    setModal(true)
    
    setTimeout(() => {
      SetAnimarModal(true)
    }, 500);
  }

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState) => 
        gastoState.id === gasto.id ? gasto : gastoState
      )

      setGastos(gastosActualizados)

    } else {
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos, gasto])
    }
 
    SetAnimarModal(false)

    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const gastoEliminar = (id) => {
    const gastosActualizados = gastos.filter((gastoActual) => gastoActual.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal? 'fijar' : ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos = {gastos}
      />

      {
        isValidPresupuesto &&
        (
          < >
            <main>
              <Filtros
                filtro={filtro}
                setFiltro={setFiltro}
              />

              <ListadoGastos
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                gastoEliminar={gastoEliminar}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />
              
            </main>

            <div className='nuevo-gasto'>
              <img
                src={IconoNuevoGasto}
                alt="icono-nuevo-gasto"
                onClick={handleNuevoGasto}
              />
            </div>
          </>
        )
      }

      {
        modal &&
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          SetAnimarModal={SetAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      }

    </div>

  )
}

export default App
