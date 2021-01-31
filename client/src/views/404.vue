<!--
 * @Author: **
 * @Date: 2021-01-31 16:54:28
 * @LastEditTime: 2021-01-31 17:44:45
 * @LastEditors: **
 * @Description: 
 * @FilePath: \fund-management\client\src\views\404.vue
-->
<script>
export default{
  data() {
    return {
      
    }
  },
  created() {
    /*
      script 
      type="text/javascript"
      src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js"
      charset="utf-8"

      "返回腾讯网" 这个超链接的可定制化能力 修改下面两个参数即可
      homePageUrl="http://yoursite.com/yourPage.html"
      homePageName="回到我的主页"
    */
    console.log('404页面')
    let s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = '//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js'
    s.charset = 'utf-8'
    let head = document.getElementsByTagName('head')[0]
    head.appendChild(s)
  }
}
</script>
