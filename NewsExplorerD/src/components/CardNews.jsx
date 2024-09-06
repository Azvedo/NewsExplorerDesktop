/* eslint-disable react/prop-types */
import './CardNews.css';
import deleteNewsPost from '../services/DeleteNews';



export function CardNews({itemKey ,title, description, img_url, author, date}) {
    return (
        <div className="card">
            <div className="teste">
                <div className="card_title">
                    <h2>{title}</h2>
                </div>
                <button onClick={() => deleteNewsPost(itemKey)}> teste </button>
            </div>
            <div className="card_img">
                {img_url && <img src={img_url} alt="Imagem da notícia" />}
            </div>
            <div className="card_info">
                <p>{description}</p>
                <p>by: {author}</p>
                <p>{date}</p>
            </div>
        </div>
    )
}

