var util = require('../../utils/util.js')
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
  onLoad: function (options) {
    var doubanBase = appInstance.globalData.doubanBase;
    var inTheatersUrl = doubanBase + '/v2/movie/in_theaters?start=0&count=3';
    var comingSoonUrl = doubanBase + '/v2/movie/coming_soon?start=0&count=3';
    var top250Url = doubanBase + '/v2/movie/top250?start=0&count=3'

    this.getMovieListData(inTheatersUrl, '正在热映', 'inTheaters');
    this.getMovieListData(comingSoonUrl, '即将上映', 'comingSoon');
    this.getMovieListData(top250Url, 'Top250', 'top250');
  },

  getMovieListData: function(url, title, settedKey) {
    var that = this;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.processDoubanData(res.data, settedKey);
      }
    })
  },

  processDoubanData: function (moviesDouban, settedKey) {
    var movies = [];
    for (var index in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[index];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0,6) + '...';
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
    readyData[settedKey] = {
      movies: movies
    };
    this.setData(readyData);
  }
})