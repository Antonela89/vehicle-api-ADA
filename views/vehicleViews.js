// no hay importacion de modulos o archivos
// formateo de la información a mostrar al usuario

const ResponseView = {
    formatResponse: (data) => {
        return JSON.stringify(data, null, 2);
    }
}

export { ResponseView }