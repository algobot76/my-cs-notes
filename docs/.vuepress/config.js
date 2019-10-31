module.exports = {
  title: "Kaitian's CS Notes",
  description: "Let's learn more about Computer Science",
  themeConfig: {
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
          ['/golang/a-tour-of-go/', 'A Tour of Go']
      ],
      }
    ],
  },
}
