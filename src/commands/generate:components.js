module.exports = {
    name: 'generate:component',
    description: 'Create new component inside src/component',
    run: async toolbox => {
        const {
            parameters,
            createComponent } = toolbox;
        const name = parameters.first;

        await createComponent('src/components', name)
    }
} 