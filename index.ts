const figlet = require('figlet')
console.clear()

import('./src/eq').then(m => {
  console.log(figlet.textSync(m.default.title, {
    font: '3D-ASCII',
    whitespaceBreak: true
  }));

  m.default.test()
})
