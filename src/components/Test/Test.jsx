import React, { useEffect, useState } from 'react';
import { supabasePublic } from '@/utils/supabase';

const Test = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrops = async () => {
      setLoading(true);
      const { data, error } = await supabasePublic
        .from('crops')
        .select('*')
        .order('market_price', { ascending: false }) // optional sorting

      if (error) {
        setError(error.message);
      } else {
        setCrops(data);
      }
      setLoading(false);
    };

    fetchCrops();
  }, []);

  return (
    <div className='mt-20 text-black min-h-screen px-4'>
      <h1 className='text-3xl font-bold mb-6'>Available Crops</h1>

      {loading && <p>Loading crops...</p>}
      {error && <p className='text-red-500'>Error: {error}</p>}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {crops.map((crop) => (
          <div key={crop.id} className='border p-4 rounded shadow'>
            <h2 className='text-xl font-semibold'>{crop.name} ({crop.variety})</h2>
            <p>Season: {crop.season}</p>
            <p>Growth Duration: {crop.growth_duration_days} days</p>
            <p>Water Requirement: {crop.water_requirement}</p>
            <p>Market Price: ₹{crop.market_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;
