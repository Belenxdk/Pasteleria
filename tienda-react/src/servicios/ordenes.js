import api from './api.js';

export async function enviarOrden(pedido){
    const respuesta = await api.post('/ordenes', pedido);
    return respuesta.data;
}

export async function listarOrdenes(){
    const respuesta = await api.get('/ordenes');
    return respuesta.data;
}

export async function obtenerOrden(id){
    const respuesta = await api.get(`/ordenes/${id}`);
    return respuesta.data;
}