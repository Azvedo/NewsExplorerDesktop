/* eslint-disable react/prop-types */
import { useState } from 'react';
import createNewsPost from '../services/CreateNews'; // Importa a função que lida com a API

const Modal = ({ toggleModal }) => {
   const [title, setTitle] = useState('');
   const [image, setImage] = useState('');
   const [summary, setSummary] = useState('');
   const [createdDate, setDate] = useState('');
   const [author, setAuthor] = useState('');
   const [content, setContent] = useState('');

  const sendNewsToAPI = async () => {
    const newsData = {
        title,
        image,
        summary,
        createdDate,
        author,
        content
      };
      // Chama a função para criar a notícia
      await createNewsPost(newsData);
      // Limpa os campos após o envio
      setTitle('');
      setImage('');
      setSummary('');
      setDate('');
      setAuthor('');
      setContent('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Criar Notícia</h2>
        <input
          type="text"
          placeholder="Título da notícia"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="URL da Imagem"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <textarea
          placeholder="Digite o resumo da notícia"
          maxLength={266}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <input
          type="date"
          placeholder="Data de criação"
          value={createdDate}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Autor da notícia"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <textarea
          placeholder="Digite o conteúdo da notícia"
          maxLength={10000}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={toggleModal}>Fechar</button>
        <button onClick={sendNewsToAPI}>Enviar</button>
      </div>
    </div>
  );
};

export default Modal;
