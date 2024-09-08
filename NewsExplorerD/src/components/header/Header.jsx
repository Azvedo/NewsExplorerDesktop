import { useState } from "react";
import "./Header.css";
import Modal from "../modals/Modal";

export function Header() {
  
  const [isModalVisible, setIsModalVisible] = useState(false);
 
  // Função para abrir e fechar o modal(criar notícia)
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible); //muda o estado do modal
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
        <Modal toggleModal={toggleModal} />
      )}
    </>
  );
}