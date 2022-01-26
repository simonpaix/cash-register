const currencies = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100]
]

function checkCashRegister(price, cash, cid) {
  let change = [];
  let missingChange = cash - price;
  let unit=cid.length-1;
  let totalInRegister = 0;

  for (let bill in cid) {
    totalInRegister += cid[bill][1];
  }

  if (missingChange > totalInRegister) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
  else if (missingChange == totalInRegister) {
    console.log({ status: "CLOSED", change: cid });
    return { status: "CLOSED", change: cid };
  }
  else {
    // while change is not complete or we haven't exhausted cid options
    while (unit >= 0 && missingChange > 0) {
      if (cid[unit][1] > 0 && missingChange % currencies[unit][1] < missingChange) {

        let availableUnit = cid[unit][1] / currencies[unit][1];
        
        let neededUnit = Math.floor(missingChange / currencies[unit][1]);

        let usedUnit = Math.min(availableUnit, neededUnit);

        let remainder = (missingChange % (usedUnit * currencies[unit][1])).toFixed(2);

        let roundedMissingChange = (missingChange - usedUnit * currencies[unit][1]).toFixed(2);;

        missingChange = Math.max(remainder, roundedMissingChange);

        change.push([cid[unit][0], usedUnit * currencies[unit][1]]);
      }
      unit--;
    }

  if (missingChange > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }
    return { status: "OPEN", change }
  }
}
