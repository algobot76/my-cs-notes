module.exports = {
  title: "Kaitian's CS Notes",
  description: "Let's learn more about Computer Science",
  themeConfig: {
    repo: 'algobot76/my-cs-notes',
    searchPlaceholder: 'Search...',
    sidebar: [
      {
        title: 'C++',
        children: [
          ['/cpp/my-cpp-notes/', 'My C++ Notes'],
          ['/cpp/a-tour-of-cpp/', 'A Tour of C++'],
        ],
      },
      {
        title: 'CSS',
        children: [
          ['/css/css-the-definitive-guide/', 'CSS The Definitive Guide'],
          ['/css/bem/', 'BEM'],
        ],
      },
      {
        title: 'Go',
        children: [
          ['/go/my-go-notes/', 'My Go Notes'],
          ['/go/effective-go/', 'Effective Go'],
        ],
      },
      {
        title: 'Java',
        children: [['/java/core-java/', 'Core Java']],
      },
      {
        title: 'JavaScript',
        children: [
          ['/javascript/my-js-notes/', 'My JS Notes'],
          ['/javascript/javascript-the-definitive-guide/', 'JavaScript: The Definitive Guide'],
          ['/javascript/beginning-functional-js/', 'Beginning Functional JavaScript'],
        ],
      },
      {
        title: 'Python',
        children: [
          ['/python/my-python-notes/', 'My Python Notes'],
          ['/python/python-101/', 'Python 101'],
          ['/python/python-201/', 'Python 201'],
          ['/python/python-tricks/', 'Python Tricks'],
        ],
      },
      {
        title: 'Rust',
        children: [['/rust/the-rust-book/', 'The Rust Book']],
      },
      {
        title: 'Scala',
        children: [
          ['/scala/fp-in-scala/', 'Functional Programming in Scala'],
          ['/scala/programming-in-scala/', 'Programming in Scala'],
        ],
      },
      {
        title: 'Linux',
        path: '/linux/',
      },
      {
        title: 'DB',
        children: [['/db/database-internals/', 'Database Internals']],
      },
      {
        title: 'Git',
        path: '/git/',
      },
      {
        title: 'Nginx',
        path: '/nginx/',
      },
    ],
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: ['@vuepress/back-to-top', 'vuepress-plugin-nprogress'],
}
