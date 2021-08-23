import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { ActionTypes } from './action-types'
import { persistMiddleware } from './middlewares/persist-middleware'
import reducers, { RootState } from './reducers'

const middlewares = [thunk, persistMiddleware]

const initialState: RootState = {
  cells: {
    loading: false,
    error: null,
    order: ['1'],
    data: {
      '1': {
        id: '1',
        content: `
# VP Compiler 
This is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using markdown. 
- Click any text cell (including this one) to edit 
- The code in each code editor is all joined together into one file. If you define a variable in cell #1, you can refer to it in any following cell! 
- You can show any React component, string, number or anything else by calling the ***show*** function. This is a function built into this environment. Call show multiple times to show multiple values 
- Re-order or delete cells using the button on the top right 
- Add new cells by hovering on the divider between each cell 
All of your changes get saved to the file you opened VP Compiler with. So if you ran npx vdp-cli serve test.js, all of the text and code you write will be saved to the test.js file. 
        `,
        type: 'text',
      },
    },
  },
  bundles: {},
}

export const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
)
