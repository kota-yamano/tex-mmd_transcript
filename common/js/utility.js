export class txt_converter {
    constructor(config) {
        this.cmd_dict = {};
        this.tex_raw = '';
        this.txt_before = '';
        this.txt_after = '';
        this.tex_proc = '';
        this.cfg = config;
    }
    preproc_tex(tex, old_sub_str_list, new_sub_str, del_str_list = []) {
        let out_tex = tex;
        for (const old_sub_str of old_sub_str_list) {
            const regexp = new RegExp(old_sub_str, 'g');
            out_tex = out_tex.replace(regexp, new_sub_str);
        }
        if (del_str_list.length > 0) {
            for (const del_str of del_str_list) {
                const regexp = new RegExp(del_str, 'g');
                out_tex = out_tex.replace(regexp, '');
            }
        }
        return out_tex;
    }

    // postproc_tex(tex) {
    //     let out_tex = tex;
    //     for (const pair of this.cfg[this.cfg.opt_file].postproc_subpairs) {
    //         const regexp = new RegExp(pair[0], 'g');
    //         out_tex = out_tex.replace(regexp, pair[1]);
    //     }
    //     return out_tex;
    // }

    encode_cmd(tex) {
        let out_txt = tex;
        // 辞書に登録
        let code_idx = 10 ** (this.cfg.encode_digits_num - 1); // 0から始まる連番だと0が省略されてしまうことがある
        let cmd_dict = {};
        for (const ptn of this.cfg[this.cfg.opt_file].delimiters) {
            if (Array.isArray(ptn)) {
                let cmd_list = [];
                let cmd_dict_tmp = {};
                const regexp_start = new RegExp(ptn[0], 'g');
                const regexp_end = new RegExp(ptn[1], 'g');
                for (const cmd_obj of out_txt.matchAll(regexp_start)) {
                    cmd_obj.type = 'start';
                    cmd_list.push(cmd_obj);
                }
                for (const cmd_obj of out_txt.matchAll(regexp_end)) {
                    cmd_obj.type = 'end';
                    cmd_list.push(cmd_obj);
                }
                cmd_list.sort((a, b) => a.index - b.index);

                let cmd_start = [];
                let nest_num = 0;
                let cmd_start_list = [];
                let cmd_end_list = [];
                for (let i = 0; i < cmd_list.length; i++) {
                    const cmd_obj = cmd_list[i];
                    if (nest_num > 0) {
                        if (cmd_start[1] === cmd_obj[1]) {
                            if (cmd_obj.type === 'start') {
                                nest_num = nest_num + 1;
                            }
                            if (cmd_obj.type === 'end') {
                                nest_num = nest_num - 1;
                                if (nest_num === 0) {
                                    cmd_start_list.push(cmd_start);
                                    cmd_end_list.push(cmd_obj);
                                }
                            }
                        }
                    }
                    else {
                        if (cmd_obj.type === 'start') {
                            nest_num = nest_num + 1;
                            cmd_start = cmd_obj;
                        }
                        else {
                            console.log('missing \\begin{} cmd of ' + cmd_obj[0] + ' (idx: ' + cmd_obj.index + ').');
                        }
                    }
                }
                for (let i = 0; i < cmd_start_list.length; i++) {
                    let cmd_all_obj = [];
                    const cmd_start = cmd_start_list[i];
                    const cmd_end = cmd_end_list[i];
                    const code = this.cfg.encode_delimiter_left +  this.cfg.encode_smb + code_idx.toString() + this.cfg.encode_delimiter_right;
                    code_idx = code_idx + 1;
                    cmd_all_obj[0] = out_txt.slice(cmd_start.index, cmd_end.index + cmd_end[0].length);
                    cmd_all_obj.index = cmd_start.index;
                    cmd_dict_tmp[code] = cmd_all_obj;
                }
                // 後方からコードに置き換え
                for (const code in this.flip_dict(cmd_dict_tmp)) {
                    const cmd_obj = cmd_dict_tmp[code];
                    out_txt = out_txt.slice(0, cmd_obj.index) + code + out_txt.slice(cmd_obj.index + cmd_obj[0].length);
                }
                cmd_dict = Object.assign(cmd_dict, cmd_dict_tmp);

            }
            else {
                let cmd_dict_tmp = {};
                const regexp = new RegExp(ptn, 'g');
                for (const cmd_obj of out_txt.matchAll(regexp)) {
                    let cmd_all_obj = [];
                    const code = this.cfg.encode_delimiter_left + this.cfg.encode_smb + code_idx.toString() + this.cfg.encode_delimiter_right;
                    code_idx = code_idx + 1;
                    cmd_all_obj[0] = cmd_obj[0];
                    cmd_all_obj.index = cmd_obj.index;
                    cmd_dict_tmp[code] = cmd_all_obj;
                    // console.log(regexp);
                }
                // 後方からコードに置き換え
                for (const code in this.flip_dict(cmd_dict_tmp)) {
                    const cmd_obj = cmd_dict_tmp[code];
                    out_txt = out_txt.slice(0, cmd_obj.index) + code + out_txt.slice(cmd_obj.index + cmd_obj[0].length);
                }
                cmd_dict = Object.assign(cmd_dict, cmd_dict_tmp);
            }
        }
        return [out_txt, cmd_dict];
    }

    decode_cmd(txt, command_dict) {
        // 大文字と小文字を区別せずに置き換え符号をマッチ
        const regexp = new RegExp(this.cfg.encode_smb + '[0-9]{' + this.cfg.encode_digits_num.toString() + '}', 'ig');
        let out_tex = txt;
        let cmd_dict = deepcopy(command_dict);
        while (Object.keys(cmd_dict).length) {
            let code_obj_list = []
            for (const code_obj of out_tex.matchAll(regexp)) {
                code_obj_list.push(code_obj)
            }
            if (code_obj_list.length === 0) {
                console.log("some codes are missing:");
                console.log(cmd_dict);
                break;
            }
            code_obj_list.reverse()
            for (const code_obj of code_obj_list) {
                const code = code_obj[0].toUpperCase();
                if (code in command_dict) {
                    const cmd = command_dict[code][0];
                    out_tex = out_tex.slice(0, code_obj.index) + cmd + out_tex.slice(code_obj.index + code_obj[0].length);
                    if (code in cmd_dict) {
                        delete cmd_dict[code];
                    }
                    else {
                        console.log("code: " + code + " appears more than once.");
                    }
                }
                else {
                    console.log("code: " + code + " is invalid.");
                    out_tex = out_tex.slice(0, code_obj.index) + "(unknown command)" + out_tex.slice(code_obj.index + code_obj[0].length);
                }
            }
        }
        return out_tex;
    }

    flip_dict(obj) {
        let array = Object.keys(obj).map((k) => ({ key: k, value: obj[k] }));
        array.reverse();
        let out_obj = Object.assign({}, ...array.map((item) => ({
            [item.key]: item.value,
        })));
        return out_obj;
    }

    // 全角英数字，記号を半角に直す
    zen2han(str) {
        str = str.replace(/[Ａ-Ｚａ-ｚ０-９！-／：-＠［-｀｛-～]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
        str = str.replace('、', '，');
        str = str.replace('。', '．');
        return str
    }

    tex2trns(tex) {
        this.tex_raw = tex;
        let tex_tmp = this.zen2han(this.tex_raw);
        if (this.cfg.opt_block_eq >= 0) {
            tex_tmp = this.preproc_tex(tex_tmp, this.cfg.block_eq_delimiters, this.cfg.block_eq_subs[this.cfg.opt_block_eq], this.cfg.block_eq_delete);
        }
        if (this.cfg.opt_inline_eq >= 0) {
            tex_tmp = this.preproc_tex(tex_tmp, this.cfg.inline_eq_delimiters, this.cfg.inline_eq_subs[this.cfg.opt_inline_eq]);
        }
        [this.txt_before, this.cmd_dict_list] = this.encode_cmd(tex_tmp);
        return this.txt_before;
    }

    trns2tex(txt) {
        this.txt_after = this.zen2han(txt);
        this.tex_proc = this.decode_cmd(this.txt_after, this.cmd_dict_list);
        return this.tex_proc;
    }

    set_config(cfg) {
        this.cfg = deepcopy(cfg);
    }
}

export function split_text_for_deepl(txt, char_limit) {
    const strings = txt.split(/(?<=([\s\S]*?[.．。](\s*?)\n))/g);
    let out_list = [];
    let str_tmp = '';
    for (const str_iter of strings) {
        if (str_tmp.length + str_iter.length > char_limit) {
            out_list.push(str_tmp);
            str_tmp = str_iter;
        }
        else {
            str_tmp = str_tmp + str_iter
        }
    }
    out_list.push(str_tmp);

    return out_list;
}

export function deepcopy(obj) {
    let copy_obj = JSON.parse(JSON.stringify(obj));
    return copy_obj;
}