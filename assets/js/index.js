import Config from './config.js'
import Utils from './utils.js'
import View from './view.js'

const elementsTypingEffects = document.querySelectorAll('.typing-effect')
const menusHamburgueres = document.querySelectorAll('.menu-hamburguer')
const customersReviewsContainer = document.querySelector('.customers-reviews .reviews')

let customersReviews

const projectsContainer = document.querySelector('.projects .wrapper')

window.addEventListener('load', async () => {

    if(projectsContainer){

        try {
            const skeletonCount = 4
            const skeletonView = await View.render('components/projects/project/skeleton')
            projectsContainer.innerHTML = skeletonView.repeat(skeletonCount)

            const projects = Utils.shuffle(await (await fetch(`${Config.urlBase}/assets/json/projects.json`)).json())

            const projectsView = await Promise.all(projects.map(async (project) => {

                const techsView = await Promise.all(project.stacks.map(async (tech) => {
                    return await View.render('components/projects/project/tech', { tech })
                }))

                return Utils.toHTML(await View.render('components/projects/project', {
                    link: project.link || '#',
                    name: project.name,
                    image: project.image,
                    techs: techsView.join('')
                }))
            }))

            projectsContainer.classList.add('loaded')
            projectsContainer.innerHTML = null
            projectsView.forEach(projectView => projectsContainer.appendChild(projectView))

        } catch (error) {
            console.error('Error loading projects:', error)
            projectsContainer.classList.add('loaded')
            projectsContainer.innerHTML = '<p class="error">Failed to load projects. Please try again later.</p>'
        }

    }

    if(customersReviewsContainer){

        try {
            
            customersReviews = Utils.shuffle(await (await fetch(`${Config.urlBase}/assets/json/customers_reviews.json`)).json()).filter(customerReview => customerReview.status)

            const viewLocale = 'components/reviews/review'
            const customersReviewsView = await Promise.all(customersReviews.slice(0, 2).map(async (customerReview) => {
        
                return Utils.toHTML(await View.render(`${viewLocale}`, {
                    stars: (await View.render(`${viewLocale}/stars/star`)).repeat(customerReview.stars),
                    starsCount: customerReview.stars,
                    message: customerReview.message,
                    avatar: customerReview.avatar,
                    name: customerReview.name,
                    service: customerReview.service,
                }))
                
            }))
        
            customersReviewsContainer.innerHTML = null
        
            customersReviewsView.forEach((customerReview) => {

                customersReviewsContainer.appendChild(customerReview)
                
                const message = customerReview.querySelector('.message')
                const seeMore = message.querySelector('.see-more')

                const styles = getComputedStyle(message)
                const minHeight = styles.getPropertyValue('min-height').replace(/\D/g, '')
                
                if(message.clientHeight <= minHeight){

                    seeMore.remove()
                    return

                }

                message.style.maxHeight = `${message.clientHeight}px`
                message.style.height = `0%`

                seeMore.addEventListener('click', () => {

                    message.classList.toggle('see-more')

                })
        
            })

        } catch (error) {
            console.error('Error loading customers reviews:', error)
            customersReviewsContainer.innerHTML = '<p class="error">Failed to load customers reviews. Please try again later.</p>'
        }
    
    }
    
    if(menusHamburgueres.length > 0){
    
        menusHamburgueres.forEach((menu) => {
    
            const sidebar = document.querySelector(`#${menu.dataset.for}`)
            const ResObserver = new ResizeObserver(() => {
    
                if(document.body.clientWidth < 1095) {
    
                    sidebar.classList.remove('show')
    
                }
    
                const nav = sidebar.querySelector('nav')
                const styles = getComputedStyle(nav)
                const sidebarPadding = styles.getPropertyValue('--padding')
    
                nav.style.paddingRight = nav.scrollHeight > nav.clientHeight ? sidebarPadding : 0
    
            })
    
            ResObserver.observe(sidebar)
    
            menu.addEventListener('click', () => {
    
                console.log('click')
                sidebar.classList.toggle('show')
    
            })
    
        })
    
    }
    
    if(elementsTypingEffects.length > 0){
    
        const backupElementsValues = []
    
        for(let [index, element] of elementsTypingEffects.entries()){
            
            backupElementsValues[index] = element.textContent
            element.style.height = `${element.clientHeight}px`
    
            element.innerHTML = null
    
        }
    
        for(let [index, text] of backupElementsValues.entries()){
    
            await typingEffect(elementsTypingEffects[index], text, 25)
    
        }
    
    }

})

async function typingEffect(element, text, time = 50) {

    let currentTextLetter = 0,
        interval = null

    return new Promise((resolve) => {

        interval = setInterval(() => {

            if(currentTextLetter >= text.length){

                clearInterval(interval)
                resolve()
                return

            }

            element.textContent += text[currentTextLetter]
            
            currentTextLetter++

        }, time)

    })

}