module.exports = {
  title: 'Arable Developer',
  description: 'Power your project with Arable data',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  plugins: [
    // workaround SSR mismatch
    'dehydrate',
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: require('./nav.js'),
    searchMaxSuggestions: 10,
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',   // required
          // path: '/guide/',      // optional, which should be a absolute path.
          collapsable: false, // optional, defaults to true
          sidebarDepth: 2,    // optional, defaults to 1
          children: [
            '',
            'eula',
            'authentication',
            'pagination',
            'permission-system',
            'data',
            'errors'
          ]
        },
      ],
      '/faq/': [
        {
          title: 'FAQ',   // required
          // path: '/faq/',      // optional, which should be a absolute path.
          collapsable: false, // optional, defaults to true
          sidebarDepth: 1,    // optional, defaults to 1
          children: [
            ''
          ]
        },
      ],
      // fallback
      // '/': [
      //   '',        /* / */
      //   'contact', /* /contact.html */
      //   'about'    /* /about.html */
      // ]
    },
    lastUpdated: true,
    // if your docs are in a different repo from your main project:
    docsRepo: 'Arable/developer.arable.com',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Edit this page',
    serviceWorker: {
      updatePopup: true // Boolean | Object, default to undefined.
      // If set to true, the default text config will be:
      // updatePopup: {
      //    message: "New content is available.",
      //    buttonText: "Refresh"
      // }
    },
  }
}
