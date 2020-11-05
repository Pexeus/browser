const storage = require("./storage")
const head = require("./head")

module.exports = {
    views: {
        new: function (id) {
            newView(id)
        },
        to: function(tab) {
            toView(tab)
        },
        close: function(tab) {
            vie.get("#" + tab.viewID).remove()
            delete storage.tabs.list[tab.id]

            console.log(storage.tabs.list)
        }
    }
}

function toView(tab) {
    deactivateCurrentView()

    let $tab = vie.get("#" + tab.viewID)
    $tab.style.display = "inline-flex"

    storage.tabs.list[tab.id].active = true
}

function newView(id) {
    deactivateCurrentView()

    const view = vie.new("webview", "#view_" + id)
    view.classList.add("webview")
    view.src = "https://www.google.com/"

    view.addEventListener("page-favicon-updated", () => {
        let favIcon = "https://" + (new URL(view.src)).hostname + "/favicon.ico"

        storage.tabs.list[id].icon = favIcon
        storage.tabs.list[id].status = "idle"

        head.tabs.update()
    })

    view.addEventListener("dom-ready", () => {
        let favIcon = "https://" + (new URL(view.src)).hostname + "/favicon.ico"

        storage.tabs.list[id].icon = favIcon
        storage.tabs.list[id].status = "idle"
        storage.tabs.list[id].title = view.getTitle()

        head.tabs.update()
    })

    view.addEventListener("did-start-loading", () => {
        storage.tabs.list[id].status = "load-wait"

        head.tabs.update()
    })

    view.addEventListener("load-commit", () => {
        storage.tabs.list[id].status = "load-commit"

        head.tabs.update()
    })

    vie.get("#web").appendChild(view)
}

function deactivateCurrentView() {
    const currentTab = storage.tabs.active()

    if (currentTab != false) {
        let $tab = vie.get("#" + currentTab.viewID)
        $tab.style.display = "none"

        storage.tabs.list[currentTab.id].active = false
    }
}