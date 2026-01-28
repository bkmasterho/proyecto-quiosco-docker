import { createContext, useEffect, useState } from "react"
import clienteAxios from "../config/axios";

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({})  
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState([])
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0];
        setCategoriaActual(categoria)
    } 

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProducto = productoNuevo => {
         setProducto(prevProductos => [
            ...prevProductos,
            productoNuevo
        ]);
    }

    const obtenerCategorias = async () => {

        
        try {
            
            const { data } = await clienteAxios('/api/categorias');
            console.log("la dataaa", data)
            setCategorias(data.data);
            setCategoriaActual(data.data[0])
        } catch (error) {   
            console.log(error);
        }

    }

    const handleSubmitNuevaOrden = async (totalAPI) => {

        const token = localStorage.getItem('AUTH_TOKEN');
        console.log("Totaaal", totalAPI);

        try {
            await clienteAxios.post('/api/pedidos',
            {
                totalAPI,
                productos: producto.map((prod, cant) => {
                    return {
                        id:prod.id,
                        cantidad:cant + 1
                    }
                })

            },
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            })
        } catch (error) {
            console.log(error)
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
                handleSetProducto,
                pedido,
                total,
                setTotal,
                handleSubmitNuevaOrden
            }}
        >{children}</QuioscoContext.Provider>
    )

}

export {
    QuioscoProvider
}

export default QuioscoContext