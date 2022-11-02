const config = {
    tex: {
        preproc_subpairs: [
            // [/\$\$([\s\S]+?)\$\$/g, '\\begin{align}$1\\end{align}'],
            // [/\\\[([\s\S]+?)\\\]/g, '\\begin{align}$1\\end{align}'],
            // [/\\begin\{equation\}([\s\S]+?)\\end\{equation\}/g, '\\begin{align}$1\\end{align}'],
            // [/\\begin\{equation\*\}([\s\S]+?)\\end\{equation\*\}/g, '\\begin{align}$1\\end{align}'],
            // [/\\begin\{align\*\}([\s\S]+?)\\end\{align\*\}/g, '\\begin{align}$1\\end{align}'],
            // [/\\begin\{aligned\}[\s]*/g, ''],
            // [/\\end\{aligned\}[\s]*/g, ''],
            // [/\\\(([\s\S]*?)\\\)/g, '$$$1$$'],
        ],
        postproc_subpairs: [

        ],
        delimiters: [
            /\\\$/g,
            /\$\$[\s\S]+?\$\$/g, // tex block eq
            /\\\[[\s\S]+?\\\]/g, // tex block eq
            /\$[\s\S]+?\$/g, // tex inline eq
            /\\\([\s\S]*?\\\)/g, // tex inline eq
            /\\(?:begin|end)\{abstract\}(?:\[[\s\S]+?\]|\{[\s\S]+?\})*/g,
            /\\(?:begin|end)\{document\}(?:\[[\s\S]+?\]|\{[\s\S]+?\})*/g,
            /\\(?:begin|end)\{itemize\}(?:\[[\s\S]+?\]|\{[\s\S]+?\})*/g,
            /\\(?:begin|end)\{enumerate\}(?:\[[\s\S]+?\]|\{[\s\S]+?\})*/g,
            /\\(?:begin|end)\{description\}(?:\[[\s\S]+?\]|\{[\s\S]+?\})*/g,
            /\\(?:begin|end)\{figure\}(?:\[[\s\S]+?\]|\{[\s\S]+?\})*/g,
            /\\(?:begin|end)\{minipage\}(?:\[[\s\S]+?\]|\{[\s\S]+?\})*/g,
            /\\(?:sub)*section/g,
            /\\(?:sub)*caption\**/g,
            /\\section\{REFERENCES\}[\s\S]*(?!(?:\\section|\\appendix))/ig,
            [/\\begin\{([\s\S]+?)\}(?:\[[\s\S]+?\]|\{[\s\S]+?\})*/g, /\\end\{([\s\S]+?)\}/g], //tex \begin&\end
            /\\[^\{\[\s]*(?:\[[\s\S]+?\]|\{[\s\S]+?\})+/g, // tex command
            /%[^\n]+/g, // tex comment
        ],
    },
    mmd: {
        preproc_subpairs: [
            // [/\$\$([\s\S]+?)\$\$/g, '\\begin{align}$1\\end{align}'],
            // [/\\\[([\s\S]+?)\\\]/g, '\\begin{align}$1\\end{align}'],
            // [/\\begin\{equation\}([\s\S]+?)\\end\{equation\}/g, '\\begin{align}$1\\end{align}'],
            // [/\\begin\{equation\*\}([\s\S]+?)\\end\{equation\*\}/g, '\\begin{align}$1\\end{align}'],
            // [/\\begin\{align\*\}([\s\S]+?)\\end\{align\*\}/g, '\\begin{align}$1\\end{align}'],
            // [/\\begin\{aligned\}[\s]*/g, ''],
            // [/\\end\{aligned\}[\s]*/g, ''],
            // [/\\\(([\s\S]*?)\\\)/g, '$$$1$$'],
        ],
        postproc_subpairs: [

        ],
        delimiters: [
            /\\\$/g,
            /\$\$[\s\S]+?\$\$/g, // tex block eq
            /\\\[[\s\S]+?\\\]/g, // tex block eq
            /\$[\s\S]+?\$/g, // tex inline eq
            /\\\([\s\S]*?\\\)/g, // tex inline eq
            /\\(?:begin|end)\{abstract\}(?:\[[\s\S]+?\]|\{[\s\S]+?\})*/g,
            /\\(?:begin|end)\{document\}(?:\[[\s\S]+?\]|\{[\s\S]+?\})*/g,
            /\\(?:begin|end)\{itemize\}(?:\[[\s\S]+?\]|\{[\s\S]+?\})*/g,
            /\\(?:begin|end)\{enumerate\}(?:\[[\s\S]+?\]|\{[\s\S]+?\})*/g,
            /\\(?:begin|end)\{description\}(?:\[[\s\S]+?\]|\{[\s\S]+?\})*/g,
            /\\(?:begin|end)\{figure\}(?:\[[\s\S]+?\]|\{[\s\S]+?\})*/g,
            /\\(?:begin|end)\{minipage\}(?:\[[\s\S]+?\]|\{[\s\S]+?\})*/g,
            /\\(?:sub)*section/g,
            /\\(?:sub)*caption\**/g,
            /\\section\{REFERENCES\}[\s\S]*(?!(?:\\section|\\appendix))/ig,
            [/\\begin\{([\s\S]+?)\}(?:\[[\s\S]+?\]|\{[\s\S]+?\})*/g, /\\end\{([\s\S]+?)\}/g], //tex \begin&\end
            /\\[^\{\[\s]*(?:\[[\s\S]+?\]|\{[\s\S]+?\})+/g, // tex command
            /(?<=\n)```.*?\n.*?\n```/g, // markdown code (block mode)
            /(?<=\n)~~~.*?\n.*?\n~~~/g, // markdown code (block mode)
            /`[^`\n]+?`/g, // markdown code(inline)
            /\!\[[\s\S]*?\]\(.+?\)/g, // markdown image
            /\[[\s\S]+?\]\(.+?\)/g, // markdown link
            /\[\^.+?\]/g, // markdown footnotes
            /\^\[.+?\]/g, // markdown footnotes(inline)
            /<smiles>.*?<\/smiles>/g, // smiles
            /(?:(?:\|[^|\r\n]*)+\|(?:\r?\n|\r)?)+/g, // markdown table
            /:\S+?:/g, // Emoji
            // /```smiles\n.*?\n```/g, // smiles(block mode)
        ],
    },
}

export default config;