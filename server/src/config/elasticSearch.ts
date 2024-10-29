import { Client } from '@elastic/elasticsearch';

const client = new Client({
    node: 'http://localhost:9200', // Asegura't que és la teva URL d'Elasticsearch
});

export default client;