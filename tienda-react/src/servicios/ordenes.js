import api from './api.js';

export async function enviarOrden(pedido){
    const respuesta = await api.post('/ordenes', pedido);
    return respuesta.data;
}