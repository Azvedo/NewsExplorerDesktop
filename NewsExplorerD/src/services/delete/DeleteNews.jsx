import { createClient } from 'contentful-management';

// Inicializando o cliente do Contentful
const client = createClient({
  accessToken: 'CFPAT-QukjRMcI1IBzzkGKL0dvaBAGE71KGNas20QmVoqUjLo',
});

const spaceId = 'gft2mzhd30x8';
const environmentId = 'master'; 

async function deleteNewsPost(id) {
    try{
        const space = await client.getSpace(spaceId);
        const environment = await space.getEnvironment(environmentId);
        const entry = await environment.getEntry(id);

        // Verifica se a entrada está publicada e despublica antes de deletar (contentful não permite deletar entradas publicadas)
        if (entry.isPublished()) {
            await entry.unpublish();
            console.log('Entrada despublicada.');
        }

        await entry.delete();
        alert('Notícia deletada com sucesso');
        console.log('Notícia deletada com sucesso:', entry);    
    }
    catch(error){
        console.error('Erro ao deletar a notícia:', error);
    }
}

export default deleteNewsPost;  