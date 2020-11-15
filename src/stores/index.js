import {createContext, useContext} from 'react'
import AuthStore from './auth'
import UserStore from './user'
// 创建上下文
const context = createContext({
    AuthStore: AuthStore,
    UserStore: UserStore
})

export const useStores = () => useContext(context)