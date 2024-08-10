/**
 * 
 * @param {string} string String que terá o primeiro caractere convertido para maiúsculo
 * 
 * @return {string} Retorna uma nova string com o primeiro caractere maiúsculo
 * 
*/

const toUpperCaseFirst = (string) => {

    try {

        if(typeof string != 'string' || string == ''){

            throw new Error('Parameter type is not String or is empty')

        }

        return string.charAt(0).toUpperCase() + string.slice(1)

    } catch (Error) {

        console.log(Error.message)

    }
    
}

/**
 * 
 * @param {string} string String a ser convertida
 * @param {string} separator [opcional] Separador que vai ser usado para quebrar a string. O valor padrão será espaço em branco.
 * 
 * @return {string} String convertida para o formato camelCase
 * 
*/

const toCamelCase = function (string, separator = ' ') {

    try {

        if(Array.from(arguments).every((param) => {typeof param == 'string' && param != ''})){
    
            throw new Error('Parameters are invalid or empty')
    
        }
    
        return string.toLowerCase().replaceAll(/\s+/g, separator).split(separator).map((word, index) => {

            if(index > 0){

                word = toUpperCaseFirst(word)

            }
            
            return word

        }).join('')

    } catch (Error) {
    
        console.log(Error.message)
    
    }

}

/**
 * 
 * Converte uma string para um elemento HTML ChildNode ou NodeList, dependendo da estrutura.
 * 
 * @param {string} string String contendo uma estrutura HTML
 * @return {ChildNode | NodeList | Element} Retorna um ChildNode ou NodeList
 * 
*/

const toHTML = (string) => {

    try {
        
        const anyElement = document.createElement('div')
    
        anyElement.innerHTML = string.trim()
    
        if(!anyElement.querySelectorAll('*') || anyElement.querySelectorAll('*').length == 0){

            throw new Error('A string fornecida não contém elemento(s) HTML');

        }
    
        return anyElement.childElementCount == 1 ? anyElement.firstChild : anyElement.childNodes

    } catch (Error) {

        console.error(Error.message)

    }

}

/**
 * 
 * Formata uma url para uma estrutura adequada para se usar em um iframe
 * 
 * @param {string} url URL do arquivo/página/vídeo e etc, que vai ser formatado
 * @param {string} website Nome do site de origem da URL especificada, para que a mesma seja formatada de acordo com o padrão da plataforma informada.
 * 
 * @return {string} Retorna a URL especificada formatada. 
 * 
 * Antes: https://youtu.be/TV5faBBHfkw
 * 
 * Depois: https://www.youtube.com/embed/TV5faBBHfkw
 * 
*/

const toIframeSrc = (url, website) => {

    try {

        if(!url || !website){

            throw new Error('Forneça todos os parâmetros necessários')

        }

        const urls = {
            "youtube": `https://www.youtube.com/embed/:id`,
            "vimeo": `https://player.vimeo.com/video/:id?color=${SITE_THEME}`,
            "drive": `https://drive.google.com/file/d/:id/preview?usp=sharing&showinfo=0`,
            "direct": `${url}?showinfo=0`
        }

        const regexExpression = /(((http(s)?:\/\/)(www.|music.|m.)?(youtube.com|youtu.be)(\/){1}((watch(\/)?\?v=)|((v\/{1})|embed\/))?)|(((http(s)?:\/\/)((player.|www.)?vimeo.com)\/{1})(video\/)?)|((http(s)?:\/\/){1}(drive.google.com){1}(\/file\/d\/|\/file\/u\/0\/d\/){1}))|([&](.*)|([?](.*))|((\/){1}(view|preview)[?]?(.*)))/g;

        if(!(website in urls)){
            
            throw new Error("Não temos uma formatação para o website fornecido")
            
        }

        const videoId = url.replace(regexExpression, '');
        const formattedUrl = urls[website].replaceAll(':id', videoId)

        return formattedUrl

    } catch(Error) {
        
        console.error(Error.message)

    }

}

/**
 * 
 * @param {object} object Objeto que deseja fazer a busca
 * @param {string} searchValue Valor a ser pesquisado no objeto
 * 
 * @return Retorna o indice da primeira ocorrencia no objeto
 * 
*/

const objIndexOf = (object, searchValue) => {

    for (let property in object) {

        if((property in object) && object[property] == searchValue){

            return property

        }

    }

}

/**
 * 
 * @param {array} array Array que será bagunçado
 * 
 * @return Retorna uma nova versão do array, porém, bagunçado
 * 
*/

const shuffle = (array) => {

    try {

        if(!Array.isArray(array)){

            throw new Error('O parâmetro fornecido não é um array')

        }
    
        return array.sort(() => {
    
            return Math.random() - 0.5
    
        })

    } catch(Error) {
        
        console.error(Error.message)

    }
    
}

/**
 * 
 * @param {Number} time Tempo em milisegundos
 * 
 * Faz com que o fluxo do escopo em que a função foi executada parar por um periodo e depois continuar
 * 
*/

const sleep = async (time) => {

    return new Promise((resolve) => setTimeout(() => resolve(), time))

}

/**
 * 
 * Algumas funções uteis para o desenvolvimento
 * 
*/

export default {
    toIframeSrc,
    toUpperCaseFirst,
    toCamelCase,
    toHTML,
    objIndexOf,
    shuffle,
    sleep
}