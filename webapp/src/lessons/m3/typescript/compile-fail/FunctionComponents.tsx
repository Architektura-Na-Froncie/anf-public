import React from 'react';

interface MyProps {
  data: number
  optionalData?: number
}

const OptionalChildren: React.FC<MyProps> = ({data}) => <>{data}</>
const optional1 = <OptionalChildren data={123} />
const optional2 = <OptionalChildren data={123}>
  siema!
</OptionalChildren>


const WithoutChildren = ({ data }: MyProps) => <>{data}</>
const without1 = <WithoutChildren data={123} />
const without2 = <WithoutChildren data={123}>
  siema!
</WithoutChildren>
// np memo()

const RequiredChildren = ({ data }: MyProps & { children: React.ReactNode }) => <>{data}</>
const required1 = <RequiredChildren data={123} />
const required2 = <RequiredChildren data={123}>
  siema!
</RequiredChildren>
// np Provider
