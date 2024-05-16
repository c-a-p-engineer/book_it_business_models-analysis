module.exports = {
  title: "エンジニアが知るべき ～IT業界の収益モデル～", // populated into `publication.json`, default to `title` of the first entry or `name` in `package.json`.
  author: "こぴぺたん <c_a_p_engineer>", // default to `author` in `package.json` or undefined.
  language: "ja", // default to undefined.
  size: "JIS-B5", // paper size.
  // @vivliostyle/theme-bunko
  theme: "manuscripts/themes/theme-techbook-dojin", // .css or local dir or npm package. default to undefined.
  entry: [
    // 'sample.md',
    'cover.md', // 表紙
    'toc.md', // 目次
    'preface.md', // まえがき
    '00.md',  // 序章
    '01.md',
    '02.md',
    '03.md',
    '04.md',
    '05.md',
    '06.md',
    '07.md',
    'colophon.md', // 奥付
    // {
    //   path: 'epigraph.md',
    //   title: 'Epigraph', // title can be overwritten (entry > file),
    //   theme: '@vivliostyle/theme-whatever', // theme can be set individually. default to the root `theme`.
    // },
    // 'glossary.html', // html can be passed.
  ], // `entry` can be `string` or `object` if there's only single markdown file.
  entryContext: './manuscripts',
  output: [
    // path to generate draft file(s). default to '{title}.pdf'
    "./output.pdf", // the output format will be inferred from the name.
    {
      path: "./book",
      format: "webpub",
    },
  ],
  workspaceDir: '.vivliostyle', // directory which is saved intermediate files.
  // toc: true, // whether generate and include ToC HTML or not, default to 'false'.
  // cover: './cover.png', // cover image. default to undefined.
  // vfm: { // options of VFM processor
  //   hardLineBreaks: true, // converts line breaks of VFM to <br> tags. default to 'false'.
  //   disableFormatHtml: true, // disables HTML formatting. default to 'false'.
  // },
};
