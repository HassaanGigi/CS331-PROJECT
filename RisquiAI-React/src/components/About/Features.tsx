import React from 'react'

export const Features = () => {
  return (
        <div
      className="col-span-12 md:col-span-12 flex flex-col gap-10 py-10"
      data-aos="fade-up"
    >
      {/* Centered Title */}
      <h2 className="text-5xl font-bold text-white mb-10 text-center">
        Features
      </h2>

      <div className="grid grid-cols-12 gap-6">

        {/* Feature 1 */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-3" data-aos="fade-up">
          <div className="text-orange-500 text-3xl font-bold text-center">
            Data Collection
          </div>
          <p className="text-stone-300 leading-relaxed text-center">
            Collects data from Facebook Marketplace APIs for perfumes.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-3" data-aos="fade-up" data-aos-delay="50">
          <div className="text-orange-500 text-3xl font-bold text-center">
            ML Risk Scoring
          </div>
          <p className="text-stone-300 leading-relaxed text-center">
            Trains a machine learning model to suggest risk scores per perfume based on performance and popularity.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="col-span-12 md:col-span-4 flex flex-col gap-3" data-aos="fade-up" data-aos-delay="100">
          <div className="text-orange-500 text-3xl font-bold text-center">
            Filters
          </div>
          <p className="text-stone-300 leading-relaxed text-center">
            Provides region-wise and time-wise (monthly, weekly) filters for trends analysis.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="col-span-12 md:col-span-6 flex flex-col gap-3" data-aos="fade-up" data-aos-delay="150">
          <div className="text-orange-500 text-3xl font-bold text-center">
            Interactive Dashboard
          </div>
          <p className="text-stone-300 leading-relaxed text-center">
            Displays an interactive dashboard to visually represent perfume data trends.
          </p>
        </div>

        {/* Feature 5 */}
        <div className="col-span-12 md:col-span-6 flex flex-col gap-3" data-aos="fade-up" data-aos-delay="200">
          <div className="text-orange-500 text-3xl font-bold text-center">
            In-depth Details
          </div>
          <p className="text-stone-300 leading-relaxed text-center">
            Allows users to explore detailed information for each perfume.
          </p>
        </div>

      </div>
    </div>
  )
}
