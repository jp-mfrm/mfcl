module.exports = (plop) => {
  console.log('Plop')
  plop.addHelper('dash-case', (text) => {
    const [head, ...tail] = text
    return head.toLowerCase() + tail.join('').replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
  })
  plop.addHelper('camelCase', (text) => {
    const [head, ...tail] = text
    return head.toLowerCase() + tail.join('')
  })
  plop.setGenerator('actions', {
    description: 'Generate file types',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'What shall we name this component? Exclude extension, PascalCase (MyComponent).'
      }
    ],
    actions: () => {
      const actions = []
      actions.push({
        type: 'add',
        path: 'src/{{componentName}}/index.tsx',
        templateFile: 'plop-templates/Component.hbs'
      })
      actions.push({
        type: 'add',
        path: 'src/{{componentName}}/{{componentName}}.test.tsx',
        templateFile: 'plop-templates/Component.test.hbs'
      })
      actions.push({
        type: 'add',
        path: 'src/documentation/components/{{componentName}}.mdx',
        templateFile: 'plop-templates/Component.mdx.hbs'
      })
      actions.push({
        type: 'add',
        path: 'src/{{componentName}}/{{camelCase componentName}}.module.scss',
        templateFile: 'plop-templates/scss.module.hbs'
      })
      actions.push({
        type: 'modify',
        path: 'src/CHANGELOG.mdx',
        pattern: '# Changelog',
        template: '# Changelog\n\n#### [v. TODO]\n\n- Init {{componentName}} Component\n\n_TODO_'
      })
      actions.push({
        type: 'modify',
        path: 'src/index.ts',
        pattern: '\nexport {',
        template: "import {{componentName}} from './{{componentName}}';\n\nexport {\n  {{componentName}},"
      })

      return actions
    }
  })
}
