const config = {
    version: '0.2.0',
    block_eq_delimiters: [
        '\\$\\$([\\s\\S]+?)\\$\\$',
        '\\\\\\[([\\s\\S]+?)\\\\\\]',
        '\\\\begin\\{equation\\}([\\s\\S]+?)\\\\end\\{equation\\}',
        '\\\\begin\\{equation\\*\\}([\\s\\S]+?)\\\\end\\{equation\\*\\}',
        '\\\\begin\\{align\\*\\}([\\s\\S]+?)\\\\end\\{align\\*\\}',
        '\\\\begin\\{align\\}([\\s\\S]+?)\\\\end\\{align\\}',
    ],
    block_eq_subs: [
        '\\begin{align}$1\\end{align}',
        '\\begin{align*}$1\\end{align*}',
    ],
    block_eq_delete: [
        '\\\\begin\\{aligned\\}[\\s]*',
        '\\\\end\\{aligned\\}[\\s]*',
    ],
    inline_eq_delimiters: [
        '\\\\\\(([\\s\\S]*?)\\\\\\)',
        '\\$([\\s\\S]*?)\\$',
    ],
    inline_eq_subs: [
        '$$$1$$',
        '\\($1\\)',
    ],
    tex: {
        postproc_subpairs: [

        ],
        delimiters: [
            '\\\\\\$',
            '\\$\\$[\\s\\S]+?\\$\\$', // tex block eq
            '\\\\\\[[\\s\\S]+?\\\\\\]', // tex block eq
            '\\$[\\s\\S]+?\\$', // tex inline eq
            '\\\\\\([\\s\\S]*?\\\\\\)', // tex inline eq
            '\\\\(?:begin|end)\\{abstract\\}(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})*',
            '\\\\(?:begin|end)\\{document\\}(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})*',
            '\\\\(?:begin|end)\\{itemize\\}(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})*',
            '\\\\(?:begin|end)\\{enumerate\\}(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})*',
            '\\\\(?:begin|end)\\{description\\}(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})*',
            '\\\\(?:begin|end)\\{figure\\}(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})*',
            '\\\\(?:begin|end)\\{minipage\\}(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})*',
            '\\\\(?:sub)*section',
            '\\\\(?:sub)*caption\\**',
            '\\\\section\\{(?:REFERENCES|References)\\}[\\s\\S]*(?!(?:\\\\section|\\\\appendix))',
            ['\\\\begin\\{([\\s\\S]+?)\\}(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})*', '\\\\end\\{([\\s\\S]+?)\\}'], //tex \\begin&\\end
            '\\\\[^\\{\\[\\s]*(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})+', // tex command
            '%[^\\n]+', // tex //
        ],
    },
    mmd: {
        postproc_subpairs: [

        ],
        delimiters: [
            '\\\\\\$',
            '\\$\\$[\\s\\S]+?\\$\\$', // tex block eq
            '\\\\\\[[\\s\\S]+?\\\\\\]', // tex block eq
            '\\$[\\s\\S]+?\\$', // tex inline eq
            '\\\\\\([\\s\\S]*?\\\\\\)', // tex inline eq
            '\\\\(?:begin|end)\\{abstract\\}(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})*',
            '\\\\(?:begin|end)\\{document\\}(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})*',
            '\\\\(?:begin|end)\\{itemize\\}(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})*',
            '\\\\(?:begin|end)\\{enumerate\\}(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})*',
            '\\\\(?:begin|end)\\{description\\}(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})*',
            '\\\\(?:begin|end)\\{figure\\}(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})*',
            '\\\\(?:begin|end)\\{minipage\\}(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})*',
            '\\\\(?:sub)*section',
            '\\\\(?:sub)*caption\\**',
            '\\\\section\\{REFERENCES\\}[\\s\\S]*(?!(?:\\\\section|\\\\appendix))',
            ['\\\\begin\\{([\\s\\S]+?)\\}(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})*', '\\\\end\\{([\\s\\S]+?)\\}'], //tex \\begin &\\end
            '\\\\[^\\{\\[\\s]*(?:\\[[\\s\\S]+?\\]|\\{[\\s\\S]+?\\})+', // tex command
            '(?<=\\n)```.*?\\n.*?\\n```', // markdown code(block mode)
            '(?<=\\n)~~~.*?\\n.*?\\n~~~', // markdown code(block mode)
            // '`(?<![\\s\\S]*?\\n\\s*?\\n)[\\s\\S]+?`', // markdown code(inline)
            '`.*?`', //markdown code(inline, not supporting newline)
            '\\!\\[[\\s\\S]*?\\]\\(.+?\\)', // markdown image
            '\\[[\\s\\S]+?\\]\\(.+?\\)', // markdown link
            '\\[\\^.+?\\]', // markdown footnotes
            '\\^\\[.+?\\]', // markdown footnotes(inline)
            '<smiles>.*?</smiles>', // smiles
            '(?:(?:\\|[^|\\r\\n]*)+\\|(?:\\r?\\n|\\r)?)+', // markdown table
            ':\\S+?:', // Emoji
            // '```smiles\\n.*?\\n```', // smiles(block mode)
        ],
    },
    encode_smb: 'TCMD',
    encode_digits_num: 5,
    opt_file: 'mmd',
    opt_inline_eq: -1,
    opt_block_eq: -1,
}

export default config;