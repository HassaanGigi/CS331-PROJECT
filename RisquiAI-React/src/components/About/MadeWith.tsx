import React from 'react'

export const MadeWith = () => {
  return (
        <div
      className="col-span-12 md:col-span-12 flex flex-col gap-6 py-10"
      data-aos="fade-up"
    >
      <h2 className="text-5xl font-bold text-white mb-8 text-center">
        How This Project Was Made
      </h2>
      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-12 md:col-span-4 flex flex-col gap-3 text-center">
          <div className="text-orange-500 text-3xl font-bold">
            React.js
          </div>
          <p className="text-stone-300 leading-relaxed">
            The frontend was built using React.js with reusable components and a clean state structure.
          </p>
        </div>

        <div className="col-span-12 md:col-span-4 flex flex-col gap-3 text-center">
          <div className="text-orange-500 text-3xl font-bold">
            TailwindCSS
          </div>
          <p className="text-stone-300 leading-relaxed">
            Tailwind utility classes power the styling, making the UI modern, responsive, and fast.
          </p>
        </div>

        <div className="col-span-12 md:col-span-4 flex flex-col gap-3 text-center">
          <div className="text-orange-500 text-3xl font-bold">
            Flask
          </div>
          <p className="text-stone-300 leading-relaxed">
            Flask handles backend routing, API exposure, and integration with future datasets.
          </p>
        </div>

      </div>
    </div>
  )
}
