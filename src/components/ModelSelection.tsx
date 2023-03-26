'use client'

import useSWR from 'swr'
import Select from 'react-select'

const fetchModels = () => fetch('/api/getEngines').then((res) => res.json())

export default function ModelSelection() {
  const { data: models, isLoading } = useSWR('models', fetchModels)
  const { data: model, mutate: setModel } = useSWR('model', {
    fallbackData:'gpt-3.5-turbo'
  })

  console.log(models)
  return (
    <div className='mt-2'>
      <Select
        // className="mt-2"
        isSearchable
        defaultValue={model}
        placeholder={model}
        isLoading={isLoading}
        menuPosition={'fixed'}
        classNames={{ control: (state) => 'bg-[#434654] border-[#434654]' }}
        options={models?.modelOptions}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  )
}
