const person = [
  {name: 'Temitayo Sosanya', age: 24, nickName: 'MallamTY'}, 
  {name: 'Idris Sosanya', age: 24, nickName: 'MallamTY'},
  {name: 'Kafayat Sosanya', age: 24, nickName: 'MallamTY'}
]

function gatherName(personArray) {
  return personArray.map((person) => {
    return person.name
  })
}

console.log(gatherName(person))