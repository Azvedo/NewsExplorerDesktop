/* eslint-disable react/prop-types */
import { useState } from 'react';
import updateNewsPost from '../services/UpdateNews'; // Função para atualizar o post na API
import './Modal.css';

const EditModal = ({ item, toggleModal }) => {
   const [title, setTitle] = useState(item.title || '');
   const [image, setImage] = useState(item.image || '');
   const [summary, setSummary] = useState(item.summary || '');
   const [createdDate, setDate] = useState(item.createdDate || '');
   const [author, setAuthor] = useState(item.author || '');
   const [content, setContent] = useState('');

   // Função que chama a API para atualizar o post
   const updateNewsToAPI = async () => {
     const updatedData = {
        title,
        image,
        summary,
        createdDate,
        author,
        content
     };

     // Chama a função para atualizar a notícia
     await updateNewsPost(item.id, updatedData);

     // Limpa os campos após o envio
     setTitle('');
     setImage('');
     setSummary('');
     setDate('');
     setAuthor('');
     setContent('');

     // Fecha o modal
     toggleModal();
   };

   return (
     <div className="modal-overlay">
       <div className="modal-content">
         <h2>Editar Notícia</h2>
         
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
         <button onClick={updateNewsToAPI}>Atualizar</button>
       </div>
     </div>
   );
};

export default EditModal;
