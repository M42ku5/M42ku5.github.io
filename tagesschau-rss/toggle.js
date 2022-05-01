export function toggle(el) {
    if (el.hasAttribute("open")) {
        el.removeAttribute("open","")
        } else {
        document.querySelectorAll("details").forEach(el1=>{ if( el1.hasAttribute("open") ) {
          el1.removeAttribute("open")
          }
        })
        el.setAttribute("open","")
        }
}
