var util = require('../../../utils/util.js')
var appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showNavigationBarLoading()
    var category = options.category;
    wx.setNavigationBarTitle({
      title: category
    })
    this.setData({
      navigateTitle: category
    })

    var doubanBase = appInstance.globalData.doubanBase;
    dataUrl = '';
    switch (category) {
      case '正在热映':
        var dataUrl = doubanBase + '/v2/movie/in_theaters';
        break;
      case '即将上映':
        var dataUrl = doubanBase + '/v2/movie/coming_soon';
        break;
      case 'Top250':
        var dataUrl = doubanBase + '/v2/movie/top250'
        break;
    }

    util.http(dataUrl, this.processDoubanData)
  },

  processDoubanData: function (moviesDouban) {
    var movies = [];
    for (var index in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[index];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }

      var temp = {
        title: title,
        stars: util.convertToStarsArray(subject.rating.stars),
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }

      movies.push(temp);
    }

    var readyData = {};
    
    this.setData({
      movies: movies
    });
  },

  onReady: function() {
    wx.hideNavigationBarLoading()
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    })
  },
})