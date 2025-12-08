import React from 'react'

export const Limitations = () => {
  return (
        <div
      className="col-span-12 md:col-span-12 flex flex-col gap-10 py-10"
      data-aos="fade-up"
    >
      {/* Centered Title */}
      <h2 className="text-5xl font-bold text-white mb-10 text-center">
        Limitations
      </h2>

      <div className="grid grid-cols-12 gap-6">

        {/* Limitation 1 */}
        <div className="col-span-12 md:col-span-6 flex flex-col gap-3" data-aos="fade-up">
          <div className="text-orange-500 text-3xl font-bold text-center">
            Single Category
          </div>
          <p className="text-stone-300 leading-relaxed text-center">
            The project currently focuses only on perfumes and does not cover other categories.
          </p>
        </div>

        {/* Limitation 2 */}
        <div className="col-span-12 md:col-span-6 flex flex-col gap-3" data-aos="fade-up" data-aos-delay="50">
          <div className="text-orange-500 text-3xl font-bold text-center">
            Limited Data
          </div>
          <p className="text-stone-300 leading-relaxed text-center">
            The model is trained on limited data using a local device, which may cause recency bias and restrict scalability.
          </p>
        </div>

      </div>
    </div>
  )
}
