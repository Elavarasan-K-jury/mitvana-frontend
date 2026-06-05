import Image from 'next/image'
import countries from '@assets/images/new-home/MAP-FINAL2.png'

function Countries() {
  return (
    <div className='text-customPrimary mt-16'>
            <h2 className='text-center font-semibold text-4xl'>22 Countries & Counting</h2>
            <div className='w-full grid place-items-center bg-black-200'>
            <Image src={countries} alt="img" className='w-5/6'/>
            </div>

    </div>
  )
}

export default Countries