import {
  SocialIcon,
  network_names,
  getNetworks,
  getKeys,
  networkFor,
  social_icons
} from 'react-social-icons'
import assert from 'assert'

export const AddSocial: React.FC = () => {
  // const keys = getKeys()
  // const nameType:  ge

  const testFn = () => {}

  console.log(social_icons.values());
  

  return (
    <div className='max-w-6xl mx-auto'>
      <div className="mt-12">
        <div className="text-[var(--grey-color)] tracking-[1px] font-bold text-sm mb-4">
          SOCIALS
        </div>
        <div className='flex flex-col gap-y-3'>
          {
            // getNetworks().map(network => {
            //   return (
            //     <div className='flex justify-between items-center w-full px-4 py-3 border' >
            //       <SocialIcon network={network} url={`https://${network}.com/${network}`} />
            //     </div>
            //   )
            // })
            
          }
        </div>
        {/* <button className="text-base text-[var(--blue-color)] font-semibold h-[40px] px-4 bg-white w-full flex justify-center items-center rounded">
          ADD SOCIALS
        </button> */}
      </div>
    </div>
  )
}
