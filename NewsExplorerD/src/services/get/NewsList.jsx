import { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import { CardNews } from '../../components/cardNews/CardNews';
import InfiniteScroll from 'react-infinite-scroll-component';
import './NewsList.css';

//Estilo utilizado no InfiniteScroll
const style = {
  display: 'flex',
  color: 'White',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
};


const NewsList = () => {
  
  const [news, setNews] = useState([]); // Array de notícias
  const [page, setPage] = useState(1); // Página atual
  const [hasMore, setHasMore] = useState(true); // Se há mais notícias para carregar

  useEffect(() => {
    const client = createClient({
      space : "gft2mzhd30x8", 
      accessToken : "9RF2BRJwt6gio9R9xF7J0KqdPeJGMeHkm17VqnyXo24" 
    });

    const fetchNews = async () => {
      try {
          const entries = await client.getEntries({
            content_type: 'menuInterface', //tipo do conteúdo (necessário para buscar as notícias na contentful api)
            limit: page * 10 // Limite de itens por página
          });
          setTimeout(() => {
            setNews(entries.items); // Adiciona as notícias ao array
            if (entries.items.length < (page * 10)) {
              setHasMore(false); // Se houver menos de 10 itens, não há mais para carregar
            }
          }, 1000);
      } catch (error) {
        console.error("Erro ao buscar notícias: ", error);
      }
    };
    fetchNews();
  }, [news , page]); // Executa o useEffect toda vez que a página ou o array de notícias mudar


  return (
    <div className='main'>
      <h1>Notícias</h1>
      <InfiniteScroll 
        dataLength={news.length} 
        next={() => setPage(prevPage => prevPage + 1)} 
        hasMore={hasMore} 
        loader={<h4 style={style}>Carregando...</h4>}
        endMessage={<h4 style={style}>Fim das notícias</h4>}
      >
        <div className='news'>
          {news.map((item) => (
              <CardNews key={item.sys.id} itemKey={item.sys.id} title={item.fields.title} img_url={item.fields.image.fields.file.url} description={item.fields.summary} author={item.fields.author} date={item.fields.createdDate}/>
            ))}
        </div>
      </InfiniteScroll>  
    </div>
  );
};

export default NewsList;