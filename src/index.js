function installments(principal, n, options) {
  const roundMode = options.roundMode || "ROUND_DOWN";
  const initialDate = options.initialDate || new Date();
  const daysBetweenInstallments = options.daysBetweenInstallments || 30;
  const dueDateMode = options.dueDateMode || "FIXED_INTERVAL";

  initialDate.setHours(0, 0, 0, 0);
  const centsPerUnit = 100;
  let installmentValue;
  switch (roundMode) {
    case "ROUND_DOWN":
    case "SPREAD_BEGIN":
    case "SPREAD_END":
      installmentValue =
        Math.floor((principal * centsPerUnit) / n) / centsPerUnit;
      break;
    case "ROUND_UP":
      installmentValue =
        Math.ceil((principal * centsPerUnit) / n) / centsPerUnit;
      break;
    default:
      return "NOT IMPLEMENTED";
  }
  let residual = Math.round((principal - n * installmentValue) * centsPerUnit);

  let ret = [];
  if (dueDateMode === "FIXED_INTERVAL") {
    let date = initialDate;
    date.setDate(date.getDate() + daysBetweenInstallments);
    for (let i = 0; i < n; i++) {
      ret.push({
        value: installmentValue,
        due: new Date(date),
      });
      date.setDate(date.getDate() + daysBetweenInstallments);
    }
  } else if (dueDateMode === "FIXED_DAY_OF_MONTH") {
    let date = initialDate;
    date.setMonth(date.getMonth() + 1);
    for (let i = 0; i < n; i++) {
      ret.push({
        value: installmentValue,
        due: new Date(date),
      });
      date.setMonth(date.getMonth() + 1);
    }
  } else return "NOT IMPLEMENTED";
  if (roundMode === "SPREAD_BEGIN") {
    let i = 0;
    while (residual > 0) {
      residual -= 1;
      ret[i].value = Math.round(ret[i].value * centsPerUnit + 1) / centsPerUnit;
      i++;
    }
  } else if (roundMode === "SPREAD_END") {
    let i = ret.length - 1;
    while (residual > 0) {
      residual -= 1;
      ret[i].value = Math.round(ret[i].value * centsPerUnit + 1) / centsPerUnit;
      i--;
    }
  }
  return ret;
}

module.exports = installments;
