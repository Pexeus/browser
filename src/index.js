const head = require("./code/head")
const web = require("./code/web")
const storage = require("./code/storage");

let nextID = 0

function toTab(tab) {
    web.views.to(tab)
}

function updateHead() {
    head.tabs.update()
}

function goBack() {
    web.navigate.backward()
}

function goForward() {
    web.navigate.forward()
}

function reloadTab() {
    web.navigate.reload()
}

function closeTab(tab) {
    if (tab.active == true) {
        let nextTabID = storage.next(tab.id)
        toTab(storage.tabs.list[nextTabID])
    }

    web.views.close(tab)
    head.tabs.close(tab)
}

function newTab() {
    const id = nextID += 1
    web.views.closeCurrent()

    storage.tabs.list[id] = {
        id: id,
        active: true,
        tabID: "tab_" + id,
        viewID: "view_" + id
    }

    head.tabs.new(id)
    web.views.new(id)
}

newTab()