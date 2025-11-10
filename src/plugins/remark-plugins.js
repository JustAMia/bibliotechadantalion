import { visit } from 'unist-util-visit';
import { parse } from 'acorn';

function parseExpression(code) {
    return parse(code, {
      ecmaVersion: 2024,
      sourceType: "module"
    });
  }


function remarkExtendBlockquote () {
  return (tree) => {
    visit(tree, 'blockquote', function (node, index, parent) {
      // const blockquoteQuote = node.children[0].children[0].value || '';;
      const textNode = node.children[0].children.find((element) => element.type == "text");
      const codeNode = node.children[0].children.find((element) => element.type == "inlineCode");

      const blockquoteQuote = textNode ? textNode.value : '';
      const blockquoteBy = codeNode ? codeNode.value : ''; 

      let newNode = {
          type: 'mdxJsxFlowElement',
          name: 'blockquote',
          attributes: [],
          children: [{ 
            type: 'mdxJsxFlowElement',
            name: 'blockquote-quote',
            attributes: [],
            children: [{ type: 'text', value: blockquoteQuote }]
          },
          { 
            type: 'mdxJsxFlowElement',
            name: 'blockquote-by',
            attributes: [],
            children: [{ type: 'text', value: blockquoteBy }]
          }
        ]
      }
      parent.children[index] = newNode;
    })
  }
}


function remarkExtendImage () {
    return (tree) => {
        const alreadyHasImport = tree.children.some(
            (n) => n.type === 'mdxjsEsm' && n.value.includes("Picture")
          );
      
          if (!alreadyHasImport) {
            tree.children.unshift({
              type: 'mdxjsEsm',
              value: `import { Picture } from 'astro:assets';`,
              data: {
                estree: parseExpression(`import { Picture } from 'astro:assets';`)
              }
            });
          }



        visit(tree, 'image', function (node, index, parent) {
            const imageAlt = node.alt || '';
            const imageTitle = node.title || '';
            const imageUrl = node.url || '';
            let newNode = {
                    type: 'mdxJsxFlowElement',
                    name: 'figure',
                    attributes: [],  
                    children: [
                        {
                        type: 'mdxJsxFlowElement',
                        name: 'Picture',
                        attributes: [{type: 'mdxJsxAttribute', name: 'src', value: {
                            type: 'mdxJsxAttributeValueExpression',
                            value: `import('${imageUrl}')`,
                            data: {
                                estree: parseExpression(`import('${imageUrl}')`)
                              }
                        }},
                        {type: 'mdxJsxAttribute', name: 'alt', value: imageAlt},
                        {type: 'mdxJsxAttribute', name: 'formats', value: {
                            type: 'mdxJsxAttributeValueExpression',
                            value: `["avif", "webp"]`,
                            data: {
                              estree: parseExpression(`["avif", "webp"]`)
                            }
                          }
                        },
                        {type: 'mdxJsxAttribute', name: 'widths', value: {
                            type: 'mdxJsxAttributeValueExpression',
                            value: `[240, 540, 720]`,
                            data: {
                              estree: parseExpression(`[240, 540, 720]`)
                            }
                          }
                        },
                        {type: 'mdxJsxAttribute', name: 'height', value: 720},  
                        {type: 'mdxJsxAttribute', name: 'width', value: 1080},   
                        {type: 'mdxJsxAttribute', name: 'sizes', value: '(max-width: 360px) 240px, (max-width: 720px) 480px, (max-width: 1600px) 720px'},          
                    ], 
                },
                {
                    type: 'mdxJsxFlowElement',
                    name: 'figcaption',
                    attributes: [],
                    children: [{ type: 'text', value: imageTitle }]
                  }
            ]
          }
          parent.children[index] = newNode;
      })
}
}

export { remarkExtendImage, remarkExtendBlockquote }