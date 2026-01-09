import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import '../App.css'

function FormattedText({ text, className = '' }) {
  if (!text) return null

  return (
    <div className={`formatted-text ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {text}
      </ReactMarkdown>
    </div>
  )
}

export default FormattedText

