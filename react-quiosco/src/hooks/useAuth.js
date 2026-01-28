import { useEffect } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/axios';

export const useAuth = ({middleware, url}) => {

    console.log("Inicio Ejecutando el UseAuth !!!");
    const navigate = useNavigate();

    //Guardo lo que venga de data en user EJ: users=result.data

    const { data: user, error, mutate } = useSWR('/api/user', () => {

        //Valido mi token para evitar rendersInicesarrios

        const token = localStorage.getItem('AUTH_TOKEN');
        if (!token) return null;

        return clienteAxios('api/user', {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    },
    {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        shouldRetryOnError: false
    }
    )


    const login = async (datos, setErrores) => {

        try {
            await clienteAxios.get('/sanctum/csrf-cookie');
            const {data} = await clienteAxios.post('/api/login', datos);
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            await mutate(); //Forza la revalidacion de los datos sin tener que esperar.
        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
        }

    }

    const registro = async (datos, setErrores) => {

        try {

            await clienteAxios.get('/sanctum/csrf-cookie');
            const {data} = await clienteAxios.post('/api/registro', datos);
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            await mutate();

        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
        }

    }

    const logout = async () => {

        
        try {
            const token = localStorage.getItem('AUTH_TOKEN');

            await clienteAxios.post('/api/logout', null , {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }) 
            localStorage.removeItem('AUTH_TOKEN');
            await mutate(undefined); //Forzo el llamado a SWR
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }

        console.log('click logout 22')
    }    
    
    console.log("EL USEEEER",user);
    console.log("EL ERRORRR",error);

    useEffect(() => {

        if (middleware === 'guest' && user) {
            navigate(url, { replace: true });
        }

        if (middleware === 'auth' && user === null) {
            navigate('/auth/login', { replace: true });
        }

    }, [user]);

    console.log(middleware);

    return {
        login, 
        registro,
        logout,
        user,
        error
    }

}