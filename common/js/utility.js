class txt_converter {
    constructor(config) {
        this.cmd_dict = {};
        this.tex_raw = '';
        this.txt_before = '';
        this.txt_after = '';
        this.tex_proc = '';
        this.cfg = config;
        this.encode_smb = config["encode_smb"];
    }
    // TODO subpairsを適切に変換
    preproc_tex(tex) {
        let out_tex = tex;
        for (const pair of this.cfg.preproc_subpairs) {
            const regexp = new RegExp(pair[0]);
            out_tex = out_tex.replace(regexp, pair[1]);
        }
        return out_tex;
    }

    postproc_tex(tex) {
        let out_tex = tex;
        for (const pair of this.cfg.postproc_subpairs) {
            const regexp = new RegExp(pair[0]);
            out_tex = out_tex.replace(regexp, pair[1]);
        }
        return out_tex;
    }

    /* encode_cmd(tex) {
        let out_txt = tex;
        let out_dict_list = [];
        // 辞書に登録
        let code_idx = 10000; // 0から始まる連番だと0が省略されてしまうことがある
        for (const ptn of this.cfg.delimiters) {
            if (Array.isArray(ptn)) {

            }
            else {
                let cmd_dict = {};
                const regexp = new RegExp(ptn);
                for (const cmd_obj of out_txt.matchAll(regexp)) {
                    const code = this.encode_smb + code_idx.toString().padStart(5, '0');
                    code_idx = code_idx + 1;
                    cmd_dict[code] = cmd_obj;
                }
                cmd_dict = this.flip_dict(cmd_dict);
                out_dict_list.push(cmd_dict);
                // コードに置き換え
                for (const code in cmd_dict) {
                    const cmd_obj = cmd_dict[code];
                    out_txt = out_txt.slice(0, cmd_obj.index) + code + out_txt.slice(cmd_obj.index + cmd_obj[0].length);
                }
            }
        }
        out_dict_list.reverse();
        return [out_txt, out_dict_list];
    } */
    encode_cmd(tex) {
        let out_txt = tex;
        // 辞書に登録
        let code_idx = 10000; // 0から始まる連番だと0が省略されてしまうことがある
        let cmd_dict = {};
        for (const ptn of this.cfg.delimiters) {
            if (Array.isArray(ptn)) {
                let cmd_list = [];
                let cmd_dict_tmp = {};
                const regexp_start = ptn[0];
                const regexp_end = ptn[1];
                for (const cmd_obj of out_txt.matchAll(regexp_start)) {
                    cmd_obj.type = 'start';
                    cmd_list.push(cmd_obj);
                }
                for (const cmd_obj of out_txt.matchAll(regexp_end)) {
                    cmd_obj.type = 'end';
                    cmd_list.push(cmd_obj);
                }
                cmd_list.sort((a, b) => a.index - b.index);
                console.log(cmd_list);

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
                    const code = this.encode_smb + code_idx.toString().padStart(5, '0');
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
                const regexp = new RegExp(ptn);
                for (const cmd_obj of out_txt.matchAll(regexp)) {
                    const code = this.encode_smb + code_idx.toString().padStart(5, '0');
                    code_idx = code_idx + 1;
                    cmd_dict_tmp[code] = cmd_obj;
                }
                // 後方からコードに置き換え
                for (const code in this.flip_dict(cmd_dict_tmp)) {
                    const cmd_obj = cmd_dict_tmp[code];
                    out_txt = out_txt.slice(0, cmd_obj.index) + code + out_txt.slice(cmd_obj.index + cmd_obj[0].length);
                }
                cmd_dict = Object.assign(cmd_dict, cmd_dict_tmp);
            }
        }
        console.log(cmd_dict);
        return [out_txt, cmd_dict];
    }

    decode_cmd(txt, cmd_dict) {
        const regexp = new RegExp(this.encode_smb + '[0-9]{5}', 'ig');
        let out_tex = txt;
        /*         for (const cmd_dict of cmd_dict_list) {
                    let code_obj_list = []
                    for (const code_obj of out_tex.matchAll(regexp)) {
                        code_obj_list.push(code_obj)
                    }
                    code_obj_list.reverse()
                    for (const code_obj of code_obj_list) {
                        const code = code_obj[0];
                        if (code in cmd_dict) {
                            const cmd = cmd_dict[code][0];
                            out_tex = out_tex.slice(0, code_obj.index) + cmd + out_tex.slice(code_obj.index + code_obj[0].length);
                        }
                    }
                } */
        while (true) {
            let code_obj_list = []
            for (const code_obj of out_tex.matchAll(regexp)) {
                code_obj_list.push(code_obj)
            }
            if (code_obj_list.length === 0) { break; }
            code_obj_list.reverse()
            for (const code_obj of code_obj_list) {
                const code = code_obj[0];
                if (code in cmd_dict) {
                    const cmd = cmd_dict[code][0];
                    out_tex = out_tex.slice(0, code_obj.index) + cmd + out_tex.slice(code_obj.index + code_obj[0].length);
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

    zen2han(str) {
        return str.replace(/[！-～]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
    }

    tex2trns(tex) {
        this.tex_raw = this.zen2han(tex);
        [this.txt_before, this.cmd_dict_list] = this.encode_cmd(this.preproc_tex(this.tex_raw));
        return this.txt_before;
    }

    trns2tex(txt) {
        this.txt_after = txt;
        this.tex_proc = this.postproc_tex(this.decode_cmd(this.txt_after, this.cmd_dict_list));
        return this.tex_proc;
    }
}

export default txt_converter;