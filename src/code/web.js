const storage = require("./storage")

module.exports = {
    //tab management
    views: {
        new: function (id) {
            newView(id)
        },
        to: function(tab) {
            deactivateCurrentView()
            toView(tab)
        },
        close: function(tab) {
            vie.get("#" + tab.viewID).remove()
            delete storage.tabs.list[tab.id]
        },
        closeCurrent: function() {
            deactivateCurrentView()
        }
    },
    //bezieht sich immer auf den aktuellen tab
    navigate: {
        to: function(query) {

        },
        backward: function() {
            $view = storage.active().domView

            if ($view.canGoBack()) {
                $view.goBack()
            }
        },
        forward: function() {
            $view = storage.active().domView

            if ($view.canGoForward()) {
                $view.goForward()
            }
        },
        reload: function() {
            $view = storage.active().domView

            $view.reload()
        }
    }
}

function toView(tab) {
    let $tab = vie.get("#" + tab.viewID)
    $tab.style.display = "inline-flex"

    storage.tabs.list[tab.id].active = true
}

function newView(id) {
    const view = vie.new("webview", "#view_" + id)
    view.classList.add("webview")
    view.src = "https://www.google.com/"

    storage.tabs.list[id].domView = view

    view.addEventListener("page-favicon-updated", () => {
        let favIcon = "https://" + (new URL(view.src)).hostname + "/favicon.ico"

        storage.tabs.list[id].icon = favIcon
        storage.tabs.list[id].status = "idle"

        updateHead()
    })

    view.addEventListener("dom-ready", () => {
        let favIcon = "https://" + (new URL(view.src)).hostname + "/favicon.ico"

        storage.tabs.list[id].icon = favIcon
        storage.tabs.list[id].title = view.getTitle()

        updateHead()
    })

    view.addEventListener("did-stop-loading", () => {
        storage.tabs.list[id].status = "idle"

        updateHead()
    })

    view.addEventListener("did-start-loading", () => {
        storage.tabs.list[id].status = "load-wait"
        storage.tabs.list[id].icon = undefined

        updateHead()
    })

    view.addEventListener("load-commit", () => {
        if (storage.tabs.list[id].status != "idle") {
            storage.tabs.list[id].status = "load-commit"
            updateHead()
        }
    })

    vie.get("#web").appendChild(view)
}

function deactivateCurrentView() {
    let currentView = storage.tabs.active()

    if (currentView.domView != undefined) {
        currentView.domView.style.display = "none"
        storage.tabs.list[currentView.id].active = false

        updateHead()
    }
}