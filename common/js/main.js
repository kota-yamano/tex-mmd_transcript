import { txt_converter, split_text_for_deepl } from "./utility.js";
import config from "./config.js"
import { downloadAsTextFile } from "./file_utility.js";

const ta1 = document.getElementById('txtarea1');
const ta2 = document.getElementById('txtarea2');
const ta3 = document.getElementById('txtarea3');
const ta4 = document.getElementById('txtarea4');
const btn_cp1 = document.getElementById('btn_cp1');
const btn_cp2 = document.getElementById('btn_cp2');
const btn_cp3 = document.getElementById('btn_cp3');
const btn_cp4 = document.getElementById('btn_cp4');
const select1 = document.getElementById('opt_file_select');
// const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
// const radio1 = document.getElementById('radio_opt_free');
// const radio2 = document.getElementById('radio_opt_paid');
const radio3 = document.getElementById('radio_opt_tex');
const radio4 = document.getElementById('radio_opt_mmd');

let cvtr = new txt_converter(config);
let opt_file = select1.value;
cvtr.set_opt_file(opt_file);

ta1.addEventListener('input', () => {
    ta2.value = cvtr.tex2trns(ta1.value);
    const ta2_count = ta2.value.length;
});

ta3.addEventListener('input', () => {
    ta4.value = cvtr.trns2tex(ta3.value.replace(/／/g, "/"));
});

btn_cp1.addEventListener('click', () => {
    navigator.clipboard.writeText(ta1.value);
});

btn_cp2.addEventListener('click', () => {
    navigator.clipboard.writeText(ta2.value);
});

btn_cp3.addEventListener('click', () => {
    navigator.clipboard.writeText(ta3.value);
});

btn_cp4.addEventListener('click', () => {
    navigator.clipboard.writeText(ta4.value);
});

select1.addEventListener('change', () => {
    opt_file = select1.value;
    cvtr.set_opt_file(opt_file);
    ta2.value = cvtr.tex2trns(ta1.value);
    ta3.value = '';
});


btn2.addEventListener('click', () => {
    const txt = ta2.value.replace(/\//g, "／");
    const txt_list = split_text_for_deepl(txt, 5000);
    for (const txt of txt_list) {
        window.open("https://www.deepl.com/translator#en/ja/" + encodeURIComponent(txt));
    }
});
btn3.addEventListener('click', () => {
    window.open("https://www.deepl.com/translator#en/ja/" + encodeURIComponent(ta2.value.replace(/\//g, "／")));
});
btn4.addEventListener('click', () => {
    downloadAsTextFile('result.' + opt_file, ta4.value);
});