const stratford = {
    pharmacies: [
      {
        name: "Osbon Pharmacy",
        website: "http://www.osbonpharmacy.co.uk",
        phone: "020 8555 9188 ",
        address: "54 The Mall, The Stratford Centre, London, E15 1XE"
      },
      {
        name: "Boots UK",
        website: "http://www.boots.com",
        phone: "020 8221 2495 ",
        address: "31-34, The Arcarde Lower Ground Floor, London, E20 1EH"
      }
    ],
};

const req = {
    params: {
        city: "stratford",
        category: "pharmacies",
    }
}

// THE END GOAL:
console.log(stratford.pharmacies)
// correctly returns just the pharmacies array

// but DONE DYNAMICALLY using REQ.PARAMS.CITY and REQ.PARAMS.CATEGORY

console.log(req.params)
// { city: 'stratford', category: 'pharmacies' }
console.log(req.params.city);
// stratford
console.log(req.params.category);
// pharmacies
console.log(req.params.city[req.params.category]);
// undefined
// i know the first part evaluates to a "stratford"["pharmacies"]
// which is why this doesn't work^

console.log(eval(req.params.city)[req.params.category])
// this works but i don't want to use EVAL()