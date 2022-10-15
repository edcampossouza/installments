const installments = require("../src/index");

test("index.js exports a function", () => {
  expect(installments).toBeInstanceOf(Function);
});

test("basic installment 1", () => {
  let date1 = new Date(),
    date2 = new Date(),
    date3 = new Date();
  date1.setDate(date1.getDate() + 30);
  date2.setDate(date2.getDate() + 60);
  date3.setDate(date3.getDate() + 90);
  expect(installments(100, 3, {})).toEqual([
    { value: 33.33, due: date1 },
    { value: 33.33, due: date2 },
    { value: 33.33, due: date3 },
  ]);
});

test("basic installment 2", () => {
  let date1 = new Date(),
    date2 = new Date(),
    date3 = new Date(),
    date4 = new Date(),
    date5 = new Date(),
    date6 = new Date(),
    date7 = new Date();
  date1.setDate(date1.getDate() + 30);
  date2.setDate(date2.getDate() + 60);
  date3.setDate(date3.getDate() + 90);
  date4.setDate(date4.getDate() + 120);
  date5.setDate(date5.getDate() + 150);
  date6.setDate(date6.getDate() + 180);
  date7.setDate(date7.getDate() + 210);
  expect(installments(100, 7, {})).toEqual([
    { value: 14.28, due: date1 },
    { value: 14.28, due: date2 },
    { value: 14.28, due: date3 },
    { value: 14.28, due: date4 },
    { value: 14.28, due: date5 },
    { value: 14.28, due: date6 },
    { value: 14.28, due: date7 },
  ]);
});

test("basic installment round up 1", () => {
  let date1 = new Date(),
    date2 = new Date(),
    date3 = new Date(),
    date4 = new Date(),
    date5 = new Date(),
    date6 = new Date(),
    date7 = new Date();
  date1.setDate(date1.getDate() + 30);
  date2.setDate(date2.getDate() + 60);
  date3.setDate(date3.getDate() + 90);
  date4.setDate(date4.getDate() + 120);
  date5.setDate(date5.getDate() + 150);
  date6.setDate(date6.getDate() + 180);
  date7.setDate(date7.getDate() + 210);
  expect(installments(100, 7, { roundMode: "ROUND_UP" })).toEqual([
    { value: 14.29, due: date1 },
    { value: 14.29, due: date2 },
    { value: 14.29, due: date3 },
    { value: 14.29, due: date4 },
    { value: 14.29, due: date5 },
    { value: 14.29, due: date6 },
    { value: 14.29, due: date7 },
  ]);
});

test("basic round up 2", () => {
  let date1 = new Date(),
    date2 = new Date(),
    date3 = new Date();
  date1.setDate(date1.getDate() + 30);
  date2.setDate(date2.getDate() + 60);
  date3.setDate(date3.getDate() + 90);
  expect(installments(100, 3, { roundMode: "ROUND_UP" })).toEqual([
    { value: 33.34, due: date1 },
    { value: 33.34, due: date2 },
    { value: 33.34, due: date3 },
  ]);
});

test("basic round up 2 and custom interval", () => {
  let date1 = new Date(),
    date2 = new Date(),
    date3 = new Date();
  date1.setDate(date1.getDate() + 1);
  date2.setDate(date2.getDate() + 2);
  date3.setDate(date3.getDate() + 3);
  expect(
    installments(100, 3, { roundMode: "ROUND_UP", daysBetweenInstallments: 1 })
  ).toEqual([
    { value: 33.34, due: date1 },
    { value: 33.34, due: date2 },
    { value: 33.34, due: date3 },
  ]);
});

test("spread_begin 1", () => {
  let date1 = new Date(),
    date2 = new Date(),
    date3 = new Date();
  date4 = new Date();
  date1.setDate(date1.getDate() + 1);
  date2.setDate(date2.getDate() + 2);
  date3.setDate(date3.getDate() + 3);
  date4.setDate(date4.getDate() + 4);
  expect(
    installments(100.03, 4, {
      roundMode: "SPREAD_BEGIN",
      daysBetweenInstallments: 1,
    })
  ).toEqual([
    { value: 25.01, due: date1 },
    { value: 25.01, due: date2 },
    { value: 25.01, due: date3 },
    { value: 25, due: date4 },
  ]);
});

test("spread _begin 2", () => {
  let date1 = new Date(),
    date2 = new Date(),
    date3 = new Date();
  date1.setDate(date1.getDate() + 1);
  date2.setDate(date2.getDate() + 2);
  date3.setDate(date3.getDate() + 3);
  expect(
    installments(100, 3, {
      roundMode: "SPREAD_BEGIN",
      daysBetweenInstallments: 1,
    })
  ).toEqual([
    { value: 33.34, due: date1 },
    { value: 33.33, due: date2 },
    { value: 33.33, due: date3 },
  ]);
});

test("spread _begin  7", () => {
  let date1 = new Date(),
    date2 = new Date(),
    date3 = new Date(),
    date4 = new Date(),
    date5 = new Date(),
    date6 = new Date(),
    date7 = new Date();
  date1.setDate(date1.getDate() + 30);
  date2.setDate(date2.getDate() + 60);
  date3.setDate(date3.getDate() + 90);
  date4.setDate(date4.getDate() + 120);
  date5.setDate(date5.getDate() + 150);
  date6.setDate(date6.getDate() + 180);
  date7.setDate(date7.getDate() + 210);
  expect(installments(100, 7, { roundMode: "SPREAD_BEGIN" })).toEqual([
    { value: 14.29, due: date1 },
    { value: 14.29, due: date2 },
    { value: 14.29, due: date3 },
    { value: 14.29, due: date4 },
    { value: 14.28, due: date5 },
    { value: 14.28, due: date6 },
    { value: 14.28, due: date7 },
  ]);
});

test("spread _beg_endin  7", () => {
    let date1 = new Date(),
      date2 = new Date(),
      date3 = new Date(),
      date4 = new Date(),
      date5 = new Date(),
      date6 = new Date(),
      date7 = new Date();
    date1.setDate(date1.getDate() + 30);
    date2.setDate(date2.getDate() + 60);
    date3.setDate(date3.getDate() + 90);
    date4.setDate(date4.getDate() + 120);
    date5.setDate(date5.getDate() + 150);
    date6.setDate(date6.getDate() + 180);
    date7.setDate(date7.getDate() + 210);
    expect(installments(100, 7, { roundMode: "SPREAD_END" })).toEqual([
      { value: 14.28, due: date1 },
      { value: 14.28, due: date2 },
      { value: 14.28, due: date3 },
      { value: 14.29, due: date4 },
      { value: 14.29, due: date5 },
      { value: 14.29, due: date6 },
      { value: 14.29, due: date7 },
    ])
  });

//TODO:
//SPREAD_BEGIN; SPREAD_END; JOIN_BEGIN; JOIN_END
//TODO: ELIMINATE HH:MM:SS
//TODO: NUMBER OF CENTS < NUMBER OF INSTALLMENTS
