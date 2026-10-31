(function () {
    "use strict";
    const header = document.querySelector(".dz-header");
    if (!header) return;
    const button = header.querySelector(".dz-menu-toggle");
    const navigation = header.querySelector("#dz-navigation");
    if (!button || !navigation) return;
    const mobile = window.matchMedia("(max-width: 1200px)");
    let open = false;
    function update(next) {
        open = mobile.matches && next;
        button.hidden = !mobile.matches;
        button.setAttribute("aria-expanded", String(open));
        button.setAttribute("aria-label", open ? button.dataset.closeLabel : button.dataset.openLabel);
        button.querySelector("[data-menu-icon]").setAttribute("d", open ? "M5 5l14 14M19 5 5 19" : "M4 6h16M4 12h16M4 18h16");
        navigation.hidden = mobile.matches && !open;
    }
    button.addEventListener("click", () => update(!open));
    navigation.addEventListener("click", event => {
        if (event.target.closest("a")) update(false);
    });
    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && open) {
            update(false);
            button.focus();
        }
    });
    document.addEventListener("click", event => {
        if (open && !header.contains(event.target)) update(false);
    });
    mobile.addEventListener("change", () => update(false));
    update(false);
})();
