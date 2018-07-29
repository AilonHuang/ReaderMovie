var postsData = require('../../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postId = options.id;
    this.setData({
      postId: postId
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

    this.setAudioMonitor();
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  setAudioMonitor: function() {
    var that = this;
    wx.onBackgroundAudioPlay(function() {
      that.setData({
        isPlayingMusic: true
      })
    })

    wx.onBackgroundAudioPause(function() {
      that.setData({
        isPlayingMusic: false
      })
    })

    wx.onBackgroundAudioStop(function() {
      that.setData({
        isPlayingMusic: false
      })
    })

    const backgroundAudioManager = wx.getBackgroundAudioManager()
    if (backgroundAudioManager.paused === false && this.data.postData.music.url === backgroundAudioManager.src) {
      that.setData({
        isPlayingMusic: true
      })
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

    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      icon: 'success',
      duration: 1000
    })
  },

  onShareTap: function(event) {
    var itemList = ['分享给微信好友', '分享到朋友圈', '分享到QQ空间', '分享到微博'];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function(res) {
        console.log(res.tapIndex)
        console.log(itemList[res.tapIndex])
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '这是一个模态弹窗',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },

  onMusicTap: function(event) {
    var postId = this.data.postId;
    var postData = postsData.postList[postId]
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})