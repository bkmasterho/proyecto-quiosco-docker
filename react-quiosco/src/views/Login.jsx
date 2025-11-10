import { Link } from "react-router-dom"

export default function Login() {
  return (
      <>
          <h1 className="text-4xl font-black"> Inicia Sesion </h1>
          <p>Inicia sesion</p>

          <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
            <form>

                <div className="mb-4">
                  <label
                    className="text-slate-800"
                    htmlFor="email"
                  >Email:</label>
                  <input 
                      type="email"
                      id="email"
                      className="mt-2 w-full p-3 bg-gray-50"
                      name="email"
                      placeholder="Tu email"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="text-slate-800"
                    htmlFor="password"
                  >Password:</label>
                  <input 
                      type="password"
                      id="password"
                      className="mt-2 w-full p-3 bg-gray-50"
                      name="password"
                      placeholder="Tu Password"
                  />
                </div>

                  <input 
                    type="submit" 
                    value="Inicia Sesion"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full
                    mt-5 p-3 uppercase font-bold cursor-pointer"
                  />

            </form>
          </div>

          <nav className="mt-5">
              <Link to="/auth/registro">
                  ¿No tienes una cuenta? Crea una
              </Link>
          </nav>

      </>

  )
}
