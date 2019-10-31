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
    ],
  },
}
