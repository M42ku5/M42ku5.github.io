export function toggle(el) {
    if (el.parentElement.hasAttribute("open")) {
        el.parentElement.removeAttribute("open","")
        } else {
        document.querySelectorAll("details").forEach(el1=>{ if( el1.hasAttribute("open") ) {
          el1.removeAttribute("open")
          }
        })
        el.parentElement.setAttribute("open","")
        }
}
