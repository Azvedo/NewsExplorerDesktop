import { createClient } from 'contentful-management';

// Inicializando o cliente do Contentful
const client = createClient({
  accessToken: 'CFPAT-QukjRMcI1IBzzkGKL0dvaBAGE71KGNas20QmVoqUjLo',
});

const spaceId = 'gft2mzhd30x8';
const environmentId = 'master'; 

//Na api é necessário fazer o upload da imagem para o Contentful e depois criar a notícia
// Função para upload de imagem para o Contentful
async function uploadImage(filePath) {
  try {
    const space = await client.getSpace(spaceId);
    const environment = await space.getEnvironment(environmentId);

    // Cria um asset com o arquivo de imagem
    const asset = await environment.createAsset({
      fields: {
        title: {
          'en-US': 'Image Title', // Pode ajustar o título da imagem
        },
        file: {
          'en-US': {
            contentType: 'image/png', 
            fileName: 'image.png',
            upload: filePath, // A URL ou o caminho da imagem
          },
        },
      },
    });

    // Processa e publica o asset
    const processedAsset = await asset.processForAllLocales();
    const publishedAsset = await processedAsset.publish();

    return publishedAsset.sys.id; // Retorna o ID do asset
  } catch (error) {
    console.error('Erro ao fazer o upload da imagem:', error);
  }
}

export default uploadImage;