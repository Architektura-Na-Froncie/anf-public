const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { compileFromFile } = require('json-schema-to-typescript')
const { schemaFiles } = require('../schema/files')

const compileSchema = async (schema) => {
  const schemaFile = path.join(__dirname, '..', 'schema', 'json-schema', `${schema}.schema.json`)
  const typesFile = path.join(__dirname, '..', 'types', `${schema}.ts`)
  const output = await compileFromFile(schemaFile)
  fs.writeFileSync(typesFile, output)
  return typesFile
}

const generateTypes = async () => {
  const pending = schemaFiles.map(compileSchema)
  const files = await Promise.all(pending)
  console.log('> Types successfully generated:')
  console.log(chalk.green(files.map(f => `  - ${f}`).join('\n')))
}

generateTypes()
