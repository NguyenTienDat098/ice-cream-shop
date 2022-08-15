const idProductOrder = '62dd55ed0997b2b6207d4647&62dd57160997b2b6207d4649&62dd56f50997b2b6207d4648&62dd587c0997b2b6207d4658&';
const amountsProductOrder = '1&1&1&2&';
const totalPrices = '9&9&9&18&';
var listIdProductOrder = idProductOrder.split(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
var listAmountsProductOrder = amountsProductOrder.split(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
var listTotalPrices = totalPrices.split(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
const listLength = listIdProductOrder.length - 1;
var products = [];

for (var i = 0; i < listLength; i++) {
	var item = {
		id: listIdProductOrder[i],
		amounts: listAmountsProductOrder[i],
		prices: listTotalPrices[i]
	}
	products.push(item);
}
console.log(products.length);