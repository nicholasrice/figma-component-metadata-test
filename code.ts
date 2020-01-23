function test(node: SceneNode, type?: string): void {
    console.log(`Expect node to have test data equal to TEST-DATA-${type || node.type}: ${node.getPluginData("TEST") === `TEST-DATA-${type || node.type}`}`);
}

const component = figma.createComponent();
component.setPluginData("TEST", `TEST-DATA-${component.type}`)

const children = [
    figma.createText,
    figma.createEllipse,
    figma.createRectangle,
    figma.createLine,
    figma.createStar,
    figma.createFrame,
    figma.createSlice,
    figma.createVector,
    figma.createPolygon
].map(fn => fn()).map(node => { node.setPluginData("TEST", `TEST-DATA-${node.type}`);  return node }).forEach(node => component.appendChild(node));

const instance = component.createInstance();

console.log("---TEST COMPONENT---")
// All of these tests pass - the plugin data is persisted
test(component);
component.children.forEach(child => test(child))

console.log("---TEST INSTANCE---")
// All of these tests fail - the plugin data is not reflected from the component master
test(instance, "COMPONENT");
instance.children.forEach(child => test(child))

console.log("---TEST MASTER---")
// All of these tests pass - the plugin data exists on the referenced master
test(instance.masterComponent)
instance.masterComponent.children.forEach(child => test(child))

figma.closePlugin();
