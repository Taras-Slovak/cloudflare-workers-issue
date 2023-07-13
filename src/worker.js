// export default {
// 	async fetch(request) {
// 		const response = await fetch(request);
// 		const rewriter = new HTMLRewriter().on("script[src]", {
// 			element(element) {
// 				if (element.hasAttribute('defer') || element.hasAttribute('async')) {
// 					return
// 				} else {
// 					element.setAttribute('defer-test', '');
// 				}
// 			}
// 		});
// 		return rewriter.transform(response);
// 	}
// };


addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
	const response = await fetch(request)
	const rewriter = new HTMLRewriter()
		.on('script[src]', {
			element(element) {
				if (element.hasAttribute('defer') || element.hasAttribute('async')) {
					return
				} else {
					element.setAttribute('defer', '');
					element.setAttribute('set-to-defer', '');
				}
			}
		})
	return rewriter.transform(response);
}
