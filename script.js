function getImportScript(collectionName, data) {
    let result = [];
    let stack = [];
    let startPosition;
    for(var i = 0; i < data.length; i++) {
        if(data[i] == "{") {
            if(stack.length == 0) startPosition = i;
            stack.push(data[i])
        }
        else if(data[i] == "}") {
            stack.pop();
            if(stack.length == 0) result.push(data.slice(startPosition, i+1));
        }
    }
    result[0] = "[" +  result[0];
    result[result.length - 1] += "]";
    result = result.join(",");
    command = `db.${collectionName}.insertMany(${result})`;
    return command;
}