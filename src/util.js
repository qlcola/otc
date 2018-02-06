export const getCookie = (name) => {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
};

export const setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();　　　　
  exdate.setDate(exdate.getDate() + expiredays);　　　　
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

export const delCookie = (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

export const formatPrice = (number) => {
  var str = String(number);
  var newStr = "";
  var count = 0;

  if(str.indexOf(".") == -1) {
    for(var i = str.length - 1;i >= 0;i--) {
      if(count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + "," + newStr;
      } else {
        newStr = str.charAt(i) + newStr;
      }
      count++;
    }
    return newStr;
  } else {
    for(var i = str.indexOf(".")-1;i>=0;i--){
      if(count % 3 == 0 && count != 0){
        newStr = str.charAt(i) + "," + newStr;
      }else{
        newStr = str.charAt(i) + newStr; //逐个字符相接起来
      }
      count++;
    }
    str = newStr + (str + "00").substr((str + "00").indexOf("."),8);
    return str;
  }
};