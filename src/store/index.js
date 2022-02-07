import {createSlice,configureStore} from '@reduxjs/toolkit'
import moon from '../images/icon-moon.svg'
import sun from '../images/icon-sun.svg'


  // console.log(getComputedStyle(document.documentElement).getPropertyValue('--bg'))
  // document.documentElement.style.setProperty('--bg','pink')
  // console.log(getComputedStyle(document.documentElement).getPropertyValue('--bg'))


const uiSlice = createSlice({
    name:'ui',
    initialState:{dark:false,mode:moon},
    reducers:{
        toggleDark(state){
            state.dark = !state.dark
            if(state.dark){
                const darkbg = getComputedStyle(document.documentElement).getPropertyValue('--darkbg')
                const darkimage = getComputedStyle(document.documentElement).getPropertyValue('--darkimage')
                const darkcard = getComputedStyle(document.documentElement).getPropertyValue('--darkcard')
                const darkfont = getComputedStyle(document.documentElement).getPropertyValue('--darkfont')

                document.documentElement.style.setProperty('--bg',darkbg)
                document.documentElement.style.setProperty('--image',darkimage)
                document.documentElement.style.setProperty('--card',darkcard)
                document.documentElement.style.setProperty('--font',darkfont)
            }
            else{
                const lightbg = getComputedStyle(document.documentElement).getPropertyValue('--lightbg')
                const lightimage = getComputedStyle(document.documentElement).getPropertyValue('--lightimage')
                const lightcard = getComputedStyle(document.documentElement).getPropertyValue('--lightcard')
                const lightfont = getComputedStyle(document.documentElement).getPropertyValue('--lightfont')
    
                document.documentElement.style.setProperty('--bg',lightbg)
                document.documentElement.style.setProperty('--image',lightimage)
                document.documentElement.style.setProperty('--card',lightcard)
                document.documentElement.style.setProperty('--font',lightfont)
            }
        },
        changeMode(state,action){
            if(action.payload=='moon'){
                state.mode = sun
            }else{
                state.mode = moon
            }
        }
    }
})


const listSlice = createSlice({
    name:'list',
    initialState:{list:[],active:[],completed:[]},
    reducers:{
        add(state,action){
            state.list = [...state.list,action.payload]
            state.active = [...state.active,action.payload]
        },
        remove(state,action){
            let lis = []
            for(let l of state.list){
                if(l.id !== action.payload){
                    lis.push(l)
                }
            }
            state.list = lis
            lis = []
            for(let l of state.completed){
                if(l.id !== action.payload){
                    lis.push(l)
                }
            }
            state.completed = lis
            lis = []
            for(let l of state.active){
                if(l.id !== action.payload){
                    lis.push(l)
                }
            }
            state.active = lis
        },
        done(state,action){

            for(let l of state.list){
                if(l.id == action.payload){
                    l.isDone = !l.isDone
                    state.completed = [...state.completed,l]
                    break
                }
            }
            let lis = []
            for(let l of state.active){
                if(l.id != action.payload){
                    lis.push(l)
                }
            }
            state.active = lis
        }
    }
})



const store = configureStore({
    reducer:{
        ui:uiSlice.reducer,
        list:listSlice.reducer
    }
})



export default store
export const uiActions = uiSlice.actions
export const listActions = listSlice.actions
