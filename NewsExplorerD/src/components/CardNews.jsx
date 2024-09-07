/* eslint-disable react/prop-types */
import { useState } from "react";
import './CardNews.css';
import deleteNewsPost from '../services/DeleteNews';
import EditModal from "./EditModal";


export function CardNews({itemKey ,title, description, img_url, author, date}) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const item = {
        id : itemKey,
        currentTitle : title,
        currentImage : img_url,
        currentSummary : description ,
        currentCreatedDate : date,
        currentAuthor : author  
      };

    const toggleModal = () => {
      setIsModalVisible(!isModalVisible);
    };

    return (
        <div className="card" >
            <div className="card_header">
                <div className="card_title">
                    <h2>{title}</h2>
                </div>
                <input type="checkbox" id={`options-active-${itemKey}`} />
                <label htmlFor={`options-active-${itemKey}`} className='open_card_options' >
                    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 24 24" width="32px" fill="#e8eaed"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0-.55.45-1 1-1h16c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1z"/></svg>
                </label>
                <div className='card_options'>
                    <div id='position-options'>
                        <button onClick={toggleModal} >Editar</button>
                        <button onClick={() => deleteNewsPost(itemKey)} >Deletar</button>
                    </div>
                </div>
            </div>
            <div className="card_img">
                {img_url && <img src={img_url} alt="Imagem da notícia" />}
            </div>
            <div className="card_info">
                <p>{description}</p>
                <p>by: {author}</p>
                <p>{date}</p>
            </div>

            {isModalVisible && (
                <EditModal item={item} toggleModal={toggleModal} />
            )}
        </div>
    )
}

