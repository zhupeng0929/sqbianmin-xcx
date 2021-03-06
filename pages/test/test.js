// text005.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    arrayData: null,
    dialogData: null,
    isDialogShow: true ,
    isScroll: false  

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //构建测试数据
    let data = new Array();
    let dialog = new Array();
    for (let i = 0; i < 10; i++) {
   
      dialog[i] = {
        name: '我是弹窗-' + i,
        isSelected: false
      };
    }
    for (let i = 0; i < 10; i++) {
      data[i] = '我是测试-----------' + i;
      
    }
    this.setData({
      arrayData: data,
      dialogData: dialog
    });
  },

  /**
   * 显示、关闭弹窗
   */
  showDialog: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    console.log('currentStatu:', currentStatu);
    //关闭  
    if (currentStatu == "close") {
      this.setData({
        isDialogShow: false,
        isScroll: true
      });
    }
    // 显示  
    if (currentStatu == "open") {
      this.setData({
        isDialogShow: true,
        isScroll: false
      });
    }
  },


})

