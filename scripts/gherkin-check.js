// Parse every .feature file with the Gherkin parser to catch syntax errors offline.
const fs = require('fs')
const path = require('path')
const { GherkinStreams } = require('@cucumber/gherkin-streams')

const featuresDir = path.join(__dirname, '..', 'cypress', 'e2e', 'features')
const files = fs.readdirSync(featuresDir)
  .filter((f) => f.endsWith('.feature'))
  .map((f) => path.join(featuresDir, f))

let parseErrors = 0
let scenarios = 0

const stream = GherkinStreams.fromPaths(files, {
  defaultDialect: 'en',
  newId: () => Math.random().toString(36).slice(2),
})

stream.on('data', (env) => {
  if (env.parseError) {
    parseErrors++
    console.log('PARSE ERROR: ' + env.parseError.message)
  }
  if (env.pickle) scenarios++
})

stream.on('end', () => {
  console.log(files.length + ' feature file(s) parsed, ' + scenarios + ' scenario(s) found, ' + parseErrors + ' parse error(s)')
  process.exit(parseErrors ? 1 : 0)
})

stream.on('error', (e) => {
  console.log('STREAM ERROR: ' + e.message)
  process.exit(1)
})
