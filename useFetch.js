import { useState, useEffect, useRef } from 'react';

export const useFetch = (url) => {
	const isMounted = useRef(true);
	// hook del estado de la peticion
	const [state, setState] = useState({
		data: null,
		loading: true,
		error: null,
	});

	//creamos el efect para usarlo en el state de la peticion
	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		//le ponemos esto para que ponga el loading

		setState({ data: null, loading: true, error: null });

		fetch(url)
			.then((resp) => resp.json())
			.then((data) => {
				if (isMounted.current) {
					setState({
						loading: false,
						error: null,
						data,
					});
				} else {
					console.log('Set state no se llamo');
				}
			});
	}, [url]); // se ejecuta cuando el url cambia

	return state; //retornamos solamente el state
};
