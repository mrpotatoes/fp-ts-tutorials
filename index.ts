const figlet = require('figlet')

console.clear()
console.log(process.argv[2])

import('./src/eq').then(m => {
  console.log(figlet.textSync(m.default.title, {
    font: '3D-ASCII',
    whitespaceBreak: true
  }));

  m.default.test()
})
