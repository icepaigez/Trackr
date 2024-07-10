import React from 'react';

function Footer() {
  const services = [
    {
      title: 'Get a quote',
      description: 'Get an estimate for your shipment',
      image: 'https://cdn.usegalileo.ai/stability/2653a2f7-5402-46ee-81fa-3ee70c3ed9c8.png',
    },
    {
      title: 'Request an account',
      description: 'Set up a business account',
      image: 'https://cdn.usegalileo.ai/sdxl10/96fdbdab-4493-41c3-b8e6-e57c98aa212c.png',
    },
    {
      title: 'Order supplies',
      description: 'Order shipping materials',
      image: 'https://cdn.usegalileo.ai/sdxl10/1f73bde8-146c-45ae-b84a-4992ca5b342a.png',
    },
    {
      title: 'Find a location',
      description: 'Find a Morning Star Express near you',
      image: 'https://cdn.usegalileo.ai/sdxl10/89ef3662-3bba-4e33-9b08-3b8979f83650.png',
    },
  ];

  return (
    <div className="flex flex-col gap-10 px-10 sm:px-20 lg:px-40 py-10 @container">
      <div className="flex flex-col gap-4">
        <h1 className="text-[#111418] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
          How can we help you today?
        </h1>
        <p className="text-[#111418] text-base font-normal leading-normal max-w-[720px]">
          We offer a wide range of services to support your business needs. From express courier and logistics to warehousing and distribution, we have the expertise to make
          your supply chain work for you.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col gap-3 pb-3">
            <div
              className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
              style={{ backgroundImage: `url("${service.image}")` }}
            ></div>
            <div>
              <p className="text-[#111418] text-base font-medium leading-normal">{service.title}</p>
              <p className="text-[#637588] text-sm font-normal leading-normal">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Footer;