import PermissionRepository from "../core/permission/permission.repository";

export default async function main() {
	const permissionsList = [
		{
			text: "Permissões",
			name: "Permissions",
			collectionName: "permissions"
		},
		{
			text: "Hierarquia",
			name: "Hierarchies",
			collectionName: "hierarchies"
		},
		{
			text: "Usuários",
			name: "Users",
			collectionName: "users"
		},
		{
			text: "Associação",
			name: "Association",
			collectionName: "associations"
		},
		{
			text: "Responsáveis",
			name: "Responsible",
			collectionName: "responsibles"
		},
		{
			text: "Ficha Cadastrais",
			name: "RegistrationForm",
			collectionName: "registration-forms"
		},
		{
			text: "Produtos",
			name: "Products",
			collectionName: "products"
		}
	];

	await populateDefault(permissionsList);
}


async function populateDefault(permissionsList: { text: string, name: string, collectionName: string}[] ){
	const permissionRepository = new PermissionRepository();
	let permissionsAdd = 0;

	for(const permission of permissionsList){
		console.log(permission)

		await permissionRepository.firstOrCreate({
			tag: `read${permission.name}`,
			name: `Visualizar ${permission.text}`,
			collectionName: permission.collectionName,
			type: "read"
		});

		await permissionRepository.firstOrCreate({
			tag: `create${permission.name}`,
			name: `Criar ${permission.text}`,
			collectionName: permission.collectionName,
			type: "create"
		});

		await permissionRepository.firstOrCreate({
			tag: `update${permission.name}`,
			name: `Editar ${permission.text}`,
			collectionName: permission.collectionName,
			type: "update"
		});

		await permissionRepository.firstOrCreate({
			tag: `delete${permission.name}`,
			name: `Excluir ${permission.text}`,
			collectionName: permission.collectionName,
			type: "delete"
		});

		permissionsAdd += 4;
	}

	console.log(`${permissionsAdd} permissions created or found`)
}