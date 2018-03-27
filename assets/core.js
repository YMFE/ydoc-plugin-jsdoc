$(function() {
  var num = 0;
  var searchText;
  var searchMaxNum = 8;
  window.ydoc_plugin_search_core = function(text) {
    var json = window.ydoc_plugin_search_json;    
    searchText = text;
    num = 0;
    var result = search(json)
    return result;
  };

  function cloneObject(obj) {
    if (typeof obj === 'object') {
      if (Array.isArray(obj)) {
        var newArr = [];
        newArr = [].concat(obj);
        return newArr;
      } else {
        var newObj = {};
        for (var key in obj) {
          newObj[key] = cloneObject(obj[key]);
        }
        return newObj;
      }
    } else {
      return obj;
    }
  }

  function search(json){
    var result = {}
    for(var i in json){
      var data = searchBook(json[i])
      if(data.length > 0) result[i] = data;
    }
    return result;
  }

  function searchBook(pages){
    pages = cloneObject(pages)
    for(var i=0, l=pages.length; i< l; i++){
      var page = pages[i]
      if(num > searchMaxNum){
        return;
      }
      if(page.content && page.content.indexOf(searchText) > -1){
        num++;
      }else{
        delete page.content;
      }
      if(page.children && Array.isArray(page.children)){
        for(var j=0, len=page.children.length; j< len; j++){
          var child = page.children[j];
          if(child.content && child.content.indexOf(searchText) > -1){
            num++;
          }else{
            delete child.content
          }
        }
        page.children = page.children.filter(function(child){
          return child.content
        })
      }
    }
    pages = pages.filter(function(page){
      if(!page.content && page.children.length === 0){
        return false;
      }
      return true;
    })
    return pages;
  }


});
