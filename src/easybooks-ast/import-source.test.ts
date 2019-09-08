import unified from 'unified'

import importPlugin from './import-source'
import * as EBAST from './ebast'

const importSource = unified().use(importPlugin)

// FIXME: fetch を mockで

test('', async () => {
  const root: EBAST.Root = {
    type: 'root',
    children: [
      {
        type: 'code',
        src: {
          url:
            'https://raw.githubusercontent.com/erukiti/easybooks/8b5168316d46504161dfb377fb9f4d3faa80b621/src/build-book.ts',
          startLine: 2,
          endLine: 3,
        },
        value: '',
      },
    ],
  }

  await importSource.run(root)
  expect(root.children[0]).toEqual(
    expect.objectContaining({
      type: 'code',
      value: [`import * as fs from 'fs'`, `import * as path from 'path'`].join(
        '\n',
      ),
    }),
  )
})