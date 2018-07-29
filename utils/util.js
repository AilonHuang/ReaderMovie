function convertToStarsArray(stars) {
  var num = stars.toString().substring(0,1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }

  return array;
}

function convertToCastString(casts) {
  var castsjoin = '';
  for (var i in casts) {
    castsjoin = castsjoin + casts[i].name + ' / ';
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function converToCastInfos(casts) {
  var castsArray = []
  for (var i in casts) {
    var cast = {
      img: casts[i].avatars ? casts[i].avatars.large : '',
      name: casts[i].name
    }

    castsArray.push(cast)
  }
  return castsArray;
}

function http(url, callBack) {
  var that = this;
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callBack(res.data);
    }
  })
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastString: convertToCastString,
  converToCastInfos: converToCastInfos
}