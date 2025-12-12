import { createContext, useEffect, useState } from "react"
import axios from 'axios';

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({})  
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0];
        setCategoriaActual(categoria)
    } 

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProducto = producto => {
        setProducto(producto);
    }

    const obtenerCategorias = async () => {

        
        try {
            
            console.log("VITE_API: ", import.meta.env.VITE_API_URL);
            const {data} = await axios('http://localhost/api/categorias');
            console.log("la dataaa", data)
            setCategorias(data.data);
            setCategoriaActual(data.data[0])
        } catch (error) {   
            console.log(error);
        }

    }

    useEffect(() => {
        obtenerCategorias();
    },[])

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto
            }}
        >{children}</QuioscoContext.Provider>
    )

}

export {
    QuioscoProvider
}

export default QuioscoContext