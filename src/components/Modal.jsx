import React from 'react'
export default function Modal({children, onClose}){
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg max-w-xl w-full p-4">
        {children}
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-3 py-1 rounded border">Close</button>
        </div>
      </div>
    </div>
  )
}
