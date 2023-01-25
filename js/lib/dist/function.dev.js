"use strict";

function AjaxJS(method, url, asyncMode) {
  var _this = this;

  this.result = this.result;
  xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp == 4 && xmlHttp == 200) {
      _this.result = xmlHttp.responseText;
    }
  };

  xmlHttp.open(method, url, asyncMode);
  xmlHttp.send();
  return result;
}