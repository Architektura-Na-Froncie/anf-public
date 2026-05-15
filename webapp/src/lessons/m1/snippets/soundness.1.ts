interface Original {
  prop: number;
}
interface Widened {
  prop: number | string;
}

let orig: Original = { prop: 125 }
let ref: Widened = orig; // 💀
ref.prop = "ale lipa";

// unsound
let prop: number = orig.prop; // 🚨 False Negative
orig.prop.toFixed(0); // 🚨 False Negative
