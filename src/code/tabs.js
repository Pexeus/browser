const tabContainer = vie.get("#tabs")

function newTab(url) {
    const newTab = vie.get("#newTab")
    const tab = vie.new("div", ".tab")
    tab.id = url

    const tabName = vie.new("p", ".tabName", url)

    const closeTab = vie.new("img", "#closeTab")
    closeTab.src = "./img/close.png"

    tab.appendChild(tabName)
    tab.appendChild(closeTab)
    tabContainer.appendChild(tab)

    tabContainer.appendChild(newTab)
}

newTab("google.com")
