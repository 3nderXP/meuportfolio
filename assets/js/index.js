import View from './view.js'
import Utils from './utils.js'

const elementsTypingEffects = document.querySelectorAll('.typing-effect')
const menusHamburgueres = document.querySelectorAll('.menu-hamburguer')
const customersReviewsContainer = document.querySelector('.customers-reviews .reviews')
const customersReviews = Utils.shuffle([
    {
        avatar: 'https://cdn.discordapp.com/avatars/687372534030663759/7aef0f501331a0ccbfa2a09e7bc8848c.png?size=2048',
        name: 'Gabriel Eduardo',
        service: 'Calculadora Tributaria',
        stars: 5,
        message: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et',
    },
    {
        avatar: 'https://cdn.discordapp.com/avatars/638886080363626507/6dd85646b0032fda9d72ea8c2bc9614e.png?size=2048',
        name: 'Jhonzzera',
        service: 'Carousel',
        stars: 5,
        message: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et',
    },
    {
        avatar: 'https://cdn.discordapp.com/avatars/319099107396288515/84ece945116676ee36949e70f3e1cde4.png?size=2048',
        name: 'Samuel Barbera',
        service: 'Site para bot',
        stars: 5,
        message: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et',
    },
])

if(customersReviewsContainer){

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

    })

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

        await typingEffect(elementsTypingEffects[index], text)

    }

}

async function typingEffect(element, text) {

    let currentTextLetter = 0,
        interval = null,
        time = 50

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