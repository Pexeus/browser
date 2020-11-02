(function(window){
    // This function will contain all our code
    function vie(){
      var _lib = {};
  
      _lib.log = function(toLog) {
        console.log(toLog)
      }
  
      //create element
      _lib.new = function(type, identifier, inner) {
        $e = document.createElement(type)
  
        if (identifier != undefined) {
          if (identifier.charAt(0) == "#") {
            $e.id = identifier.substr(1)
          }
  
          else if (identifier.charAt(0) == ".") {
            $e.classList.add(identifier.substr(1))
          }
        }
  
        if (inner != undefined) {
          if (typeof(inner) != "object") {
            $e.innerHTML = inner
          }
          else {
            $e.appendChild(inner)
          }
        }
  
        return $e
      }
  
      //get all elements
      _lib.get = function(identifier) {
        if (identifier != undefined) {
  
          list = []
  
          if (identifier.charAt(0) == "#") {
            collection = document.querySelectorAll("[id=" + identifier.substr(1) + "]");
  
            for (i = 0; i < collection.length; i++) {
              list.push(collection[i])
            }
          }
  
          else if (identifier.charAt(0) == ".") {
            collection = document.getElementsByClassName(identifier.substr(1))
  
            for (i = 0; i < collection.length; i++) {
              list.push(collection[i])
            }
          }
  
          else if (identifier.charAt(0) == "<") {
            collection = document.getElementsByTagName(identifier.substr(1))
  
            for (i = 0; i < collection.length; i++) {
              list.push(collection[i])
            }
          }
  
          else {
            console.log("Specify class/id")
          }
        }
        else {
          console.log("identifier required")
  
          return false
        }
  
        if (list.length != undefined) {
          if (list.length == 1) {
            return list[0]
          }
          else {
            return list
          }
        }
        else {
          return false
        }
      }
  
      _lib.insert = function(root, elements) {
        if (root == undefined || elements == undefined) {
          console.log("Wrong Syntax")
  
          return false
        }
  
        if (typeof(root) != "object") {
          rootList = _lib.get(root)
  
          if (rootList.length > 1) {
            root = rootList[0]
          }
          else {
            root = rootList
          }
        }
  
        if (root == false) {
          console.log("cant find root")
  
          return false
        }
  
        if (elements.length != undefined) {
          for (i = 0; i < elements.length; i++) {
            element = elements[i]
            
            if (typeof(element) == "object") {
              root.appendChild(element)
            }
            else {
              root.innerHTML = element
            }
          }
  
        }
        else {
          if (typeof(elements) == "object") {
            root.appendChild(elements)
          }
          else {
            root.innerHTML = elements
          }
        }
  
      }
  
      _lib.build = function(root, tree) {
        res = insert(root, tree)
  
        function insert(root, elements) {
          for(let i = 0; i < elements.length; i++) {
            if (elements[i].length != undefined) {
              insert(elements[i - 1], elements[i])
            }
            else {
              root.appendChild(elements[i])
            }
          }
    
          return root
        }
  
        return res
      }
  
      _lib.gen = function(tree) {
        console.log(tree)
        let keys = Object.keys(tree)
  
        if (keys.length > 1) {
          console.log("ERROR: " + keys.length + " Keys found!")
  
          return false
        }
  
        const rootElement = genElement(keys[0], tree[keys[0]])
  
        function genElement(key, properties) {
          console.log(key, properties)
        }
      }
  
      return _lib;
    }  
  // We need that our library is globally accesible, then we save in the window
  if(typeof(window.vie) === 'undefined'){
    window.vie = vie();
  }
  })(window); // We send the window variable withing our function