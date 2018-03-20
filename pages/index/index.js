//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    array: ['请选择', '其他', '招聘', '二手交易', '兼职', '顺风车', '租房', '生活服务'],
    index: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.WxValidate = app.WxValidate(
      {
        content: {
          required: true,

        },
        category: {
          required: true,
          min: 1,
        },
        // ContactNum: {
        //   required: true,

        // },
        // ContactName: {
        //   required: true,
        // }
      }
      , {
        content: {
          required: '请输入要发布的内容',
        },
        category: {
          required: '请选择分类',
          min: '请选择分类',
        },
        // ContactNum:{
        // required: '请输入联系方式',
        // },
        // ContactName: {
        //   required: '请输入联系人',
        // },

      }
    )

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  formSubmit: function (e) {
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        title: `${error.msg} `,
        image: '/images/error.png',
        duration: 2000
      })
      return false
    }
    console.log('form发生了submit事件，携带数据为：', e.detail.value);

    var that = this;


    wx.request({
      // url: 'http://192.168.1.207:9002/api/GetData/AddMessage', //仅为示例，并非真实的接口地址
      url: 'https://api.xiaoni.com/common/advert/addmessage.html?appid=99999999',
      data: {
        NickName: this.data.userInfo.nickName,
        HeadImg: this.data.userInfo.avatarUrl,
        CategoryId: e.detail.value.category - 1,
        Content: e.detail.value.content,
        ContactNum: e.detail.value.ContactNum,
        ContactName: e.detail.value.ContactName,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      success: function (res) {
        if (res.data) {
          wx.redirectTo({
            url: '../home/home'
          })
          console.log(res.data)
        }
        else {
          wx.showToast({
            title: '发布失败',
            image: '/images/error.png',
            duration: 2000
          })
        }
      }
    })




  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})
