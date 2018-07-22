var postsData = require('../../../data/posts-data.js')

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
    var postId = options.id;
    this.setData({
      postId:postId
    })
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    })

    try {
      var postsCollected = wx.getStorageSync('posts_collected')
      if (postsCollected) {
        var postCollected = postsCollected[postId]
        this.setData({
          collected: postCollected
        })
      } else {
        postsCollected = {};
        postCollected = postsCollected[postId] = false;
        wx.setStorageSync('posts_collected', postsCollected)
      }
    } catch (e) {
      // Do something when catch error
      console.log(e);
    }
  },

  onCollectionTap: function(event) {
    var postsCollected = wx.getStorageSync('posts_collected');
    var postCollected = postsCollected[this.data.postId]; 
    console.log(postCollected);
    postCollected = !postCollected;
    postsCollected[this.data.postId] = postCollected;
    wx.setStorageSync('posts_collected', postsCollected)
    this.setData({
      collected: postCollected
    })
  }
})