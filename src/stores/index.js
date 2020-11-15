import {createContext, useContext} from 'react'
import {AuthStore} from './auth'

// 创建上下文
const context = createContext({
    AuthStore: new AuthStore()
})

export const useStores = () => useContext(context)