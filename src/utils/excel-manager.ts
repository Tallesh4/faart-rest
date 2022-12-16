import ExcelJS from "exceljs";
import { Response } from "express";

export default {
	download_base_template: {
		workbook: function () {
			return new ExcelJS.Workbook() || null;
		},
		createNewExcelFile: async function (props: any, res: Response) {
			const workbook = this.workbook();
			const worksheet: any = workbook.addWorksheet(props.sheet_name);

			const defaultHeaderStyle: any = {
				fill: {
					type: "pattern",
					pattern: "solid",
					fgColor: { argb: "004c8c" },
				},
				font: {
					name: "Arial",
					color: { argb: "FFFFFF" },
					size: 16,
				},
				height: 20,
			};
			const defaultStyle: any = {
				font: {
					name: "Arial",
				}
			};

			worksheet.columns = props.headers;
			for (let i = 0; i < props.headers.length; i++) {
				if (props.style) {
					for (const key in props.style) {
						worksheet.getColumn(i + 1)[key] = props.style[key];
					}
				} else {
					for (const key in defaultStyle) {
						worksheet.getColumn(i + 1)[key] = defaultStyle[key];
					}
				}
				if (props.headerStyle) {
					worksheet.getRow(1).height = props.headerStyle.height;
					for (const key in props.headerStyle) {
						worksheet.getRow(1).getCell(i + 1)[key] = props.headerStyle[key];
					}
				} else {
					worksheet.getRow(1).height = defaultHeaderStyle.height;
					for (const key in defaultHeaderStyle) {
						worksheet.getRow(1).getCell(i + 1)[key] = defaultHeaderStyle[key];
					}
				}
			}

			if (props.data) {
				for (let i = 0; i < props.data.length; i++) {
					const row = props.data[i];

					for (const key in row) {
						if (typeof row[key] == "object") {
							delete row[key];
						}

						if (typeof row[key] === "boolean") {
							row[key] ? row[key] = "Sim" : row[key] = "Não";
						}
					}

					worksheet.addRow(props.data[i]);
				}				
			}

			worksheet.columns.forEach((col: { eachCell: (arg0: (cell: { value: any; numFmt: string; }) => void) => void; }) => {
				col.eachCell((cell: { value: any; numFmt: string; }) => {
					if (cell.value && cell.value.length < 9) {
						if (!isNaN(cell.value)) {
							cell.value = +cell.value; // convert a string value to a number value
						} else {
							if (cell.value && cell.value.toString().includes("%")) {
								const value = cell.value.toString();
								const percent = value.slice(0, value.length - 1);
								cell.value = +percent / 100;
								cell.numFmt = "0%";
							}
						}
					}
				});
			});

			res.setHeader(
				"Content-Type",
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8"
			);

			res.set("Content-Type", "excel");


			res.setHeader(
				"Content-Disposition",
				"attachment; filename=" + `${props.sheet_name}.xlsx`,
			);

			return workbook.xlsx.write(res).then(function () {
				res.status(200).end();
			});
		}
	},
	getExcelTemplate: function () {
		return this.download_base_template;
	}
};

