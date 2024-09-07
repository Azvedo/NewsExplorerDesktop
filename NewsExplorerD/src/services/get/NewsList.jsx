import { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import { CardNews } from '../../components/cardNews/CardNews';
import InfiniteScroll from 'react-infinite-scroll-component';
import './NewsList.css';

const style = {
  display: 'flex',
  color: 'White',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
};


const NewsList = () => {

  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {

    const client = createClient({
      space : "gft2mzhd30x8", 
      accessToken : "9RF2BRJwt6gio9R9xF7J0KqdPeJGMeHkm17VqnyXo24" 
    });

    const fetchNews = async () => {
      try {
        const entries = await client.getEntries({
          content_type: 'menuInterface',
          skip: (page - 1) * 10,
          limit: 10
        });

        setTimeout(() => {
          setNews(prevNews => [...prevNews, ...entries.items.filter(item => !prevNews.some(newsItem => newsItem.sys.id === item.sys.id))]);
          if (entries.items.length < 10) {
            setHasMore(false); // Se houver menos de 10 itens, não há mais para carregar
          }
        }, 1000);
      } catch (error) {
        console.error("Erro ao buscar notícias: ", error);
      }
    };

    fetchNews();
  }, [page, news]);

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