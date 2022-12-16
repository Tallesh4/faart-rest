import { id } from "../base/base.repository";
import { HierarchyInterface } from "../core/hierarchy/hierarchy.interface";
import HierarchyRepository from "../core/hierarchy/hierarchy.repository";
import { PermissionInterface } from "../core/permission/permission.interface";
import PermissionService from "../core/permission/permission.service";

export default async function main(){
    const hierarchyRepository = new HierarchyRepository();  
    const permissionService = new PermissionService();  

    const directorHierarchy = <HierarchyInterface[]> await hierarchyRepository.find({ tag: "admin" }).exec();
    const allPermissions = <PermissionInterface[]> await permissionService.find({});
    const allPermissionsIds = <id[]> allPermissions.map((item) => { return item.id });


    for(const hierarchy of directorHierarchy){
        hierarchy.permissionIds?.push(...allPermissionsIds);

        await hierarchyRepository.updateById(hierarchy.id, hierarchy);
    }
} 

