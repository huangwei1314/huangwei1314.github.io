function reward(){
  Swal.fire({
    title: '<strong>您正在为 <u>遇见一城/u> 充电</strong>',
    html: '<b>请选择您的付款方式</b>',
    icon: 'info',
    showCancelButton: true,
    confirmButtonText:
      '<i class="fa-brands fa-alipay"></i> 支付宝',
    cancelButtonText:
      '<i class="fa-brands fa-weixin"></i> 微信支付',
    confirmButtonColor: '#1677FF',
    cancelButtonColor: '#2AAE67',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: '感谢您',
        html: '请打开支付宝 <b>[扫一扫]</b> 以充电',
        imageUrl: 'https://yife68.gitee.io/icat-pic-2022/03/19/alipay.jpg',
        imageWidth: 175,
        imageHeight: 175,
        imageAlt: 'Custom image'
      }).then((result) => {
        Swal.fire(
          '充电成功',
          '感谢您的支持',
          'success'
        )
      })
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire({
        title: '感谢您',
        html: '请打开微信 <b>[扫一扫]</b> 以充电',
        imageUrl: 'https://yife68.gitee.io/icat-pic-2022/03/19/wechat.jpg',
        imageWidth: 175,
        imageHeight: 175,
        imageAlt: 'Custom image'
      }).then((result) => {
        Swal.fire(
          '充电成功',
          '感谢您的支持',
          'success'
        )
      })
    }
  })
}