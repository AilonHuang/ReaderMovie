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
    var posts_content = [{
        'date': 'Sep 15 2016',
        'title': 'title',
        'post_img': '/images/post/crab.png',
        'author_img': '/images/avatar/1.png',
        'content': 'content',
        'view_num': '12',
        'collect_num': '90',
      },
      {
        'date': 'Sep 18 2019',
        'title': 'title',
        'post_img': '/images/post/cat.png',
        'author_img': '/images/avatar/2.png',
        'content': 'content',
        'view_num': '15',
        'collect_num': '80',
      }
    ]

    this.setData({
      posts_content: posts_content
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})