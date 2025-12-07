import React from 'react'

const Select = () => {
  return (
    <div className='space-y-1'>
        <Route selected={false} title={"Risk Assessment"}/>
        <Route selected={false} title={"Track Products"}/>
        <Route selected={false} title={"Categories"}/>
        <Route selected={false} title={"APIs list"}/>
        <Route selected={false} title={"About Model"}/>
        </div>
  )
}

const Route = ({
  selected,
  title,
}: {
  selected: boolean;
  title: string;
}) => {
  return (
    <button
      className={`
        flex items-center justify-start gap-2 w-full rounded px-2 py-1.5
        text-sm transition-[box-shadow,background-color,color]
        ${
          selected
            ? "bg-white text-stone-950 shadow"
            : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
        }
      `}
    >
      <span>{title}</span>
    </button>
  );
};

export default Select