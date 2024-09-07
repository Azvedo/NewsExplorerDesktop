import { createClient } from 'contentful-management';
import uploadImage from './UploadImage';

// Inicializando o cliente do Contentful
const client = createClient({
  accessToken: 'CFPAT-QukjRMcI1IBzzkGKL0dvaBAGE71KGNas20QmVoqUjLo',
});

const spaceId = 'gft2mzhd30x8';
const environmentId = 'master'; 


async function updateNewsPost(id, updatedData) {
// Update entry
    try {
        const space = await client.getSpace(spaceId);

        const environment = await space.getEnvironment(environmentId);
        const entry = await environment.getEntry(id);
        
        if(updatedData.title){
          entry.fields.title['en-US'] = updatedData.title;
        }

        if(updatedData.image){
          //Para atualizar a imagem é necessário fazer o upload da nova imagem e atualizar o link da imagem na notícia
          const imageId = await uploadImage(updatedData.image);
          entry.fields.image['en-US'] = {
              sys: {
                type: 'Link',
                linkType: 'Asset',
                id: imageId, // ID do novo asset de imagem
              },
          };
        }
        if(updatedData.summary){
          entry.fields.summary['en-US'] = updatedData.summary;
        }
        if(updatedData.createdDate){
          entry.fields.createdDate['en-US'] = updatedData.createdDate;
        }
        if(updatedData.author){
          entry.fields.author['en-US'] = updatedData.author;
        }
        if(updatedData.content){
          entry.fields.content['en-US'] = updatedData.content;
        }
        
        const updatedEntry = await entry.update();
        updatedEntry.publish()

        console.log(`Notícia ${entry.sys.id} atualizada.`)
    } catch (error) {
        console.error('Erro ao atualizar a notícia:', error);
    }

}

export default updateNewsPost;