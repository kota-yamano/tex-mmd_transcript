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
        [/\\\$/g, 'dollars'],
    ],
    postproc_subpairs: [

    ],
    delimiters: [
        /\$([\s\S]+?)\$/g,
        /\\begin\{align\}([\s\S]+?)\\end\{align\}/g,
        /\\title\{[\s\S]+?[\r\n]\}/g,
        /\\author\{[\s\S]+?[\r\n]\}/g,
        /\\begin\{abstract\}([\s\S]+?)\\end\{abstract\}/g,
        /\\section\{REFERENCES\}[\s\S]*/g,
        /\\section\{References\}[\s\S]*/g,
        /\\section\{(.+?)\}/g,
        /\\subsection\{(.+?)\}/g,
        /\\subsubsection\{(.+?)\}/g,
        /\\begin\{tabular\}[\s\S]+?\\end\{tabular\}/g,
        /\!\[\]\(.+?\)/g,
    ],
    encode_smb: 'TCMD'
}

export default config;