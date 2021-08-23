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
    order: ['1', '2', '3', '4'],
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
      '2': {
        id: '2',
        content: `
        import { useState } from 'react'
        const App = () => {
          const [count, setCount] = useState(0)
          return (
            <div
              style={{
                display: 'flex',
                paddingTop: '75px',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
            <h3> A simple Counter </h3>
              Count: {count}
              <button
                onClick={() => setCount((prev) => prev + 1)}
                style={{ width: '100px' }}
              >
                {' '}
                Click Me!{' '}
              </button>
            </div>
          )
        }
        show(<App />)
        `,
        type: 'code',
      },

      '3': {
        id: '3',
        content: `
        import React, { Component } from 'react'
        export const Buttonz = (props) => {
          return (
            <button
              onClick={() =>
                props.sign == '+' ? props.updateCount(1) : props.updateCount(-1)
              }
            >
              {props.sign}
            </button>
          )
        }
        
        class App2 extends Component {
          constructor(props) {
            super(props)
            this.state = {
              count: 1,
            }
          }
        
          handleCount(value) {
            this.setState((prevState) => ({ count: prevState.count + value }))
          }
        
          render() {
            return (
              <div>
                Current count: {this.state.count}
                <hr />
                <Buttonz
                  sign="+"
                  count={this.state.count}
                  updateCount={this.handleCount.bind(this)}
                />
                <Buttonz
                  sign="-"
                  count={this.state.count}
                  updateCount={this.handleCount.bind(this)}
                />
              </div>
            )
          }
        }
        
        const styles = {
          fontFamily: 'sans-serif',
          textAlign: 'center',
        }
        
        show(<App2 />)
        
        `,
        type: 'code',
      },

      '4': {
        id: '4',
        content: `
        function App3() {
          const [users, setUsers] = React.useState([])
        
          const f = async () => {
            const res = await fetch('https://reqres.in/api/users/')
            const json = await res.json()
            setUsers(json.data)
          }
          React.useEffect(() => {
            f()
          }, [])
        
          return (
            <div className="App">
              <h1>Hello ReqRes users!</h1>
              <div className="flex">
                {users.length &&
                  users.map((user) => {
                    return (
                      <div key={user.id}>
                        <p>
                          <strong>{user.first_name}</strong>
                        </p>
                        <p>{user.email}</p>
                        <img key={user.avatar} src={user.avatar} />
                      </div>
                    )
                  })}
              </div>
            </div>
          )
        }
        
        show(<App3 />)
        
        
        `,
        type: 'code',
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
