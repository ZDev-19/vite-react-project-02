import { useState , useEffect} from 'react'
import CerrarBoton from '../img/cerrar.svg'
import Mensaje from './Mensaje'


const Modal = ({ setModal, animarModal, SetAnimarModal, guardarGasto, gastoEditar , setGastoEditar}) => {

    const [mensaje,setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [id, setId] = useState('')
    const [fecha,setFecha] = useState('')

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [])


    const ocultarModal = () => {
        SetAnimarModal(false)
        
        setTimeout(() => {
            setModal(false) 
        }, 500);
        
        setGastoEditar({})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')        
            }, 1000);
            return
        }

        const objetoGasto = {
            nombre,
            cantidad,
            categoria,
            id,
            fecha
        }
        guardarGasto(objetoGasto)
        setGastoEditar({})
    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img
                    src={CerrarBoton}
                    alt="cerrar"
                    onClick={ocultarModal}
                />
            </div>

            <form
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
            >
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

                <div className='campo'>
                    <label htmlFor="nombre">Nombre del gasto</label>

                    <input
                        id='nombre'
                        type="text"
                        placeholder='Añade el nombre del gasto'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>

                    <input
                        id='cantidad'
                        type="number"
                        placeholder='Añade el coste del gasto: ej:100'
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor="categoria">Categoria</label>

                    <select
                        id="categoria"
                        value={categoria}
                        onChange={ e => setCategoria(e.target.value)}
                    >
                        <option value="">--Seleccione--</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>

                    <input
                        type="submit"
                        value={gastoEditar.nombre ? 'Editar Gasto' : 'Añadir Gasto'}
                    />

                    {mensaje &&
                        <Mensaje tipo="error" >{mensaje}</Mensaje>
                    }
                </div>
            </form>
        </div>
    )
}

export default Modal