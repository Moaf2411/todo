import styles from './Main.module.css'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from './List'
import { listActions } from '../store/index'

const Main = props => {

    const [mode,setMode] = useState('All')

    const list = useSelector(state => state.list.list)
    const completed = useSelector(state => state.list.completed)
    const active = useSelector(state => state.list.active)

    const dispatch = useDispatch()

    function enter(e){
        if(e.key==='Enter' && e.target.value !== ''){
            dispatch(listActions.add({text:e.target.value,id:list.length===0?1:list[list.length-1].id+1,isDone:false}))
            e.target.value=''
        }else if(e.key === 'Enter' && e.target.value === ''){
            e.target.classList.add(styles.error)
            e.target.placeholder = 'Please enter a valid TODO'
        }
        else{
            e.target.placeholder = 'create a new todo'
            e.target.classList.remove(styles.error)
        }
    }



    function selectall(){
        setMode('All')
    }
    function selectAcive(){
        setMode('active')
    }
    function selectcompleted(){
        setMode('completed')
    }


    return(
        <div className={styles.wrapper}>

            
            <input type='text' placeholder='create a new todo' className={styles.input1} onKeyDown={enter}/>
            <div className={styles.list}>
                <div className={styles.list2}>
                    {mode === 'All' && list.map(l => <List text={l.text} isDone={l.isDone} key={l.id} id={l.id} />)}
                    {mode === 'completed' && completed.map(l => <List text={l.text} isDone={l.isDone} key={l.id} id={l.id} />)}
                    {mode === 'active' && active.map(l => <List text={l.text} isDone={l.isDone} key={l.id} id={l.id} />)}
                </div>
                
                <div className={styles.selector}>
                    <p className={styles.remainder}>{`${active.length} items left`}</p>
                    <div className={styles.mode}>
                        <p className={mode==='All'? styles.selected:styles.modetext} onClick={selectall}>All</p>
                        <p className={mode==='active'? styles.selected:styles.modetext} onClick={selectAcive}>Active</p>
                        <p className={mode==='completed'? styles.selected:styles.modetext} onClick={selectcompleted}>Completed</p>
                    </div>
                    <p className={styles.modetext}>Clear Completed</p>
                </div>
            </div>



        </div>
    )
}



export default Main