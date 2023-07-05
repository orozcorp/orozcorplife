import _ from "lodash";
import numeral from "numeral";
import moment from "moment-timezone";

export function userName(userProfile) {
  return `${userProfile.nombre} ${userProfile.apellido}`;
}
export function format_money(value) {
  return _.isNumber(value) ? numeral(value).format("$0,0.00") : "$0.00";
}
export function format_qty(value) {
  return _.isNumber(value) ? numeral(value).format("0,0") : "0";
}
export function format_date(value) {
  return moment(value).format("DD/MMM/YY");
}
export function format_dateMed(value) {
  return moment(value).format("ddd-DD/MMM/YY");
}
export function format_date_month(value) {
  return moment(value).format("MMM/YY");
}
export function format_dateUnix(value) {
  return moment.unix(value).format("MMM/DD/YY");
}
export function dateInputLocalFormat(value) {
  return moment(value).format("YYYY-MM-DDTHH:mm");
}
export function dateInputFormatUnix(value) {
  return moment
    .unix(Number(value))

    .format("YYYY-MM-DD");
}
export function format_dateHr(value) {
  return moment(value).format("DD/MMM/YY - HH:mm");
}
export function format_hour(value) {
  return moment(value).format("HH:mm");
}
export function buildRegExp(searchText) {
  const words = searchText.trim().split(/[ \-\:]+/);
  const exps = words.map((word) => {
    return "(?=.*" + word + ")";
  });
  const fullExp = exps.join("") + ".+";
  return new RegExp(fullExp, "i");
}
export function checkPhone(number, setAlert, setNumber) {
  if (number.length !== 10) {
    return setAlert({
      message: "Los telefonos deben ser de 10 digitos",
      display: "box",
      variant: "orange",
    });
  }
  if (phone(number, "MX")[0]) {
    return setNumber(phone(number, "MX")[0].slice(1, 13));
  } else {
    return setAlert({
      message: "Revisa el telefono",
      display: "box",
      variant: "orange",
    });
  }
}
export function dateInputFormat(value) {
  return moment(value).format("YYYY-MM-DD");
}
export function regExSearch(toSearch) {
  if (toSearch === "") {
    return;
  }
  const words = toSearch.trim().split(/[ \-\:]+/);
  const exps = words.map((word) => {
    return "(?=.*" + word + ")";
  });
  const fullExp = exps.join("") + ".+";
  return new RegExp(fullExp, "i");
}

export function calculateAge(birthdate) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  const months = (today.getMonth() + 12 - birthDate.getMonth()) % 12;
  return { years: age, months: months };
}

export const styleReactSelect = {
  control: (base, state) => ({
    ...base,
    minHeight: "50px",
    minWidth: "200px",
    marginTop: "6px",
    border: "1px solid #000",
    boxShadow: "none",
  }),
};
