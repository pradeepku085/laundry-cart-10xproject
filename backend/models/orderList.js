let s = "shirt:10,0,10,0,5;jeans:10,10,20,0,5";
function stringToObject(s) {
  s = s.split(";");
  for (let i = 0; i < s.length; i++) {
    s[i] = s[i].split(":");
    s[i][1] = s[i][1].split(",");
  }
  let obj = {};
  for (let i = 0; i < s.length; i++) {
    let a = {};
    let price = 0;
    let arr = ["washing", "ironing", "drying", "chemical", "item"];
    for (let j = 0; j < arr.length; j++) {
      let amt = parseInt(s[i][1][j]);
      a[arr[j]] = amt;
      if (arr[j] !== "item") {
        price += amt;
      } else {
        price *= amt;
      }
    }
    a["price"] = price;
    obj[s[i][0]] = a;
  }
  return obj;
}
console.log(stringToObject(s));

/*
output
{
  shirt: {
    washing: 10,
    ironing: 0,
    drying: 10,
    chemical: 0,
    item: 5,
    price: 100
  },
  jeans: {
    washing: 10,
    ironing: 10,
    drying: 20,
    chemical: 0,
    item: 5,
    price: 200
  }
}
*/
