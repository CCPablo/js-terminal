export { asteriskCondition }

const asteriskCondition = (name, _, child) => {
    const asteriskIndexes = [];
    let manyCondition = false;

    for(let i=0; i < child.length; i++) {
        if (child[i] === "*") {
            asteriskIndexes.push(i);
        }
    }
    if(asteriskIndexes.length === 1) {
        manyCondition = name.startsWith(child.slice(0, asteriskIndexes[0])) 
            && name.endsWith(child.slice(asteriskIndexes[0] + 1));
    } else {
        manyCondition = name.includes(child.substring(
            child.indexOf("*") + 1, 
            child.lastIndexOf("*")
        ))
    }
    
    return child === name || manyCondition;
}