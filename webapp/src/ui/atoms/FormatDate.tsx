import React from 'react';

const formatter = new Intl.DateTimeFormat("pl-PL", {
  weekday: "long",
  year: "numeric",
  month: "2-digit",
  day: "2-digit"
})

interface FormatDateProps {
  date: string
}

export const FormatDate: React.FC<FormatDateProps> = (props) => {
  const { date } = props
  return <>
    {formatter.format(new Date(date))}
  </>
}
