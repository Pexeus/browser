let webViews = []
let currentWebview = false

module.exports = {
    new: function(url) {
        newWebview(url)
    }
}

function newWebview(url) {
    webViews.push({url: url})

    view = vie.new("webview")
    view.id = "view_" + webViews.length
    view.classList.add("webview")
    view.style = "display:inline-flex; width:100%; height:100%"
    view.src = url

    vie.get("#web").appendChild(view)
    switchTo(webViews.length)

    view.addEventListener('dom-ready', () => {
        console.log(view.getTitle())
    })
}

function switchTo(index) {
    if (currentWebview != false) {
        vie.get("#view_" + currentWebview).style.display = "none"
    }

    vie.get("#view_" + index).style.display = "inline-flex"

    currentWebview = index
}