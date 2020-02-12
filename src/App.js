import React, { Fragment, useState, useEffect, Component } from 'react';
import './index.css';
import Header from './Components/Header';
import Formulario from './Components/Formulario';
import Clima from './Components/Clima';
import Error from './Components/Error';

function App() {
	//state
	const [ busqueda, guadarBusqueda ] = useState({
		ciudad: '',
		pais: ''
	});
	const [ consultar, guardarConsultar ] = useState(false);
	const [ resultado, guardarResultado ] = useState({});
	const [ error, guardarError ] = useState(false);

	//Extraer dato
	const { ciudad, pais } = busqueda;

	useEffect(
		() => {
			const consultarApi = async () => {
				const appId = '796b26bd3bbbdae39b2950e2f8a1d566';
				const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

				const respuesta = await fetch(url);
				const resultado = await respuesta.json();

				guardarResultado(resultado);
				guardarConsultar(false);

				//Detecta si hubo un error
				if (resultado.cod === '404') {
					guardarError(true);
				} else {
					guardarError(false);
				}
			};

			if (consultar) {
				consultarApi();
			}
		},
		[ consultar ]
	);

	let componente;

	if (error) {
		componente = <Error mensaje="No hay resultados" />;
	} else {
		componente = <Clima resultado={resultado} />;
	}

	return (
		<Fragment>
			<Header titulo="Clima App" />

			<div className="contenedor-form">
				<div className="container">
					<div className="row">
						<div className="col m6  s12">
							<Formulario
								busqueda={busqueda}
								guadarBusqueda={guadarBusqueda}
								guardarConsultar={guardarConsultar}
							/>
						</div>
						<div className="col m6  s12">{componente}</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;
