import useQuiosco from "../hooks/useQuiosco"

export default function Resumen() {

  const { handleSubmitNuevaOrden, total, setTotal } = useQuiosco();

  const handleSubmit = () => {
    const nuevoTotal = 99;
    setTotal(nuevoTotal);
    
    handleSubmitNuevaOrden(nuevoTotal);
  };

  return (
    <div className="w-72">
         <button
                type="button"
                className="text-center bg-red-500 w-full p-3 font-bold text-white
                truncate"
                onClick={handleSubmit}
            >
                Pedido Prueba
            </button>
    </div>
  )
}
