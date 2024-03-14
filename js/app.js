const magnifier = document.querySelector('.magnifier')
const content = document.querySelector('.content')
const userAgent = navigator.userAgent

if (deviceCheck(userAgent).type === 1) {
    content.addEventListener('touchmove', touchEventHandler)
    content.addEventListener('touchstart', touchEventHandler)
}

if (deviceCheck(userAgent).type === 2) {
    content.addEventListener('mousemove', mouseEventHandler)
    content.addEventListener('mouseleave', mouseEventHandlerRemove)
}



function mouseEventHandler(e) {
    let cloneNode = content.cloneNode(true)

    cloneNode.style.transform = 'scale(2)'
    cloneNode.style.transformOrigin = '0 0'
    cloneNode.style.background = '#fff'
    cloneNode.style.color = '#111'
    cloneNode.style.margin = '0'

    cloneNode.style.width = `${content.offsetWidth}px`
    cloneNode.style.height = `${content.offsetHeight}px`

    magnifier.style.display = 'block'
    magnifier.style.width = '150px'
    magnifier.style.height = '150px'
    magnifier.style.overflow = 'hidden'

    magnifier.innerHTML = ''
    magnifier.appendChild(cloneNode)

    magnifier.style.top = `${e.pageY + 15}px`
    magnifier.style.left = `${e.pageX - magnifier.offsetHeight / 2}px`

    const rect = content.getBoundingClientRect()
    const pos3 = e.clientX - rect.left
    const pos4 = e.clientY - rect.top

    const cx = magnifier.offsetWidth / 2;
    const cy = magnifier.offsetHeight / 2;

    magnifier.scrollTo(
        pos3 * 2 - cx, /* -> x */
        pos4 * 2 - cy  /* -> y */
    )

}

function touchEventHandler(e) {
    let cloneNode = content.cloneNode(true)

    cloneNode.style.transform = 'scale(3)'
    cloneNode.style.transformOrigin = '0 0'
    cloneNode.style.background = '#fff'
    cloneNode.style.color = '#111'
    cloneNode.style.margin = '0'

    cloneNode.style.width = `${content.offsetWidth}px`
    cloneNode.style.height = `${content.offsetHeight}px`

    magnifier.style.display = 'block'
    magnifier.style.width = '90%'
    magnifier.style.height = '150px'
    magnifier.style.margin = 'auto'
    magnifier.style.borderRadius = '3px'
    magnifier.style.overflow = 'hidden'
    magnifier.style.boxShadow = '0 0 22px #111, 4px 4px 1px #111'

    magnifier.innerHTML = ''
    magnifier.appendChild(cloneNode)

    magnifier.style.bottom = `10px`
    magnifier.style.left = `10px`
    magnifier.style.right = `10px`

    const rect = content.getBoundingClientRect()
    let pos3, pos4
    if (e.touches[0] && e.touches[0].clientX && e.touches[0].clientY) {
        pos3 = e.touches[0].clientX - rect.left
        pos4 = e.touches[0].clientY - rect.top
        const cx = magnifier.offsetWidth / 2;
        const cy = magnifier.offsetHeight / 2;
    
        magnifier.scrollTo(
            pos3 * 3 - cx, /* -> x */
            pos4 * 3 - cy  /* -> y */
        )
    }

}

function deviceCheck(userAgent) {
    const ios = /iPhone|ios/i
    const android = /Android/i

    if (ios.test(userAgent) || android.test(userAgent)) {
        return { type: 1, device: 'Mobile' }
    } else {
        return { type: 2, device: 'PC' }
    }
}

function mouseEventHandlerRemove() {
    magnifier.style.display = 'none'
}