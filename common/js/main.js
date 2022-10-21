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

btn1.addEventListener('click', () => {
    const txt = cvtr.tex2trns(ta1.value);
    ta2.value = txt;
});
btn2.addEventListener('click', () => {
    window.open("https://www.deepl.com/translator#en/ja/" + encodeURIComponent(ta2.value.replace(/\//g, "／")));
});
btn3.addEventListener('click', () => {
    const txt = cvtr.trns2tex(ta3.value.replace(/／/g, "/"));
    ta4.value = txt;
});