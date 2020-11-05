let tabList = {}

module.exports = {
    tabs: {
        list: tabList,
        active: function () {
            return getActiveTab()
        }
    },
    active: function() {
        return getActiveTab()
    },
    get: function(query) {
        return getTab(query)
    }
}

//-> hier noch nach view_id usw. suchen 
function getTab(query) {
    let result = false

    const tabIDs = Object.keys(tabList)
    tabIDs.forEach(tabID => {
        if (tabList[tabID].id == query) {
            result = tabList[tabID]
        }
    })

    return result
}

function getActiveTab() {
    let result = false

    const tabIDs = Object.keys(tabList)
    tabIDs.forEach(tabID => {
        if (tabList[tabID].active == true) {
            result = tabList[tabID]
        }
    })

    return result
}