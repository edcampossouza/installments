function installments(principal, n, options) {
  const roundMode = options.roundMode || "ROUND_DOWN";
  const initialDate = options.initialDate || new Date();
  const daysBetweenInstallments = options.daysBetweenInstallments || 30;
  const dueDateMode = options.dueDateMode || "FIXED_INTERVAL";

  const centsPerUnit = 100;
  let installmentValue;
  switch (roundMode) {
    case "ROUND_DOWN":
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
  const residual = principal - n * installmentValue;

  if (dueDateMode === "FIXED_INTERVAL") {
    let ret = [];
    let date = initialDate;
    date.setDate(date.getDate() + daysBetweenInstallments);
    for (let i = 0; i < n; i++) {
      ret.push({
        value: installmentValue,
        due: new Date(date),
      });
      date.setDate(date.getDate() + daysBetweenInstallments);
    }
    return ret;
  } else return "NOT IMPLEMENTED";
}

module.exports = installments;
