import React from 'react'

import "./ResultBoard.css"

export const ResultBoard = ({ scores, xPlaying }) => {
  const { resultScore } = scores;

  return (
    <div className="resultboard">
      <span className={`score ${!xPlaying && "inactive"}`}>{resultScore}</span>
    </div>
  )
}