document.addEventListener("DOMContentLoaded", function (event) {

    // Fon
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId),
            headerpd = document.getElementById(headerId)

        // Vérification que toutes les variables existent
        if (toggle && nav && bodypd && headerpd) {
            toggle.addEventListener('click', () => {
                // Afficher navbar
                nav.classList.toggle('show')
                // CHanger l'icone
                toggle.classList.toggle('bx-x')
                // Ajouter du padding au body
                bodypd.classList.toggle('body-pd')
                // Ajouter du padding au header
                headerpd.classList.toggle('body-pd')
            })
        }
    }

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')

    function colorLink() {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active'))
            this.classList.add('active')
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))

    // Your code to run since DOM is loaded and ready
});