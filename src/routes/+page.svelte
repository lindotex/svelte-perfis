<script lang="ts">
  /** @type {import('@sveltejs/adapter-vercel').Config} */
  export const config = {
    runtime: 'edge'
  };
  import Formulario from "../components/Formulario.svelte";
  import Titulo from "../components/Titulo.svelte";
  import Usuario from "../components/Usuario.svelte";
  import type IUsuario from '../Interfaces/IUsuario';
  var usuario :IUsuario | null = null;

  function definirUsuario(evento:CustomEvent<IUsuario | null>){
    usuario = evento.detail
  }
</script>
<div class="app">
    <header>
        <Titulo/>
        <Formulario on:aoAlterarUsuario={definirUsuario}/>
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
</style>