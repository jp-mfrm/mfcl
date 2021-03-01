const Chips = {
  onClick: (value: any) => {
    console.log(value)
  },
  className: 'CHEEPS',
  list: [
    {
      label: 'Serta',
      value: 'mattresses?brand=Serta',
      onClick: (value: any) => {
        console.log(value + ' custom!')
      },
      className: 'CHEEPS CUSTOM',
    },
    {
      label: 'Purple',
      value: 'mattresses?brand=Purple'
    },
    {
      label: 'Beautyrest',
      value: 'mattresses?brand=BeautyRest'
    },
    {
      label: 'Stearns & Foster',
      value: 'mattresses?brand=Stearns and Foster'
    },
    {
      label: 'Sealy',
      value: 'mattresses?brand=Sealy'
    },
    {
      label: 'Tempur-Pedic',
      value: 'mattresses?brand=Tempur-Pedic',
    },
    {
      label: 'Tuft and Needle',
      value: 'mattresses?brand=TuftandNeedle'
    },
    {
      label: 'Simmons',
      value: 'mattresses?brand=Simmons'
    },
    {
      label: 'Awara',
      value: 'mattresses?brand=Awara'
    },
    {
      label: 'Nectar',
      value: 'mattresses?brand=Nectar'
    },
    {
      label: 'Delta Children',
      value: 'mattresses?brand=DeltaChildren'
    },
    {
      label: 'Custom Label',
      value: 'mattresses?brand=CustomLabel'
    }
  ]
}
  
export default Chips