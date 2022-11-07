import { txt_converter, split_text_for_deepl, deepcopy } from "./utility.js";
import config from "./config.js"
import { downloadAsTextFile } from "./file_utility.js";

window.onload = function () {
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
    const btn_open = document.getElementById('btn_open_config');
    const btn_save = document.getElementById('btn_save_config');
    const btn_reset = document.getElementById('btn_reset_config');
    const btn_close = document.getElementById('btn_close_config');
    const input_encode_smb = document.getElementById('input_encode_smb');
    const select_opt_inline_eq = document.getElementById('select_opt_inline_eq');
    const select_opt_block_eq = document.getElementById('select_opt_block_eq');

    let cfg_current = JSON.parse(window.localStorage.getItem('config'));
    if (cfg_current === null || cfg_current.version != config.version) {
        cfg_current = deepcopy(config);
    }
    cfg_current.opt_file = select1.value;
    console.log(cfg_current);
    let cfg_tmp = deepcopy(cfg_current);
    let cvtr = new txt_converter(cfg_current);


    ta1.addEventListener('input', () => {
        ta2.value = cvtr.tex2trns(ta1.value);
        const ta2_count = ta2.value.length;
        ta3.value = '';
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
        cfg_current.opt_file = select1.value;
        cfg_tmp.opt_file = select1.value;
        cvtr.set_config(cfg_current);
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
        downloadAsTextFile('result.' + cfg_current.opt_file, ta4.value);
    });

    btn_open.addEventListener('click', () => {
        configDisplay();
    });

    btn_save.addEventListener('click', () => {
        cfg_current = deepcopy(cfg_tmp);
        window.localStorage.setItem('config', JSON.stringify(cfg_current));
        cvtr.set_config(cfg_current);
        ta2.value = cvtr.tex2trns(ta1.value);
        ta3.value = '';
    });

    btn_reset.addEventListener('click', () => {
        cfg_current = deepcopy(config);
        cfg_tmp = deepcopy(config);
        cvtr.set_config(cfg_current);
        configDisplay();
    });

    btn_close.addEventListener('click', () => {
        cfg_tmp = deepcopy(cfg_current);
    });

    input_encode_smb.addEventListener('input', () => {
        cfg_tmp.encode_smb = input_encode_smb.value;
    });

    select_opt_inline_eq.addEventListener('change', () => {
        cfg_tmp.opt_inline_eq = Number(select_opt_inline_eq.value);
    });

    select_opt_block_eq.addEventListener('change', () => {
        cfg_tmp.opt_block_eq = Number(select_opt_block_eq.value);
    });

    function configDisplay() {
        input_encode_smb.value = cfg_tmp.encode_smb;
        select_opt_inline_eq.value = String(cfg_tmp.opt_inline_eq);
        select_opt_block_eq.value = String(cfg_tmp.opt_block_eq);
    };
};