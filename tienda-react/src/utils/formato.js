export function formatearPrecio(valor){
    return valor.toLocaleStrig('es-CL',{
        style: 'currency',
        currency: 'CLP'
    })
}