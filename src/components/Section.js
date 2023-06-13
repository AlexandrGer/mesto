export class Section {
	constructor({ /*items,*/ renderer }, selector) {
		// this._renderedItems = items;
		this._renderer = renderer;

		this._container = selector;
	}

	renderItems(res) {
		/*this._renderedItems*/res.forEach(item => this._renderer(item))
		// res.forEach(this._renderer)
	}

	addItem(element) {
		this._container.append(element);
	}

	addNewItem(element) {
		this._container.prepend(element)
	}
}