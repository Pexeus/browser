const storage = require("./storage");;

module.exports = {
    tabs: {
        new: function(id) {
            newTab(id)
        },
        update: function() {
            updateTabs()
        },
        close: function(tab) {
            vie.get("#" + tab.tabID).remove()
        }
    }
}

function updateTabs() {
    let tabs = storage.tabs.list

    const ids = Object.keys(tabs)

    ids.forEach(id => {
        let set = tabs[id]

        let $tab = vie.get("#" + set.tabID)

        if (set.title != undefined) {
            $tab.children[3].innerHTML = set.title
        }

        if (set.icon != undefined) {
            $tab.children[2].src = set.icon
        }

        if (set.active == false) {
            $tab.classList.remove("tabActive")
        }
        else {
            $tab.classList.add("tabActive")
        }

        if (set.status != undefined) {
            updateStatus($tab, set.status)
        }
    })

    function updateStatus($tab, status) {
        console.log($tab.children)
        console.log(status)

        if (status == "idle") {
            $tab.children[1].style.display = "none"
            $tab.children[2].style.display = "inline-block"
        }

        if (status == "load-wait") {
            $tab.children[1].style.display = "inline-block"
            $tab.children[1].children[0].classList.remove("spinner-commit")
            
            $tab.children[2].style.display = "none"

            $tab.children[3].innerHTML = "Loading..."
        }

        if (status == "load-commit") {
            $tab.children[1].style.display = "inline-block"
            $tab.children[1].children[0].classList.add("spinner-commit")
            
            $tab.children[2].style.display = "none"

            $tab.children[3].innerHTML = "Loading..."
        }
    }
}

function newTab(id) {
    const $tabHost = vie.get("#tabs")

    let $tab = vie.new("div", "#tab_" + id)
    $tab.classList.add("tab")

    let $tabControls = vie.new("div", "#tabControls")

    let $reload = vie.new("i", ".gg-redo")
    let $forward = vie.new("i", ".gg-arrow-right-o")
    let $backward = vie.new("i", ".gg-arrow-left-o")

    vie.insert($tabControls, [$backward, $forward])

    let $closeTab = vie.new("img", "#closeTab")
    $closeTab.src = "./img/close.png"

    let $tabIcon = vie.new("img", "#tabIcon")

    let $loaderWrapper = vie.new("div", "#loaderWrapper")
    let $loader = vie.new("i", ".gg-spinner")
    $loaderWrapper.appendChild($loader)

    console.log($loaderWrapper)

    $tab.addEventListener("click", () => {
        let tab = event.target
        let close = false

        if (tab.id == "closeTab") {
            close = true
        }

        while (tab.classList[0] != "tab") {
            tab = tab.parentElement
        }

        console.log(tab.classList)

        tabID = tab.id.match(/\d+/)[0]

        if (close == false) {
            let tab = storage.get(tabID)

            toTab(tab)
        }
        else {
            closeTab(storage.get(tabID))
        }

        updateTabs()
    })

    let $tabText = vie.new("p", "#tabName", "Loading...")

    $tab.appendChild($tabControls)
    $tab.appendChild($loaderWrapper)
    $tab.appendChild($tabIcon)
    $tab.appendChild($tabText)
    $tab.appendChild($closeTab)
    $tabHost.insertBefore($tab, vie.get("#newTab"))

    updateTabs()
}