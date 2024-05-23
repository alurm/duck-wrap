input.addEventListener('keydown', async (event) => {
	if (event.key == 'Enter') {
		if (input.value !== '') {
			var network_response = await fetch(
				`https://html.duckduckgo.com/html/?q=${encodeURIComponent(input.value)}`,
				{'redirect': 'follow'}
			)

			let text = await network_response.text()

			let parser = new DOMParser()

			let HTML = parser.parseFromString(text, 'text/html')

			window.HTML = HTML

			let results = HTML.querySelectorAll('.result__body')

			let children = []

			for (let result of results) {
				let anchor = result.querySelector('.result__a')

				let title_view = document.createElement('H3')
				title_view.textContent = anchor.textContent
				children.push(title_view)

				let link
				{
					link = new URL(anchor.href).searchParams.get('uddg')
					let link_view = document.createElement('A')
					link_view.textContent = link
					link_view.href = link
					let P = document.createElement('P')
					P.appendChild(link_view)
					children.push(P)
				}

				let description = result.querySelector('.result__snippet').textContent
				let description_view = document.createElement('P')
				description_view.textContent = description
				children.push(description_view)
			}

			view.replaceChildren(...children)
		}
	}
})
