import axios from "axios"

const URL = `${process.env.REACT_APP_API}/productos`

const obtenerProductos = async(busqueda = "") => {
    try {
        let {data} = await axios.get(`${URL}?search=${busqueda}`)
        return data
    }catch (error){
        throw error

    }

}

const obtenerProductosPorId = async(id) => {
    try {
        let {data} = await axios.get(`${URL}/${id}`)
        return data
    }catch (error){
        throw error
    }

}

export{
    obtenerProductosPorId,
    obtenerProductos
}