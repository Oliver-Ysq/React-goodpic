import React, {useRef} from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores/index'

const Component = observer(function () {
    const {AuthStore} = useStores()
    const inputRef = useRef()
    const bindChange = e => {
        console.log(inputRef.current.value)
    }
    return (
        <>
            <h1>Login：{AuthStore.values.username}</h1>
            <input type="text" onChange={() => bindChange()} ref={inputRef}/>
        </>
    )
})

export default Component