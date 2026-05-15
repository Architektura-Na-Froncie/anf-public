export {}

type PatchParams = {
  name?: string
  languages?: string[]
}

const params = { value: '125' }
function patch(params: PatchParams){}

patch(params) // ❌ has no properties in common with type 'PatchParams'
