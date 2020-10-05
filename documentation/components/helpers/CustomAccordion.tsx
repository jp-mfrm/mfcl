import React, { useState } from 'react'
import { Accordion, Alert, Checkbox } from '../../../src'

const CustomAccordion = () => {
  const [error, setError] = useState(false)
  return (
    <Accordion
      items={[
        {
          title: 'Example title',
          id: 'example_title',
          content:
            'Mattress ipsum dolor amet Cooling Seally down snooze mattress toppers comfort spine Serta sleep trial customized shopping options shut eye Americas top-rated brands snoring soft ultra plush latex brand comfy nap plush medium side innerspring hot bunk bed queen'
        },
        {
          title: 'Another Title',
          id: 'another_title',
          content: (
            <div style={{ padding: '20px' }}>
              Other content:{' '}
              <span style={{ display: 'inline-block', paddingLeft: '15px' }}>
                {' '}
                <img
                  style={{ height: '500px' }}
                  src="https://i.guim.co.uk/img/media/20098ae982d6b3ba4d70ede3ef9b8f79ab1205ce/0_0_969_1005/master/969.jpg?width=620&quality=85&auto=format&fit=max&s=2a2baf6cf8f918ef763bb105f98f4cc0"
                />{' '}
                <Checkbox
                  title="Don't click"
                  handleClick={() => {
                    setError(!error)
                  }}
                />{' '}
              </span>
              <Alert color="error" isOpen={error}>
                おい！何してんの?! (ꐦಠ益ಠ)
              </Alert>
            </div>
          )
        }
      ]}
    />
  )
}

export default CustomAccordion
