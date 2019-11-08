module.exports = {
  title: "Kaitian's CS Notes",
  description: "Let's learn more about Computer Science",
  themeConfig: {
    searchPlaceholder: 'Search...',
    sidebar: [
      {
        title: 'C++',
        children: [
          ['/cpp/my-cpp-notes/', 'My C++ Notes'],
          ['/cpp/a-tour-of-cpp/', 'A Tour of C++'],
          ['/cpp/cpp-primer/', 'C++ Primer'],
        ],
      },
      {
        title: 'CSS',
        children: [['/css/css-the-definitive-guide/', 'CSS The Definitive Guide']],
      },
      {
        title: 'Golang',
        children: [
          ['/golang/my-golang-notes/', 'My Golang Notes'],
          ['/golang/a-tour-of-go/', 'A Tour of Go'],
        ],
      },
      {
        title: 'Java',
        children: [['/java/core-java/', 'Core Java']],
      },
      {
        title: 'JavaScript',
        children: [['/javascript/my-js-notes/', 'My JS Notes']],
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
        title: 'Git',
        path: '/git/',
      },
    ],
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: ['@vuepress/back-to-top', 'vuepress-plugin-nprogress'],
}
