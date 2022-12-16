export const getAttributes = <Type>(data: any): Type | undefined => {
    if (data){
        let newData = JSON.parse(JSON.stringify(data))
        return <Type>newData;
    }
        

    return undefined;
}