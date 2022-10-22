const installments = require("../src/index");

function generateDatesByInterval(n, interval, initialDate, skipInitial) {
  const date = new Date(initialDate);

  date.setHours(0, 0, 0, 0);
  const arr = [];
  let d = new Date(date);
  for (let i = 0; i < n; i++) {
    if (skipInitial) {
      d = new Date(d);
      d.setDate(d.getDate() + interval);
      arr.push({ due: d });
    } else {
      arr.push({ due: d });
      d = new Date(d);
      d.setDate(d.getDate() + interval);
    }
  }
  return arr;
}

function generateDatesMonthly(n, initialDate, skipInitial) {
  const date = new Date(initialDate);

  date.setHours(0, 0, 0, 0);
  const arr = [];
  let d = new Date(date);
  for (let i = 0; i < n; i++) {
    if (skipInitial) {
      d = new Date(d);
      d.setMonth(d.getMonth() + 1);
      arr.push({ due: d });
    } else {
      arr.push({ due: d });
      d = new Date(d);
      d.setMonth(d.getMonth() + 1);
    }
  }
  return arr;
}

test("index.js exports a function", () => {
  expect(installments).toBeInstanceOf(Function);
});

test("basic installment round down", () => {
  let installment = generateDatesByInterval(3, 30, new Date(), true);
  installment = installment.map((i) => ({ ...i, value: 33.33 }));

  expect(installments(100, 3, {})).toEqual(installment);
});

test("basic installment spread begin", () => {
  let installment = generateDatesByInterval(7, 30, new Date(), true);
  installment = installment.map((inst, j) => ({
    ...inst,
    value: j < 4 ? 14.29 : 14.28,
  }));

  expect(installments(100, 7, { roundMode: "SPREAD_BEGIN" })).toEqual(
    installment
  );
});

test("basic installment spread end", () => {
  let installment = generateDatesByInterval(7, 30, new Date(), true);
  installment = installment.map((inst, j) => ({
    ...inst,
    value: j > 2 ? 14.29 : 14.28,
  }));

  expect(installments(100, 7, { roundMode: "SPREAD_END" })).toEqual(
    installment
  );
});

test("basic installment monthly", () => {
  let installment = generateDatesMonthly(7, new Date(), true);
  installment = installment.map((inst, j) => ({
    ...inst,
    value: j > 2 ? 14.29 : 14.28,
  }));

  expect(
    installments(100, 7, {
      roundMode: "SPREAD_END",
      dueDateMode: "FIXED_DAY_OF_MONTH",
    })
  ).toEqual(installment);
});
