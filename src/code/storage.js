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
    },
    next: function(query) {
        return nextTab(Object.keys(tabList), query)
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

function nextTab(array, num) {
    let index = array.indexOf(String(num))
    array.splice(index, 1)

    console.log(array);

    var i = 0;
    var minDiff = 1000;
    var ans;
    for (i in array) {
      var m = Math.abs(num - array[i]);
      if (m < minDiff) {
        minDiff = m;
        ans = array[i];
      }
    }
    return ans;
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