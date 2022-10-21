class txt_converter {
    constructor(config) {
        this.cmd_dict_list = [];
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

    encode_cmd(tex) {
        let out_txt = tex;
        let out_dict_list = [];
        // 辞書に登録
        let code_idx = 10000; // 0から始まる連番だと0が省略されてしまうことがある
        for (const ptn of this.cfg.delimiters) {
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
        out_dict_list.reverse();
        return [out_txt, out_dict_list];
    }

    decode_cmd(txt, cmd_dict_list) {
        const regexp = new RegExp(this.encode_smb + '[0-9]{5}', 'ig');
        let out_tex = txt;
        for (const cmd_dict of cmd_dict_list) {
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