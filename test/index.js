import chai from 'chai'
import { handleActions, createAction } from 'redux-actions'
import { createStore, applyMiddleware } from 'redux'
import createGather from '../src'

chai.should()

describe('gather middleware', () => {
  let store

  beforeEach(() => {
    let increment = 0
    const gather = createGather()
    const createStoreWithMiddleware = applyMiddleware(gather)(createStore)
    const reducer = handleActions({
      ADD_LOGS: (state, action) => {
        return [...state, ...action.payload]
      }
    }, [])

    store = createStoreWithMiddleware(reducer)
  })

  describe('gathered action is dispatched', function(){
    it('general', function(done){
      this.timeout(5000)

      const loopLength = 10000

      for (var i=0; i < loopLength; i++){

        store.dispatch({
          type: 'ADD_LOGS',
          payload: [`Log ${i}`],
          meta: {
            gather: {time: 5}
          }
        })

      }

      setTimeout(function(){
        store.getState().length.should.equal(loopLength)
        done()
      }, 500)

    })
  })
})
