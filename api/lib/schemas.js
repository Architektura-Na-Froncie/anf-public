const path = require('path')
const chalk = require('chalk')
const faker = require('faker')
const jsf = require('json-schema-faker')

jsf.extend('faker', function() {
  return require('faker');
});
jsf.option('alwaysFakeOptionals', true);
faker.locale = 'nl'

const schemas = require('../schema')
const { writeFileSync } = require('./io')

const between = (from, to) => {
  const diff = Math.max(to - from, 0)
  return from + Math.round(Math.random() * diff)
}

const collection = (schema, itemCb = entity => entity) =>
  (count) => Array(count).fill(null)
    .map(() => jsf(schema))
    .map(itemCb)

const generate = {
  logs: collection(schemas.logDTO, dto => {
    dto.date = new Date(dto.date).toISOString()
    return dto
  }),
  transfers: collection(schemas.transferDTO, dto => {
    dto.scheduledAt = new Date(dto.scheduledAt).toISOString()
    return dto
  }),
}

const generateDB = () => {
  const logs = generate.logs(between(500, 1000))
  const transfers = generate.transfers(between(1000, 2000))

  return {
    logs,
    transfers,
  }
}

const dumpDB = () => {
  const dynamicContent = generateDB()
  const staticContent = require('../db.static.json')
  const employeesContent = require('../db.employees.json')
  const content = { ...staticContent, ...employeesContent, ...dynamicContent }
  const filepath = path.join(__dirname, '..', 'db.json')
  console.log(`> Mock data successfully generated: ${chalk.green(filepath)}`)
  writeFileSync(content, filepath)
}

module.exports = {
  collection,
  dumpDB,
  schemas,
}
