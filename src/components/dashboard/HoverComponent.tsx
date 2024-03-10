const HoverComponent = ({title}:any) => {
  return (
    <>
    <div className='text-[rgba(0,0,0,1)] font-[600] text-[14px]'>{title}</div>
    <div className='text-[rgba(0,0,0,0.8)] font-[400] text-[13px]'>Your online store’s traffic volume, shown in sessions.</div></>
  )
}

export default HoverComponent