import React, {createContext, useContext, useState, useCallback} from 'react'

const ToastContext = createContext()
export function useToast(){ return useContext(ToastContext) }

export function ToastProvider({children}){
  const [toasts, setToasts] = useState([])
  const show = useCallback((message, opts={type:'info', duration:3000})=>{
    const id = Date.now() + Math.random()
    setToasts(t=>[...t, {id, message, type:opts.type}])
    setTimeout(()=> setToasts(t=>t.filter(x=>x.id!==id)), opts.duration)
  },[])
  return (
    <ToastContext.Provider value={{show}}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex flex-col gap-2">
        {toasts.map(t=>(
          <div key={t.id} className={'px-4 py-2 rounded shadow-lg max-w-xs text-sm ' + (t.type==='error' ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800')}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
