/* 自定义插件 */
import {RegexList} from '../service/regex'
export default {
	install(Vue){

		/*全局正则表达式合集*/
		Vue.prototype.regex = RegexList

		/* 全局返回上一步 */
		Vue.prototype.back = () => {
			this.$router?this.$router.back():window.history.back()
		}
	}
}