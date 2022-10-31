const config = {
    preproc_subpairs: [
        [/\$\$([\s\S]+?)\$\$/g, '\\begin{align}$1\\end{align}'],
        [/\\\[([\s\S]+?)\\\]/g, '\\begin{align}$1\\end{align}'],
        [/\\begin\{equation\}([\s\S]+?)\\end\{equation\}/g, '\\begin{align}$1\\end{align}'],
        [/\\begin\{equation\*\}([\s\S]+?)\\end\{equation\*\}/g, '\\begin{align}$1\\end{align}'],
        [/\\begin\{align\*\}([\s\S]+?)\\end\{align\*\}/g, '\\begin{align}$1\\end{align}'],
        [/\\begin\{aligned\}[\s]*/g, ''],
        [/\\end\{aligned\}[\s]*/g, ''],
        [/\\\(([\s\S]+?)\\\)/g, '$$$1$$'],
    ],
    postproc_subpairs: [

    ],
    delimiters: [
        /\\\$/g,
        /\$([\s\S]+?)\$/g,
        /\\begin\{abstract\}/g,
        /\\end\{abstract\}/g,
        /\\begin\{document\}/g,
        /\\end\{document\}/g,
        /\\section\{REFERENCES\}[\s\S]*/ig,
        [/\\begin\{([\s\S]+?)\}(\[[\s\S]+?\]|\{[\s\S]+?\})*/g, /\\end\{([\s\S]+?)\}/g],
        /\\[^\{\[\s]*(\[[\s\S]+?\]|\{[\s\S]+?\})+/g,
        /\!\[\]\(.+?\)/g, // mmd
        [/<(smiles)>/g, /<\\(smiles)>/g], //mmd
    ],
    encode_smb: 'TCMD'
}

export default config;