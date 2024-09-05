import PropTypes from 'prop-types';
import './CardNews.css';

export function CardNews({itemKey, title, description, img_url, author, date}) {
    return (
        <div className="card" key={itemKey}>
            <div className="card_title">
                <h2>{title}</h2>
            </div>
            <div className="card_img">
                <img src={img_url} alt="Imagem da notícia" />
            </div>
            <div className="card_info">
                <p>{description}</p>
                <p>by: {author}</p>
                <p>{date}</p>
            </div>
        </div>
    )
}

CardNews.propTypes = {
    itemKey: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    img_url: PropTypes.string,
    author: PropTypes.string,
    date: PropTypes.string
    
};