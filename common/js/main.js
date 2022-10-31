import txt_converter from "./utility.js"
import config from "./config.js"

const ta1 = document.getElementById('txtarea1');
const ta2 = document.getElementById('txtarea2');
const ta3 = document.getElementById('txtarea3');
const ta4 = document.getElementById('txtarea4');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');

let cvtr = new txt_converter(config);

ta1.addEventListener('input', () => {
    ta2.value = cvtr.tex2trns(ta1.value);
    const ta2_count = ta2.value.length;
});

ta3.addEventListener('input', () => {
    ta4.value = cvtr.trns2tex(ta3.value.replace(/／/g, "/"));
});

btn1.addEventListener('click', () => {
    navigator.clipboard.writeText(ta2.value);
});
btn2.addEventListener('click', () => {
    window.open("https://www.deepl.com/translator#en/ja/" + encodeURIComponent(ta2.value.replace(/\//g, "／")));
});
btn3.addEventListener('click', () => {
    navigator.clipboard.writeText(ta4.value);
});