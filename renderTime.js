/**
* @author: 徐勇
* @date: 2022/8/15
* @description: 统计页面加载时间
*/
class countTime{
	// 获取的原始数据
	performanceData = null;
	// 计算之后的数据
	data = null;
	constructor(){
		window.addEventListener('load',this.getTime);
	}
	getTime(){
		let show = console.log;
		if(performance && performance.getEntriesByType){
			const [entry] = performance.getEntriesByType('navigation');
			this.performanceData = entry.toJSON();
		}else{
			return new Error('浏览器版本过低，无法统计渲染时间');
		}
		show && show(this.performanceData);
		const {redirectStart,redirectEnd,fetchStart,domainLookupStart,domainLookupEnd,connectEnd,connectStart,
			responseStart, requestStart,responseEnd,domContentLoadedEventEnd,duration, startTime,domComplete} = this.performanceData;
		this.data = [
			{key: 'Redirect', desc: '网页重定向的耗时', value: redirectEnd - redirectStart},
			{key: 'AppCache', desc: '检查本地缓存的耗时', value: domainLookupStart - fetchStart},
			{key: 'DNS', desc: 'DNS查询的耗时', value: domainLookupEnd - domainLookupStart},
			{key: 'TCP', desc: 'TCP连接的耗时', value: connectEnd - connectStart},
			{key: 'Waiting(TTFB)', desc: '从客户端发起请求到接收到响应的时间 / Time To First Byte', value: responseStart - requestStart},
			{key: 'Content Download', desc: '下载服务端返回数据的时间', value: responseEnd - responseStart},
			{key: 'HTTP Total Time', desc: 'http请求总耗时', value: responseEnd - requestStart},
			{key: 'DOMContentLoaded', desc: 'dom加载完成的时间', value: domContentLoadedEventEnd - startTime},
			{key: 'Loaded', desc: '页面load的总耗时', value: duration || domComplete}
		];
		show && show(this.data);

	}
}
export default countTime;
