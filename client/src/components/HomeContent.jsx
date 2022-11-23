import block from "../assets/bloc2.gif";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { getData } from "./gedtData";

const HomeContent = () => {
  return (
    <div className="principal_container">
      <div className="titulo">
        <img className="logo" src={logo} alt="" />
      </div>
      <div className="first_container">
        <div className="container_left1">
          <div className="text_container1">
            <h1>Blockchain</h1>
            <p>
              Una blockchain es un sistema de registro de datos, público,
              compartido, transparente e inalterable en el que a medida que se
              añade nueva información, se establece como un «bloque» de datos.
              <br />
              Al votar, cada bloque se une con el anterior generando asi la
              posibilidad de rastrear el voto
            </p>
          </div>
        </div>
        <div className="image_container1">
          <img className="firstimagen" src={block} alt="voting imagen" />
        </div>
      </div>
      <div className="second_container">
        <div className="container_right2">
          <div className="text_container2">
            <h1>A prueba de fraudes</h1>
            <p>
              La transparencia e inalterabilidad de la blockchain nos permite
              asegurar unas elecciones seguras, anonimas y transparnetes. Al
              participar, los votantes tienen una copia de cada vez que se
              actualizan los bloques, esto nos ayuda en el momento que existe
              una incosistencia, los votantes corroborar si la informacion del
              bloque afectado es verdadera, al no serlo el bloque se actualiza
              con la informacion dada por las copias de todos los votantes
            </p>
          </div>
        </div>
      </div>
      <div className="third_container">
        <div className="image_container3">
          <img
            className="imagen3"
            src="https://www.ubisecure.com/wp-content/uploads/2019/12/General-Election-piece.png"
            alt="online voting"
          />
        </div>
        <div className="container_left3">
          <div className="text_container3">
            <h1>
              Chainge viene para cambiar la manera de hacer las elecciones.
              Nuestras elecciones seran mas seguras, remotas y confiables.
            </h1>
          </div>
        </div>
      </div>
      <div className="registercontainer">
        <Link to="/login">
          <button className="boton-login">
            <h1 className="h1register">Ingresa aqui</h1>
          </button>
        </Link>
      </div>
    </div>
  );
};

export { HomeContent };