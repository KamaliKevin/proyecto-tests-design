import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RefreshLocation = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.location.reload();
    }, [pathname]);

    return null; // "RefreshLocation" es un componente de utilidad, por lo que no tiene que renderizar nada
};

export default RefreshLocation;