// Static-parse all JS files in cypress/ to catch syntax errors offline,
// since Electron cannot launch in this sandbox.
const fs = require('fs')
const path = require('path')
const { transformSync } = require('esbuild')

const roots = [
  path.join(__dirname, '..', 'cypress', 'e2e', 'project.cy.js'),
  path.join(__dirname, '..', 'cypress', 'pages'),
  path.join(__dirname, '..', 'cypress', 'support'),
  path.join(__dirname, '..', 'cypress', 'e2e', 'step_definitions'),
]

const files = []
for (const r of roots) {
  if (!fs.existsSync(r)) continue
  const stat = fs.statSync(r)
  if (stat.isFile()) {
    files.push(r)
  } else {
    for (const f of fs.readdirSync(r)) {
      if (f.endsWith('.js')) files.push(path.join(r, f))
    }
  }
}

let failed = 0
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8')
  try {
    transformSync(src, { loader: 'js', format: 'esm', target: 'es2020' })
    console.log('OK   ' + path.relative(process.cwd(), file))
  } catch (e) {
    failed++
    console.log('FAIL ' + path.relative(process.cwd(), file))
    console.log('     ' + e.message)
  }
}

console.log('\n' + files.length + ' file(s) checked, ' + failed + ' failure(s)')
process.exit(failed ? 1 : 0)
