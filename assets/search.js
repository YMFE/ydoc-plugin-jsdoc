$(function(){
  var $searchResult = $('.js-search-result'),
      $searchInput = $('.js-input');

  // 判断是否为空对象
  function realObj(obj) {
    for (var i in obj) {
      return true;
    }
    return false;
  }

  // 防抖函数
  function debounce(func, wait) {
    var timeout;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }

  // 监听输入的内容
  $searchInput.on('input', debounce(function(e) {
    var val = e.target.value,
        res = window.ydoc_plugin_search_core(val);
    
    $searchResult.show();

    if (realObj(res) || val === '') {
      var dom = '';
      for (var key in res) {
        dom += `<div class="headline">${key}</div>`;
        res[key].forEach(function(item, index) {
          var contentDom = '';
          item.children.forEach(function(item, index) {
            contentDom += `<div class="caption-title">${item.title}</div>`;
          })
          dom += `<div class="row">
            <div class="subtitle">${item.title}</div>
            <div class="content">${contentDom}</div>
          </div>`
        })
      }
      $searchResult.html(dom);
    } else {
      $searchResult.html(`<div class="empty">没有找到关键词 <b>${val}</b> 的搜索结果</div>`)
    }
  }, 300));

  // $searchInput
  $searchInput.on('blur', function(e) {
    $searchResult.hide();
  })
})