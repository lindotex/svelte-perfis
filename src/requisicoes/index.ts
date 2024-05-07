function buscaUsuario(nomeDeUsuario:string){
    return fetch(
        `https://api.github.com/users/${nomeDeUsuario}`
      );
}

function buscaRepositorios(nomeDeUsuario: string){
    return fetch(
    `https://api.github.com/users/${nomeDeUsuario}/repos?srt=created`
  );}

export {buscaUsuario, buscaRepositorios}