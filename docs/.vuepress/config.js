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
          ['/go/go-in-action/', 'Go in Action'],
          ['/go/gopl/', 'The Go Programming Language'],
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
          ['/python/effective-python/', 'Effective Python (2nd Edition)'],
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
        title: 'Swift',
        children: [['/swift/swift-book/', 'The Swift Programming Language']],
      },
      {
        title: 'TerraForm',
        children: [
          ['/terraform/terraform-up-and-running-2nd/', 'Terraform: Up & Running (2nd Edition)'],
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
      {
        title: 'RabbitMQ',
        children: [['/rabbitmq/rabbitmq-in-depth/', 'RabbitMQ in Depth']],
      },
      {
        title: 'Soft Skills',
        children: [['/soft-skills/software-developer-life/', 'Software Developer Life']],
      },
    ],
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: ['@vuepress/back-to-top', 'vuepress-plugin-nprogress'],
}
