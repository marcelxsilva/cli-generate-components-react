module.exports = (toolbox) => {
    const { filesystem, template, print: { success, error } } = toolbox;

    async function isReactNative() {
        const package = await filesystem.read('package.json', 'json');
        return !!package.dependencies['react-native'];
    }

    async function createComponent(folder, name) {
        if (!name) {
            error('page name must be specified');
            return
        }

        await template.generate({
            template: 'component.js.ejs',
            target: `${folder}/${name}/index.js`,
            props: { name }
        });

        const styledTemplate = (await isReactNative()) ?
            'styles-rn.js.ejs'
            : 'styles-react.js.ejs'

        await template.generate({
            template: styledTemplate,
            target: `${folder}/${name}/styles.js`,
        });

        success(`generated : ${folder}/${name}`)
    }
    toolbox.createComponent = createComponent;
}