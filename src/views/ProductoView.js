import {useState, useEffect, useContext} from 'react'
import { CarritoContext } from '../context/carritoContext'
import {useParams} from "react-router-dom"
import { obtenerProductosPorId } from '../services/productoService'
import Loading from '../components/Loading'
import Swal from "sweetalert2"
import { useHistory } from 'react-router'

export default function ProductoView(props) {
    console.log(props)
    const [producto, setProducto] = useState({})
    const [cargando, setCargando] = useState(true)

    const { id } = useParams()

    const history = useHistory()

    const {anadirACarrito} = useContext(CarritoContext)

    const getProducto = async () => {
        try {
            let productoObtenido = await obtenerProductosPorId(id)
            setProducto(productoObtenido)
            setCargando(false)
        } catch (error) {
            console.error(error)
        }
    }

    const anadirCarritoContext = async() => {
        anadirACarrito(producto)
        const resultado = await Swal.fire({
            icon: 'success',
            title:"Producto añadido!",
            showConfirmButton: true,
            showDenyButton:true,
            confirmButtonText:'Seguir comprando',
            denyButtonText:'Ir a carrito'
        })
        if(resultado.isConfirmed){
            history.push('/')
        }else if (resultado.isDenied){
            history.push('/carrito')
        }
    }

    useEffect(() => {
        getProducto()
    }, [])

    return (
        <div>
           {cargando ? 
           (<Loading />) : 
           (<div className="container">
               <h2 className="fw-bold">{producto.prod_nombre}</h2>
               <div className="row">
                   <div className="col-sm-12 col-md-6">
                       <img 
                        className="img-fluid"
                        src={producto.prod_imagen}
                        alt={producto.prod_nombre} />
                   </div>
                   <div className="col-sm-12 col-md-6">
                       <h5 className="fw-bold">Decripción</h5>
                       <p>{producto.prod_descripcion}</p>
                       <div className="py-3 d-flex justify-content-between">
                           <span className="fw-bold">
                               S/. {producto.prod_precio}
                           </span>

                           <button className="btn btn-dark btn-lg"
                           onClick={anadirCarritoContext}>
                               <i className="fas fa-shopping-cart me-2"/>
                               Añadir a carrito</button>
                       </div>
                   </div>
               </div>

           </div>)}
        </div>
    )
}
