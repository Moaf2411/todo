import styles from './List.module.css'
import React, { useRef, useState } from 'react'
import doneIcon from '../images/icon-check.svg'
import close from '../images/icon-cross.svg'
import { useDispatch } from 'react-redux'
import { listActions } from '../store'

const List = props => {
    const [done,setDone] = useState(props.isDone)
    const dispatch = useDispatch()

    function done1(){
        setDone(!done)
        console.log(props.id)
        dispatch(listActions.done(props.id))    
    }

    function close1(){
        dispatch(listActions.remove(props.id))
    }



    return(
        <div className={styles.wrapper}>
            <div className={styles.wrapper2}>
                <div className={styles.image} onClick={done1}>
                    {done && <img src={doneIcon} />}
                </div>
                <p className={`${styles.text} ${done? styles.donetext:''}`} > {props.text}  </p>
            </div>
            <img src={close} onClick={close1} />
        </div>
    )
}


export default List