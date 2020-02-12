import React, { useState } from 'react';
import Error from './Error';

const Formulario = ({ busqueda, guadarBusqueda, guardarConsultar }) => {
	const [ error, guardarError ] = useState(false);

	//Extraer datos
	const { ciudad, pais } = busqueda;

	//Guardar datos en el state
	const handleChange = (e) => {
		guadarBusqueda({
			...busqueda,
			[e.target.name]: e.target.value
		});
	};

	//Cuando el usuario manda el forumario
	const handleSubmit = (e) => {
		e.preventDefault();

		//Validar
		if (ciudad.trim() === '' || ciudad.trim() === '') {
			guardarError(true);
			return;
		}
		guardarError(false);

		//Pasarlo al componente principal
		guardarConsultar(true);
	};

	return (
		<form onSubmit={handleSubmit}>
			{error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
			<div className="input-field col s12">
				<input type="text" name="ciudad" id="ciudad" value={ciudad} onChange={handleChange} />
				<label htmlFor="ciudad">Ciudad: </label>
			</div>
			<div className="input-field col s12" onChange={handleChange}>
				<select name="pais" id="pais" value={pais}>
					<option value="">-- Seleccione un país --</option>
					<option value="US">Estados Unidos</option>
					<option value="MX">México</option>
					<option value="AR">Argentina</option>
					<option value="CO">Colombia</option>
					<option value="CR">Costa Rica</option>
					<option value="ES">España</option>
					<option value="PE">Perú</option>
				</select>
				<label htmlFor="pais">País: </label>
			</div>

			<div className="input-field col s12">
				<input
					type="submit"
					value="Buscar clima"
					className="waves-effect waves-ligt btn-large btn-block yellow accent-4"
				/>
			</div>
		</form>
	);
};

export default Formulario;
