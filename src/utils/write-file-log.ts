import fs from "fs";

export default function WriteFileLog(path: string, keyword: string){
	fs.readFile(path, (err, data) => {
		if(err) return console.log(err);
    
		const dataSplit = data.toString("utf-8").split("-").map((result => {
			return String(result).split("\n");
		}));
    
		if(!dataSplit[0].includes(keyword)){
			keyword+= "\n";
			fs.appendFile(path, keyword, (err) => {
				if(err) return console.log(err);
            
				console.log("write", path);
			});
		}
	});
}

