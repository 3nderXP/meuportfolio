import config from './config.js'

export default class View{

    static async getViewContent(view){
        
        let file = null

        if(view){

            const dir = `${config.url_base}/assets/view/`,
                  result = await fetch(dir + view + '.html'),
                  response = await result.text()

            if(result.ok){

                file = response
            
            }
            
        }
                
        return file

    }

    static async render(view, vars = {}){

        let viewContent = await this.getViewContent(view);

        let varsKeys = Object.keys(vars),
            newVarsKeys = varsKeys.map((key) => {

                return `{{${key}}}`

            })

        newVarsKeys.forEach(async (key, index) => {
            
            viewContent = viewContent.replaceAll(key, vars[varsKeys[index]])

        })
        
        return viewContent

    }

}