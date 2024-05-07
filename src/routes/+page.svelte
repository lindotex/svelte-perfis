<script lang="ts">
    import Titulo from "../components/Titulo.svelte";
    import Usuario from "../components/Usuario.svelte";
    import type IUsuario from '../Interfaces/IUsuario';
    let valorInput = ''
    var usuario :IUsuario | null = null;
    
    async function aoSubmeter(){
      const respostaUsuario = await fetch(`https://api.github.com/users/${valorInput}`);
      const dadosUsuario = await respostaUsuario.json();

      console.log(dadosUsuario)
       usuario = {
        avatar_url : dadosUsuario.avatar_url,
        login: dadosUsuario.login,
        nome: dadosUsuario.name,
        perfil_url: dadosUsuario.url,
        repositorios_publicos: dadosUsuario.public_repos,
        seguidores: dadosUsuario.followers ,      
      };   
    }
</script>
<div class="app">
    <header>
        <Titulo/>
        <div class="busca-usuario">
          <form action="" on:submit={aoSubmeter}>
            <input type="text" class="input" bind:value={valorInput} placeholder="Pesquise pelo usuario.">
            <div class="botao-container">
              <button class="botao">Buscar</button>
            </div>
          </form>
        </div>
    </header>
    {#if usuario}
      <Usuario usuario={usuario}/>
    {/if}
</div>

<style>
    .app {
    max-height: 100vh;
  }

  header {    
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .busca-usuario {
    position: relative;
    width: 70%;
  }

  .input {
    padding: 15px 25px;
    width: calc(100% - 8.75rem);
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #2e80fa;
    box-shadow: 0px 17px 52px rgba(222, 231, 247, 0.4);
    outline: 0;
  }

  .input::placeholder {
    font-family: "Roboto";
    font-style: italic;
    font-weight: 300;
    font-size: 19.5px;
    line-height: 26px;
    color: #6e8cba;
  }

  .botao-container {
    position: absolute;
    width: 9.625rem;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
  }

  .botao {
    padding: 15px 24px;
    border-radius: 8px;
    border: none;
    background: #2e80fa;
    line-height: 26px;
    color: #fff;
    font-size: 22px;
    cursor: pointer;

    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    gap: 13px;
  }

  .botao:hover {
    background: #4590ff;
  }

 
</style>