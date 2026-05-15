export const getPerson = (young, employed, knowsJS) => {
  let age = young ? 18 : 99
  let company, skills;

  if (employed){
    company = 'ACME'
  } else {
    company = null; console.log({ company })
  }

  if (knowsJS){
    skills = ['JavaScript']
  }
  !young && skills?.push('life experience')

  return { age, company, ...(skills && {skills}) }
}

export const unused = () => 'unused'
