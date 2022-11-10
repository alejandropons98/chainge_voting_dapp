import { Navigate, useNavigate } from "react-router-dom";
import "./InfoPage.css";
import block from "./bloc2.gif";
import logo from "./logo.svg";

function infoPage() {
  const navegar = useNavigate();

  return (
    <div className="principal_container">
      <div className="titulo">
        <img className="logo" src={logo} alt="" />
      </div>
      <div className="first_container">
        <div className="container_left1">
          <div className="text_container1">
            <h1>BlockChain</h1>
            <p>
              Blockchain es un sistema de registro de datos, público,
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
            <h1>Apueba de Fraudes</h1>
            <p>
              La transparencia e inalterabilidad del BlockChain nos permite
              asegurar unas elecciones seguiras, anonimas y transparnetes. Al
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
              Chainge viene para cambiar la manera de hacer las elecciones
              .Nuestras elecciones seran mas seguras, remotas y confiables.
            </h1>
          </div>
        </div>
      </div>
      <div className="registercontainer">
        <button
          className="btnregister"
          onClick={console.log("aqui voy a otra pag")}
        >
          <h1 className="h1register">
            Registrate aqui para ser parte de Chainge
          </h1>
        </button>
      </div>
    </div>
  );
}

export default infoPage;
