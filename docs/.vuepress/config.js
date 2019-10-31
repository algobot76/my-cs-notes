module.exports = {
  title: "Kaitian's CS Notes",
  description: "Let's learn more about Computer Science",
  themeConfig: {
    searchPlaceholder: 'Search...',
    sidebar: [
      {
        title: 'C++',
        path: '/cpp/',
        children: [
          ['/cpp/my-cpp-notes/', 'My C++ Notes'],
          ['/cpp/a-tour-of-cpp/', 'A Tour of C++'],
        ],
      },
      {
        title: 'CSS',
        path: '/css/',
        children: [['/css/css-the-definitive-guide/', 'CSS The Definitive Guide']],
      },
      {
        title: 'Golang',
        path: '/golang/',
        children: [
          ['/golang/my-golang-notes/', 'My Golang Notes'],
          ['/golang/a-tour-of-go/', 'A Tour of Go'],
        ],
      },
      {
        title: 'Java',
        path: '/java/',
        children: [['/java/core-java/', 'Core Java']],
      },
      {
        title: 'JavaScript',
        path: '/javascript/',
        children: [['/javascript/my-js-notes/', 'My JS Notes']],
      },
      {
        title: 'Python',
        path: '/python/',
        children: [
          ['/python/my-python-notes/', 'My Python Notes'],
          ['/python/python-101/', 'Python 101'],
          ['/python/python-201/', 'Python 201'],
          ['/python/python-tricks/', 'Python Tricks'],
        ],
      },
      {
        title: 'Rust',
        path: '/rust/',
        children: [['/rust/the-rust-book/', 'The Rust Book']],
      },
      {
        title: 'Scala',
        path: '/scala/',
        children: [
          ['/scala/fp-in-scala/', 'Functional Programming in Scala'],
          ['/scala/programming-in-scala/', 'Programming in Scala'],
        ],
      },
      {
        title: 'LeetCode',
        path: '/leetcode/',
        children: [
          ['/leetcode/patterns', 'Patterns'],
          ['/leetcode/solutions', 'Solutions'],
        ],
      },
    ],
  },
}
