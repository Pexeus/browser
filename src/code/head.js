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
            $tab.children[1].innerHTML = set.title
        }

        if (set.icon != undefined) {
            $tab.children[0].src = set.icon
        }
    })
}

function newTab(id) {
    const $tabHost = vie.get("#tabs")

    let $tab = vie.new("div", "#tab_" + id)
    $tab.classList.add("tab")

    let $closeTab = vie.new("img", "#closeTab")
    $closeTab.src = "./img/close.png"

    let $tabIcon = vie.new("img", "#tabIcon")
    $tabIcon.src = "./img/loader.gif"

    $tab.addEventListener("click", () => {
        let tab = event.target
        let close = false

        if (tab.id == "closeTab") {
            close = true
        }

        while (tab.className != "tab") {
            tab = tab.parentElement
        }

        tabID = tab.id.match(/\d+/)[0]

        if (close == false) {
            toTab(storage.get(tabID))
        }
        else {
            closeTab(storage.get(tabID))
        }

    })

    let $tabText = vie.new("p", "#tabName", "Loading...")

    $tab.appendChild($tabIcon)
    $tab.appendChild($tabText)
    $tab.appendChild($closeTab)
    $tabHost.insertBefore($tab, vie.get("#newTab"))
}