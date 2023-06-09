const benefits = [
  {
    title: 'Low price',
    subtitle: 'Save big. Get everything with a super low monthly subscription',
  },
  {
    title: 'No limits',
    subtitle: 'Get complete access to everything on the site',
  },
  {
    title: 'Cancel anytime',
    subtitle: 'Pause or stop your subscription, whenever you like. ',
  },
];

const Benefits = async () => {
  return (
    <div className='bg-cyan-400 border-r-2 border-black'>
      <div className='h-full p-[6.5vw] flex items-center justify-center'>
        <div className=' flex flex-col gap-8'>
          {benefits.map((benefit) => (
            <div key={benefit.title} className='space-y-1'>
              <h3 className='lg:text-4xl text-3xl font-medium'>
                {benefit.title}
              </h3>
              <p className='text-lg lg:text-xl'>{benefit.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
