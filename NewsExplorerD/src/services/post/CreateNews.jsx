import { createClient } from 'contentful-management';
import uploadImage from './UploadImage';

// Inicializando o cliente do Contentful
const client = createClient({
  accessToken: 'CFPAT-QukjRMcI1IBzzkGKL0dvaBAGE71KGNas20QmVoqUjLo',
});

const spaceId = 'gft2mzhd30x8';
const environmentId = 'master'; 


// Função para criar um novo post
async function createNewsPost(newsData) {
  const imageId = await uploadImage(newsData.image); // Faz o upload da imagem e pega o ID
  if (!imageId) {
    alert('Erro ao fazer o upload da imagem. Verifique o (URL ou caminho) e tente novamente');
    return;
  }
  try {
    const space = await client.getSpace(spaceId);
    const environment = await space.getEnvironment(environmentId);

    // A função createEntry cria uma nova entrada no Contentful através de uma requisição POST
    const newEntry = await environment.createEntry('menuInterface', {
      fields: {
        title: {
          'en-US': newsData.title,
        },
        image: {
          'en-US': {
            sys: {
              type: 'Link',
              linkType: 'Asset',
              id: imageId,
            },
          },
        },
        summary: {
          'en-US': newsData.content,
        },
        createdDate:{
          'en-US': newsData.createdDate,
        },
        author:{
          'en-US': newsData.author,
        },
        content:{
          'en-US': newsData.content,
        },
      },
    });

    // Publica a entrada criada
    await newEntry.publish();
    alert('Notícia criada com sucesso');
    console.log('Notícia criada com sucesso:', newEntry);
  } catch (error) {
    alert('Erro ao criar a notícia. Tente novamente');
    console.error('Erro ao criar a notícia:', error);
  }
}

export default createNewsPost;
