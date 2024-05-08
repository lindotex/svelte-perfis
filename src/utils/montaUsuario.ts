import type IRepositorios from '../Interfaces/IRepositorios';
import type IUsuario from '../Interfaces/IUsuario';

export default function montaUsuario(
	dadosUsuario: any,
	dadosRepositorios: any
): IUsuario {
	const repositorios_recentes = dadosRepositorios.map((repositorio: any) => {
		return {
			nome: repositorio.name,
			url: repositorio.svn_url
		} as IRepositorios;
	});

	return {
		avatar_url: dadosUsuario.avatar_url,
		login: dadosUsuario.login,
		nome: dadosUsuario.name,
		perfil_url: dadosUsuario.url,
		repositorios_publicos: dadosUsuario.public_repos,
		seguidores: dadosUsuario.followers,
		repositorios_recentes
	};
}
