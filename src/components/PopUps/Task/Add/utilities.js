export function getColumnByColumnName(name, columns){
    return columns.reduce((p, c) => {
        if (c.name == name){
            return c
        }else{
            return p
        }
    }, null)
}