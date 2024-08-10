import Config from './config.js'

export default class View {

    static async #getViewContent(view){

        try {

            let file = null
    
            if(view){
    
                const dir = `${Config.urlBase}/assets/view/`,
                      results = {
                          resultOne: await fetch(dir + view + '/index.html'),
                          resultTwo: await fetch(dir + view + '.html'),
                      }

                if((results.resultOne.status != 200 && !results.resultOne.ok) && (results.resultTwo.status != 200 && !results.resultTwo.ok)){

                    throw new Error

                }

                const response = (results.resultOne.ok) ? results.resultOne.text() : results.resultTwo.text()
    
                file = response
                
            }
                    
            return file

        } catch(e) {

            return ""

        }

    }

    static async render(view, vars = {}){

        let viewContent = await this.#getViewContent(view);

        if(typeof viewContent != "string" || !viewContent){

            return null;

        }

        let varsKeys = Object.keys(vars),
            newVarsKeys = varsKeys.map((key) => {

                return `{{${key}}}`

            })

        newVarsKeys.forEach(async (key, index) => {

            const value = (vars[varsKeys[index]] != null ? vars[varsKeys[index]] : '')
            
            viewContent = viewContent.replaceAll(key, value)

        })
        
        return viewContent

    }

}