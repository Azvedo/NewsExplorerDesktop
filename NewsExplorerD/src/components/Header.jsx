import { useState } from "react";
import "./Header.css";

export function Header() {
  
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  
  
  return (
    <>
      <header className="header">
        <div >
          <img src="logoimage.png" alt="" />
        </div>
        <div className="write_mynews">
          <button className="write_mynews_button" onClick={toggleModal}>
            Escrever Notícia
          </button>
        </div>
      </header>

      {isModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Criar Notícia</h2>
            <input type="text" placeholder="Título da notícia" />
            <textarea placeholder="Conteúdo da notícia"></textarea>
            <button onClick={toggleModal}>Fechar</button>
            <button>Enviar</button>
          </div>
        </div>
      )};
    </>
  );
}