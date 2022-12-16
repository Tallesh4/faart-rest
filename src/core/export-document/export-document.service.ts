import { Response } from "express";
import { Type } from "typescript";
import excelManager from "../../utils/excel-manager";
import { ExcelDocumentModel } from "./export-document.interface";

export class ExportDocument {
    async excel(sheetName: string, headers: ExcelDocumentModel[], itemsToExport: any[], res: Response){
        headers.forEach((item) => {
            item.width = 35;
        })

        return await excelManager.getExcelTemplate().createNewExcelFile({
            sheet_name: sheetName,
            headers: headers,
            data: itemsToExport
        }, res);
    }
}