
import { useState, useEffect } from "react";

function MiApi () {
  // Estado que nos ayudará a hacer el filtro por nombre, donde query guarda el valor del input
  const [query, setQuery] = useState("")

  //3. info guardará los valores traídos desde la API
  const [info, setInfo] = useState([]);

  //2. Llamar  a la función que consume la API al momento de montar el componente
  useEffect(() => {
    consultarInformacion();
  }, []);

  //1. Función que consulta la API
  const consultarInformacion = async () => {
    const url = 'https://aves.ninjas.cl/api/birds';
    const response = await fetch(url)
    const data = await response.json()
    setInfo(data); // con setInfo actualizamos el estado

  }
  
  return(
    <section className="galeria">
      <div className="inputBusqueda">
        <h4>Busca tu ave favorita por su nombre:</h4>
        {/*en el evento onChange, con la función setQuery guardamos en query el valor que escriba el usuario en el input*/}
        <input type="text" name="busqueda" onChange={(e) => setQuery(e.target.value)} placeholder="Nombre"/>
      </div>
      <hr />
      <div className="divTarjetas">
        {/*4. Mostramos la info y hacemos el filtro para la búsqueda por nombre
        .includes determina si el arreglo incluye cierto valor, en este caso en el input*/} 
        {info.filter(user=>user.name.spanish.toLowerCase().includes(query))
        //Antes de que se desplieguen se ordeanrán por orden alfabético, con una función ternaria, 
        //donde comparamos los elementos del arreglo por nombre
        .sort((a,b) => a.name.spanish > b.name.spanish ? 1 : -1)
        // con el método map por cada elemento del arreglo, lo itero para que por cada elemento se retorne lo siguiente
        .map((ave) => (
          <div className="card" key={ave.sort}> 
            <p className="nombreAve">{ave.name.spanish}</p>
            <img src={ave.images.main} className="img" alt="Foto Pájaro" />
          </div>
        ))}
      </div>
    </section>
  )
};

export default MiApi;