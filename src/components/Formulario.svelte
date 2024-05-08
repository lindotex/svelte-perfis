<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type IUsuario from "../Interfaces/IUsuario";
  import { buscaRepositorios, buscaUsuario } from "../requisicoes";
  import montaUsuario from '../utils/montaUsuario';

  let valorInput = "";
  let statusDeErro: null | number = null;
  const dispatch = createEventDispatcher<{
    aoAlterarUsuario: IUsuario | null;
  }>();

  async function aoSubmeter() {
    const respostaUsuario = await buscaUsuario(valorInput);
    const respostaRepositorios = await buscaRepositorios(valorInput);

    if (respostaUsuario.ok && respostaRepositorios.ok) {
      const dadosUsuario = await respostaUsuario.json();
      const dadosRepositorios =await respostaRepositorios.json()
      
      dispatch("aoAlterarUsuario", montaUsuario(dadosUsuario, dadosRepositorios));
      statusDeErro = null;
    } else {
      statusDeErro = respostaUsuario.status;
      dispatch('aoAlterarUsuario',null)
    }
  }
</script>

<div class="busca-usuario">
  <form action="" on:submit={aoSubmeter}>
    <input
      type="text"
      class="input "
      class:erro-input={statusDeErro === 404}
      bind:value={valorInput}
      placeholder="Pesquise pelo usuario."
    />
    <div class="botao-container">
      <button class="botao" type="submit">
        Buscar
      </button>
    </div>
    {#if statusDeErro === 404}
      <span class="erro">Usuario nao encontrado...</span>
    {/if}
  </form>
</div>

<style>
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
  .erro {
    position: absolute;
    bottom: -25px;
    left: 0;
    font-style: italic;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    z-index: -1;
    color: #ff003e;
  }
  .erro-input {
    border: 1px solid #ff003e;
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
