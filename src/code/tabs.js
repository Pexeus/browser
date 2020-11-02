const view = require("./webviews")
const tabContainer = vie.get("#tabs")

function newTab(url) {
    view.new(url)

    const newTab = vie.get("#newTab")
    const tab = vie.new("div", ".tab")
    tab.id = url

    const tabName = vie.new("p", ".tabName", url)

    const closeTab = vie.new("img", "#closeTab")
    closeTab.src = "./img/close.png"

    tab.addEventListener("click", function() {
        switchTo(event.target)
    })

    tab.appendChild(tabName)
    tab.appendChild(closeTab)
    tabContainer.appendChild(tab)

    tabContainer.appendChild(newTab)
}

function switchTo(tab) {
    while(tab.tagName != "DIV") {
        tab = tab.parentElement
    }

    tab.id = "active"
}

vie.get("#newTab").addEventListener("click", () => {
    newTab("https://www.google.com/")
})

newTab("https://www.google.com/")
