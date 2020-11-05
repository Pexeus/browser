const head = require("./code/head")
const web = require("./code/web")
const storage = require("./code/storage");

function toTab(tab) {
    web.views.to(tab)
}

function closeTab(tab) {
    web.views.close(tab)
    head.tabs.close(tab)
}

function newTab() {
    const id = Math.floor(Math.random() * Math.floor(1000))

    head.tabs.new(id)
    web.views.new(id)

    storage.tabs.list[id] = {
        id: id,
        active: true,
        tabID: "tab_" + id,
        viewID: "view_" + id
    }
}

newTab()